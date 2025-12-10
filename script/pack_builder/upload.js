const PARSEABLE_EXTENSIONS = ["bin","candy"];
window.uploaded_date = null;

function getUpdatedVersion(drive_id) {
    let found_id = null;
    midi_data_copy.forEach(item => {
        if (item.older_revisions != null) {
            if (item.older_revisions.map(a => a.drive_id).includes(drive_id)) {
                found_id = item.drive_id;
            }
        }
    })
    return found_id;
}

function checkArrayMatch(array_a, array_b) {
    if (array_a.length != array_b.length) {
        return false; // Mismatching array size
    }
    for (let a = 0; a < array_a.length; a++) {
        if (array_a[a] != array_b[a]) {
            return false; // Byte mismatch
        }
    }
    return true;
}

function checkSongArrayMatch(array_a, array_b, filename_a) {
    const extension = window.last(filename_a.split("."));
    if (PARSEABLE_EXTENSIONS.includes(extension)) { // Binary file
        return checkArrayMatch(array_a, array_b);
    }
    // Unknown
    return false
}

async function handlePack(data) {
    // Load all data
    let site_data = {};
    uploaded_pack_data = {};
    let loaded_count = 0;
    const zip_full = new JSZip();
    pack_zip_jszip = await zip_full.loadAsync(pack_zip_data);
    for (let [filename_0, file_0] of Object.entries(pack_zip_jszip.files)) {
        if (!file_0.dir) {
            const filename_id = filename_0
            const song = total_data_copy.find(item => item.drive_id == filename_id)
            loaded_count++;
            if (song) {
                const fileData = await pack_zip_jszip.files[filename_0].async("Uint8Array");
                site_data[`${filename_id.replace(".bin","")}.bin`] = {
                    "group": song.group,
                    "data": Array.from(fileData),
                    "selected_version": song.drive_id,
                    "updated_version": getUpdatedVersion(song.drive_id) ? getUpdatedVersion(song.drive_id) : song.drive_id,
                }
            }
        }
    }
    
    // Clear existing textures
    if (window.clearAllTextures) {
        window.clearAllTextures();
    }
    
    // console.log(site_data)
    // Load uploaded zip file
    window.uploaded_zip = new JSZip();
    let compressed_data = {}
    let renames = {}
    const zip_store = await window.uploaded_zip.loadAsync(data);
    const texture_categories = ["paintings", "reels", "items", "tns_portal", "transitions", "arcade_sprites"];
    const arcade_subcategories = ["jumpman", "dk", "pauline", "items", "pie", "orange_barrel", "blue_barrel", 
                                    "orange_flame", "blue_flame", "orange_duck", "blue_duck", "spring", 
                                    "ui", "particles", "stage", "hammer"];
    
    for (let [filename_0, file_0] of Object.entries(zip_store.files)) {
        if (!file_0.dir) {
            let parsed_filename = filename_0;
            const fileData = await zip_store.files[filename_0].async("Uint8Array");
            const file_path_array = filename_0.split("/");
            const filename_local = file_path_array[file_path_array.length - 1];
            
            // Check if this is a texture file
            if (file_path_array.includes("textures")) {
                let offset = null;
                for (let i = 0; i < file_path_array.length; i++) {
                    if (file_path_array[i] == "textures") {
                        offset = i;
                    }
                }
                if (file_path_array.length >= 2 + offset) {
                    const texture_category = file_path_array[1 + offset];
                    
                    // Check for arcade_sprites with subcategories (now with extra folder level)
                    if (texture_category === "arcade_sprites" && file_path_array.length >= 4 + offset) {
                        const subcategory = file_path_array[2 + offset];
                        // file_path_array[3 + offset] should be the duplicate subcategory folder name
                        if (arcade_subcategories.includes(subcategory)) {
                            // This is an arcade sprite subcategory file
                            const blob = new Blob([fileData]);
                            const file = new File([blob], filename_local, { type: 'image/png' });
                            
                            // Determine file type from extension
                            const ext = filename_local.split('.').pop().toLowerCase();
                            let mimeType = 'image/png';
                            if (ext === 'jpg' || ext === 'jpeg') {
                                mimeType = 'image/jpeg';
                            }
                            
                            // Add to texture_data arcade_sprites subcategory
                            if (window.texture_data && window.texture_data.arcade_sprites && window.texture_data.arcade_sprites[subcategory]) {
                                const textureItem = {
                                    file: file,
                                    data: fileData.buffer,
                                    name: filename_local,
                                    size: fileData.length,
                                    type: mimeType,
                                    id: `texture_arcade_sprites_${subcategory}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
                                };
                                window.texture_data.arcade_sprites[subcategory].push(textureItem);
                                
                                // Render preview
                                if (window.renderTexturePreview) {
                                    setTimeout(() => {
                                        const previewContainer = document.getElementById(`texture-preview-arcade_sprites_${subcategory}`);
                                        if (previewContainer) {
                                            const previewDiv = document.createElement('div');
                                            previewDiv.className = 'texture-preview-item';
                                            previewDiv.id = textureItem.id;
    
                                            const img = document.createElement('img');
                                            const imgBlob = new Blob([textureItem.data], { type: textureItem.type });
                                            const url = URL.createObjectURL(imgBlob);
                                            img.src = url;
                                            img.className = 'texture-preview-img';
    
                                            const nameDiv = document.createElement('div');
                                            nameDiv.className = 'texture-preview-name';
                                            nameDiv.textContent = textureItem.name;
                                            nameDiv.title = textureItem.name;
    
                                            const removeBtn = document.createElement('button');
                                            removeBtn.className = 'btn btn-sm btn-danger texture-remove-btn';
                                            removeBtn.innerHTML = '<i class="fa-solid fa-times"></i>';
                                            removeBtn.onclick = () => window.removeTexture(textureItem.id, `arcade_sprites_${subcategory}`);
    
                                            previewDiv.appendChild(img);
                                            previewDiv.appendChild(nameDiv);
                                            previewDiv.appendChild(removeBtn);
    
                                            previewContainer.appendChild(previewDiv);
                                        }
                                    }, 100);
                                }
                            }
                            continue; // Skip adding to compressed_data
                        }
                    } else if (texture_categories.includes(texture_category)) {
                        // This is a regular texture file, load it
                        const blob = new Blob([fileData]);
                        const file = new File([blob], filename_local, { type: 'image/png' });
                        
                        // Determine file type from extension
                        const ext = filename_local.split('.').pop().toLowerCase();
                        let mimeType = 'image/png';
                        if (ext === 'jpg' || ext === 'jpeg') {
                            mimeType = 'image/jpeg';
                        }
                        
                        // Add to texture_data
                        if (window.texture_data && window.texture_data[texture_category]) {
                            const textureItem = {
                                file: file,
                                data: fileData.buffer,
                                name: filename_local,
                                size: fileData.length,
                                type: mimeType,
                                id: `texture_${texture_category}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
                            };
                            window.texture_data[texture_category].push(textureItem);
                            
                            // Render preview
                            if (window.renderTexturePreview) {
                                setTimeout(() => {
                                    const previewContainer = document.getElementById(`texture-preview-${texture_category}`);
                                    if (previewContainer) {
                                        const previewDiv = document.createElement('div');
                                        previewDiv.className = 'texture-preview-item';
                                        previewDiv.id = textureItem.id;
    
                                        const img = document.createElement('img');
                                        const imgBlob = new Blob([textureItem.data], { type: textureItem.type });
                                        const url = URL.createObjectURL(imgBlob);
                                        img.src = url;
                                        img.className = 'texture-preview-img';
    
                                        const nameDiv = document.createElement('div');
                                        nameDiv.className = 'texture-preview-name';
                                        nameDiv.textContent = textureItem.name;
                                        nameDiv.title = textureItem.name;
    
                                        const removeBtn = document.createElement('button');
                                        removeBtn.className = 'btn btn-sm btn-danger texture-remove-btn';
                                        removeBtn.innerHTML = '<i class="fa-solid fa-times"></i>';
                                        removeBtn.onclick = () => window.removeTexture(textureItem.id, texture_category);
    
                                        previewDiv.appendChild(img);
                                        previewDiv.appendChild(nameDiv);
                                        previewDiv.appendChild(removeBtn);
    
                                        previewContainer.appendChild(previewDiv);
                                    }
                                }, 100);
                            }
                        }
                        continue; // Skip adding to compressed_data
                    }
                }
            }
            
            // File Extension checking for songs
            const fileExtArr = filename_0.split(".");
            const fileExt = fileExtArr[fileExtArr.length - 1];
            const preFileExtName = fileExtArr.filter((item, index) => (index != (fileExtArr.length - 1))).join(".");
            if (["candy", "bin"].includes(fileExt)) {
                // Is song file
                if (fileData[0] == 80) {
                    // Is Candy
                    if (fileExt != "candy") {
                        parsed_filename = `${preFileExtName}.candy`
                        console.log(`Converting ${filename_0} to a candy to match internal data`)
                        renames[filename_0] = parsed_filename
                    }
                } else if ((fileData[0] == 0) && (fileData[1] == 0) && (fileData[2] == 0) && (fileData[3] == 0x44)) {
                    // Is Bin
                    if (fileExt != "bin") {
                        parsed_filename = `${preFileExtName}.bin`
                        console.log(`Converting ${filename_0} to a binary to match internal data`)
                        renames[filename_0] = parsed_filename
                    }
                }
            } else if (filename_local == "metadata.json") {
                let metadata = await zip_store.files[filename_0].async("string");
                metadata = JSON.parse(metadata)
                window.uploaded_date = metadata.creation;
            }
            const file_group = file_path_array[file_path_array.length - 2];
            compressed_data[parsed_filename] = {
                "group": file_group,
                "data": Array.from(fileData),
                "blob": fileData
            };
        }
    }
    Object.keys(renames).forEach(init_name => {
        output_name = renames[init_name];
        blob = compressed_data[output_name].blob;
        window.uploaded_zip.remove(init_name);
        window.uploaded_zip.file(output_name, blob);
    })

    await window.waitFor(_ => loaded_count >= midi_data_copy.length);

    // Parse data for matching arrays

    // console.log(compressed_data)

    let matching_songs = [];
    let files_parsed = 0;
    const files_pushed = Array(Object.keys(compressed_data).length).fill(null);
    Object.keys(compressed_data).forEach((song_a, song_i) => {
        const extension = window.last(song_a.split("."));
        if (extension == "candy") {
            c_zip = new JSZip();
            c_zip.loadAsync(compressed_data[song_a].blob).then((czip_data) => {
                for (let [filename_0, file_0] of Object.entries(czip_data.files)) {
                    if (filename_0 == "song.bin") {
                        czip_data.files[filename_0].async("Uint8Array").then((fileData) => {
                            files_pushed[song_i] = Array.from(fileData);
                            files_parsed += 1;
                        });
                    }
                }
            });
        } else {
            files_pushed[song_i] = compressed_data[song_a].data;
            files_parsed += 1;
        }
    })

    await window.waitFor(_ => files_parsed >= Object.keys(compressed_data).length)

    const bad_filename_parsed = ["predule.bin"]
    Object.keys(compressed_data).forEach((song_a, song_i) => {
        if (!window.last(song_a.split("/")).toLowerCase().includes(bad_filename_parsed)) { // Temporarily installed to weed out the bad bin
            const extension = window.last(song_a.split("."));
            let found_song = null;
            if (PARSEABLE_EXTENSIONS.includes(extension)) {
                found_song = Object.keys(site_data).find(item => {
                    return checkSongArrayMatch(files_pushed[song_i], site_data[item].data, song_a);
                })
            }
            if (found_song) {
                const new_song = site_data[found_song].updated_version;
                if (!matching_songs.includes(new_song)) {
                    matching_songs.push(new_song)
                }
                window.uploaded_zip.remove(song_a)
            }
        }
    })

    const song_items = document.getElementsByClassName("song-item");
    const checkboxes = document.getElementsByClassName("song-select")
    for (let c = 0; c < checkboxes.length; c++) {
        checkboxes[c].checked = false;
    }
    for (let s = 0; s < song_items.length; s++) {
        song_items[s].classList.remove("song-new");
    }

    if (window.uploaded_date != null) {
        midi_data_copy.forEach(item => {
            if (!matching_songs.includes(item.drive_id) && (item.initial_timestamp != null)) {
                // Not in pack
                const init_date = new Date(item.initial_timestamp);
                const pack_date = new Date(window.uploaded_date);
                if (init_date > pack_date) {
                    const id = item.index;
                    for (c = 0; c < song_items.length; c++) {
                        if (song_items[c].getAttribute("song-id") == id) {
                            song_items[c].classList.add("song-new");
                        }
                    }
                }
            }
        })
    }

    matching_songs.forEach(m_drive_id => {
        const entry = midi_data_copy.find(item => item.drive_id == m_drive_id)
        if (entry) {
            const id = entry.index;
            for (c = 0; c < song_items.length; c++) {
                if (song_items[c].getAttribute("song-id") == id) {
                    song_items[c].getElementsByClassName("song-select")[0].checked = true;
                }
            }
        }
    })
    
    // Update texture counts after loading
    if (window.updateTextureCount) {
        setTimeout(() => {
            window.updateTextureCount();
        }, 200);
    }
    
    window.updateMaster();
}

document.getElementById("uploaded_pack").addEventListener("change", function(e) {
    var fr = new FileReader();
    fr.onload = function() {
        handlePack(fr.result);
    };
    fr.readAsArrayBuffer(document.getElementById("uploaded_pack").files[0]);
})

function uploadPack() {
    document.getElementById("uploaded_pack").click();
}