// Texture management for Pack Builder

window.texture_data = {
    paintings: [],
    reels: [],
    items: [],
    tns_portal: [],
    transitions: [],
    arcade_sprites: {
        jumpman: [],
        dk: [],
        pauline: [],
        items: [],
        pie: [],
        orange_barrel: [],
        blue_barrel: [],
        orange_flame: [],
        blue_flame: [],
        orange_duck: [],
        blue_duck: [],
        spring: [],
        ui: [],
        particles: [],
        stage: [],
        hammer: []
    }
};

const TEXTURE_CATEGORIES = {
    paintings: { name: "Paintings", icon: "fa-image", accept: ".png" },
    reels: { name: "Reels", icon: "fa-film", accept: ".png" },
    items: { name: "Items", icon: "fa-cube", accept: ".png" },
    tns_portal: { name: "T&S Portals", icon: "fa-door-open", accept: ".png" },
    transitions: { name: "Transitions", icon: "fa-shuffle", accept: ".png" },
    arcade_sprites: { name: "Arcade Sprites", icon: "fa-gamepad", accept: ".png", hasSubcategories: true }
};

const ARCADE_SPRITE_SUBCATEGORIES = {
    jumpman: { name: "Jumpman" },
    dk: { name: "DK" },
    pauline: { name: "Pauline" },
    items: { name: "Items" },
    pie: { name: "Pie" },
    orange_barrel: { name: "Orange Barrel" },
    blue_barrel: { name: "Blue Barrel" },
    orange_flame: { name: "Orange Flame" },
    blue_flame: { name: "Blue Flame" },
    orange_duck: { name: "Orange Duck" },
    blue_duck: { name: "Blue Duck" },
    spring: { name: "Spring" },
    ui: { name: "UI" },
    particles: { name: "Particles" },
    stage: { name: "Stage" },
    hammer: { name: "Hammer" }
};

function initTextureUpload() {
    Object.keys(TEXTURE_CATEGORIES).forEach(category => {
        if (TEXTURE_CATEGORIES[category].hasSubcategories) {
            // Handle arcade_sprites subcategories
            Object.keys(ARCADE_SPRITE_SUBCATEGORIES).forEach(subcategory => {
                setupDropZone(`arcade_sprites_${subcategory}`, `arcade_sprites.${subcategory}`);
            });
        } else {
            // Handle regular categories
            setupDropZone(category, category);
        }
    });
}

function setupDropZone(elementId, dataPath) {
    const dropZone = document.getElementById(`texture-drop-${elementId}`);
    const fileInput = document.getElementById(`texture-input-${elementId}`);
    const browseBtn = document.getElementById(`texture-browse-${elementId}`);

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

    dropZone.addEventListener('drop', (e) => handleDrop(e, dataPath), false);

    browseBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => handleFiles(e.target.files, dataPath));
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

function addTextureFile(file, categoryPath) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const textureItem = {
            file: file,
            data: e.target.result,
            name: file.name,
            size: file.size,
            type: file.type,
            id: `texture_${categoryPath.replace('.', '_')}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };

        // Handle nested path (e.g., "arcade_sprites.jumpman")
        const pathParts = categoryPath.split('.');
        if (pathParts.length > 1) {
            const [mainCat, subCat] = pathParts;
            window.texture_data[mainCat][subCat].push(textureItem);
        } else {
            window.texture_data[categoryPath].push(textureItem);
        }
        
        renderTexturePreview(textureItem, categoryPath);
        updateTextureCount();
    };
    reader.readAsArrayBuffer(file);
}

function renderTexturePreview(textureItem, categoryPath) {
    const elementId = categoryPath.replace('.', '_');
    const previewContainer = document.getElementById(`texture-preview-${elementId}`);
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
    removeBtn.onclick = () => removeTexture(textureItem.id, categoryPath);

    previewDiv.appendChild(img);
    previewDiv.appendChild(nameDiv);
    previewDiv.appendChild(removeBtn);

    previewContainer.appendChild(previewDiv);
}

function removeTexture(id, categoryPath) {
    const pathParts = categoryPath.split('.');
    if (pathParts.length > 1) {
        const [mainCat, subCat] = pathParts;
        window.texture_data[mainCat][subCat] = window.texture_data[mainCat][subCat].filter(item => item.id !== id);
    } else {
        window.texture_data[categoryPath] = window.texture_data[categoryPath].filter(item => item.id !== id);
    }
    const previewElement = document.getElementById(id);
    if (previewElement) {
        previewElement.remove();
    }
    updateTextureCount();
}

function updateTextureCount() {
    let totalCount = 0;
    Object.keys(TEXTURE_CATEGORIES).forEach(category => {
        let count = 0;
        if (TEXTURE_CATEGORIES[category].hasSubcategories) {
            // Count arcade sprites subcategories
            Object.keys(ARCADE_SPRITE_SUBCATEGORIES).forEach(subcategory => {
                const subCount = window.texture_data[category][subcategory].length;
                count += subCount;
                const countElement = document.getElementById(`texture-count-arcade_sprites_${subcategory}`);
                if (countElement) {
                    countElement.textContent = subCount;
                }
            });
        } else {
            count = window.texture_data[category].length;
        }
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
        if (TEXTURE_CATEGORIES[category].hasSubcategories) {
            Object.keys(ARCADE_SPRITE_SUBCATEGORIES).forEach(subcategory => {
                window.texture_data[category][subcategory] = [];
                const previewContainer = document.getElementById(`texture-preview-arcade_sprites_${subcategory}`);
                if (previewContainer) {
                    previewContainer.innerHTML = '';
                }
            });
        } else {
            window.texture_data[category] = [];
            const previewContainer = document.getElementById(`texture-preview-${category}`);
            if (previewContainer) {
                previewContainer.innerHTML = '';
            }
        }
    });
    updateTextureCount();
}

function hasTextures() {
    let hasAny = false;
    Object.keys(window.texture_data).forEach(key => {
        if (Array.isArray(window.texture_data[key])) {
            if (window.texture_data[key].length > 0) hasAny = true;
        } else if (typeof window.texture_data[key] === 'object') {
            // Check nested object (arcade_sprites)
            if (Object.values(window.texture_data[key]).some(arr => arr.length > 0)) {
                hasAny = true;
            }
        }
    });
    return hasAny;
}

function getTextureCount() {
    let total = 0;
    Object.keys(window.texture_data).forEach(key => {
        if (Array.isArray(window.texture_data[key])) {
            total += window.texture_data[key].length;
        } else if (typeof window.texture_data[key] === 'object') {
            // Count nested object (arcade_sprites)
            Object.values(window.texture_data[key]).forEach(arr => {
                total += arr.length;
            });
        }
    });
    return total;
}

window.initTextureUpload = initTextureUpload;
window.clearAllTextures = clearAllTextures;
window.hasTextures = hasTextures;
window.getTextureCount = getTextureCount;
window.removeTexture = removeTexture;
window.renderTexturePreview = renderTexturePreview;
window.updateTextureCount = updateTextureCount;
