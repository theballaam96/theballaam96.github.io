// Texture management for Pack Builder

window.texture_data = {
    paintings: [],
    reels: [],
    items: [],
    tns_portal: [],
    transitions: [],
    arcade_sprites: []
};

const TEXTURE_CATEGORIES = {
    paintings: { name: "Paintings", icon: "fa-image", accept: ".png" },
    reels: { name: "Reels", icon: "fa-film", accept: ".png" },
    items: { name: "Items", icon: "fa-cube", accept: ".png" },
    tns_portal: { name: "T&S Portals", icon: "fa-door-open", accept: ".png" },
    transitions: { name: "Transitions", icon: "fa-shuffle", accept: ".png" },
    arcade_sprites: { name: "Arcade Sprites", icon: "fa-gamepad", accept: ".png" }
};

function initTextureUpload() {
    Object.keys(TEXTURE_CATEGORIES).forEach(category => {
        const dropZone = document.getElementById(`texture-drop-${category}`);
        const fileInput = document.getElementById(`texture-input-${category}`);
        const browseBtn = document.getElementById(`texture-browse-${category}`);

        if (!dropZone || !fileInput || !browseBtn) return;

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => highlight(dropZone), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => unhighlight(dropZone), false);
        });

        dropZone.addEventListener('drop', (e) => handleDrop(e, category), false);

        browseBtn.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', (e) => handleFiles(e.target.files, category));
    });
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(element) {
    element.classList.add('texture-drop-highlight');
}

function unhighlight(element) {
    element.classList.remove('texture-drop-highlight');
}

function handleDrop(e, category) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files, category);
}

function handleFiles(files, category) {
    [...files].forEach(file => {
        if (file.type.startsWith('image/')) {
            addTextureFile(file, category);
        } else {
            window.generateToast(`${file.name} is not a valid image file`, true);
        }
    });
}

function addTextureFile(file, category) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const textureItem = {
            file: file,
            data: e.target.result,
            name: file.name,
            size: file.size,
            type: file.type,
            id: `texture_${category}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };

        window.texture_data[category].push(textureItem);
        renderTexturePreview(textureItem, category);
        updateTextureCount();
    };
    reader.readAsArrayBuffer(file);
}

function renderTexturePreview(textureItem, category) {
    const previewContainer = document.getElementById(`texture-preview-${category}`);
    if (!previewContainer) return;

    const previewDiv = document.createElement('div');
    previewDiv.className = 'texture-preview-item';
    previewDiv.id = textureItem.id;

    const img = document.createElement('img');
    const blob = new Blob([textureItem.data], { type: textureItem.type });
    const url = URL.createObjectURL(blob);
    img.src = url;
    img.className = 'texture-preview-img';

    const nameDiv = document.createElement('div');
    nameDiv.className = 'texture-preview-name';
    nameDiv.textContent = textureItem.name;
    nameDiv.title = textureItem.name;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn btn-sm btn-danger texture-remove-btn';
    removeBtn.innerHTML = '<i class="fa-solid fa-times"></i>';
    removeBtn.onclick = () => removeTexture(textureItem.id, category);

    previewDiv.appendChild(img);
    previewDiv.appendChild(nameDiv);
    previewDiv.appendChild(removeBtn);

    previewContainer.appendChild(previewDiv);
}

function removeTexture(id, category) {
    window.texture_data[category] = window.texture_data[category].filter(item => item.id !== id);
    const previewElement = document.getElementById(id);
    if (previewElement) {
        previewElement.remove();
    }
    updateTextureCount();
}

function updateTextureCount() {
    let totalCount = 0;
    Object.keys(TEXTURE_CATEGORIES).forEach(category => {
        const count = window.texture_data[category].length;
        totalCount += count;
        const countElement = document.getElementById(`texture-count-${category}`);
        if (countElement) {
            countElement.textContent = count;
        }
    });

    const totalElement = document.getElementById('texture-total-count');
    if (totalElement) {
        totalElement.textContent = `${totalCount} texture${totalCount !== 1 ? 's' : ''} total`;
    }

    const badge = document.getElementById('texture-badge');
    if (badge) {
        if (totalCount > 0) {
            badge.textContent = totalCount;
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    }
}

function clearAllTextures() {
    Object.keys(TEXTURE_CATEGORIES).forEach(category => {
        window.texture_data[category] = [];
        const previewContainer = document.getElementById(`texture-preview-${category}`);
        if (previewContainer) {
            previewContainer.innerHTML = '';
        }
    });
    updateTextureCount();
}

function hasTextures() {
    return Object.values(window.texture_data).some(arr => arr.length > 0);
}

function getTextureCount() {
    return Object.values(window.texture_data).reduce((sum, arr) => sum + arr.length, 0);
}

window.initTextureUpload = initTextureUpload;
window.clearAllTextures = clearAllTextures;
window.hasTextures = hasTextures;
window.getTextureCount = getTextureCount;
window.removeTexture = removeTexture;
