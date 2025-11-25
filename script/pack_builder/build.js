DUMP_IMAGES = false;

function filterFilename(unsafe_filename) {
    const bad_characters = "#%&{}<>*?$!'\":@+`|=/".split("");
    const split_filename = unsafe_filename.split("")
    return split_filename.filter(item => !bad_characters.includes(item)).join("")
}

async function buildPack() {
    const ss_count = window.getSongSelectedCount();
    const texture_count = window.getTextureCount ? window.getTextureCount() : 0;
    // Allow user to generate a pack with only textures selected
    if ((ss_count < 1) && (texture_count < 1) && (Object.keys(uploaded_pack_data).length == 0)) {
        window.generateToast("Cannot generate pack, no songs or textures selected", true);
        return;
    }
    if (pack_zip_data == null) {
        window.generateToast("Something went wrong", true);
        return;
    }
    
    let message = '';
    if (ss_count > 0 && texture_count > 0) {
        message = `Generating pack with ${ss_count} song${ss_count != 1 ? 's' : ''} and ${texture_count} texture${texture_count != 1 ? 's' : ''}`;
    } else if (ss_count > 0) {
        message = `Generating pack with ${ss_count} song${ss_count != 1 ? 's' : ''}`;
    } else if (texture_count > 0) {
        message = `Generating pack with ${texture_count} texture${texture_count != 1 ? 's' : ''}`;
    }
    window.generateToast(message);
    const checkboxes = document.getElementsByClassName("song-item");
    folder_data = {...uploaded_pack_data}
    let data_array = []
    for (let c = 0; c < checkboxes.length; c++) {
        if (checkboxes[c].getElementsByClassName("song-select")[0].checked) {
            const data = window.idToSongInfo(checkboxes[c].getAttribute("song-id"));
            if (data != null) {
                data_array.push(data)
            }
        }
    }
    const zip_full = new JSZip();
    pack_zip_jszip = await zip_full.loadAsync(pack_zip_data);
    console.log(data_array)
    for (let [filename_0, file_0] of Object.entries(pack_zip_jszip.files)) {
        if (!file_0.dir) {
            const found_data = data_array.find(item => item.drive_id == filename_0);
            if (found_data) {
                const fileData = await pack_zip_jszip.files[filename_0].async("blob");
                if (!Object.keys(folder_data).includes(found_data.folder)) {
                    folder_data[found_data.folder] = []
                }
                let composer = "";
                let converter = "";
                for (let i = 0; i < midi_data_copy.length; i++) {
                    if (midi_data_copy[i].name === found_data.song && midi_data_copy[i].game === found_data.game) {
                        composer = midi_data_copy[i].composer;
                        converter = midi_data_copy[i].converter;
                        group = midi_data_copy[i].group;
                        length = midi_data_copy[i].midi_length;
                        break;
                    }
                }
                item_data = {
                    "song": found_data.song,
                    "song_short": found_data.song_short,
                    "game": found_data.game,
                    "composer": composer,
                    "converter": converter,
                    "group": group,
                    "length": length,
                    "data": fileData,
                    "tags": found_data.tags,
                    "append_extension": true
                };
                if (DUMP_IMAGES) {
                    item_data["logo"] = (async () => {
                        if (folder_data[found_data.folder].some(file => file.game === found_data.game)) {
                            return folder_data[found_data.folder].find(file => file.game === found_data.game).logo;
                        } else {
                            const response = await fetch(icon_json[found_data.game].icon);
                            return await response.arrayBuffer();
                        }
                    })()
                }
                folder_data[found_data.folder].push(item_data);
            }
        }
    }
    let zip = null;
    //console.log(window.uploaded_zip)
    if (window.uploaded_zip != null) {
        zip = window.uploaded_zip;
        console.log(zip)
    } else {
        zip = new JSZip();
    }
    const promises = [];
    if (DUMP_IMAGES) {
        const png_zip = zip.folder("music_icons")
    }
    Object.keys(folder_data).forEach(folder => {
        const files  = folder_data[folder];
        const f_zip = zip.folder(folder)
        files.forEach(file => {
            let allow = true;
            const unsafe_allowed = document.getElementById("unsafe-song-toggle").checked;
            if (file.tags) {
                if (file.tags.includes(unsafe_song_tag) && (!unsafe_allowed)) {
                    allow = false;
                }
            }
            if (allow) {
                if ((output_as_encoded) && (file.append_extension)) {
                    c_zip = new JSZip();
                    logo_name = filterFilename(`${file.game}.png`)
                    c_zip.file(filterFilename("song.bin"), file.data); // Song
                    if (DUMP_IMAGES) {
                        png_zip.file(logo_name, file.logo); // Game PNG in main zip
                    }
                    // Create short game name
                    let game_short = file.game;
                    if (Object.keys(icon_json).includes(file.game)) {
                        if (Object.keys(icon_json[file.game]).includes("short_name")) {
                            game_short = icon_json[file.game].short_name;
                        }
                    }
                    // Create a json file for the song info containing the song, game, composer, and converter, and the name of the logo file
                    c_zip.file(filterFilename("data.json"), JSON.stringify({
                        "song": file.song,
                        "song_short": file.song_short,
                        "game": file.game,
                        "game_short": game_short,
                        "group": file.group,
                        "length": file.length,
                        "logo": file.logo,
                        "composer": file.composer,
                        "converter": file.converter,
                        "tags": file.tags,
                    }));
                    promises.push(
                        c_zip.generateAsync({type:"blob"}).then((content) => {
                            if (file.append_extension) {
                                f_zip.file(filterFilename(`${file.game} ${file.song}.candy`), content);
                            } else {
                                f_zip.file(filterFilename(file.song), content);
                            }
                        })
                    );
                } else {
                    if (file.append_extension) {
                        f_zip.file(filterFilename(`${file.game} ${file.song}.bin`), file.data);
                    } else {
                        f_zip.file(filterFilename(file.song), file.data);
                    }
                }
            }
        })
    })
    // Add textures to the pack
    if (window.hasTextures && window.hasTextures()) {
        const texture_folder = zip.folder("textures");
        const texture_categories = ["paintings", "reels", "items", "tns_portal", "transitions", "arcade_sprites"];
        
        texture_categories.forEach(category => {
            if (window.texture_data && window.texture_data[category]) {
                if (category === "arcade_sprites") {
                    // Handle arcade_sprites with subcategories (extra folder level)
                    const arcade_folder = texture_folder.folder(category);
                    const arcade_subcategories = ["jumpman", "dk", "pauline", "items", "pie", "orange_barrel", "blue_barrel", 
                                                   "orange_flame", "blue_flame", "orange_duck", "blue_duck", "spring", 
                                                   "ui", "particles", "stage", "hammer"];
                    
                    arcade_subcategories.forEach(subcategory => {
                        if (window.texture_data[category][subcategory] && window.texture_data[category][subcategory].length > 0) {
                            const subcat_folder = arcade_folder.folder(subcategory);
                            // Add an extra folder level named after the subcategory
                            const inner_folder = subcat_folder.folder(subcategory);
                            window.texture_data[category][subcategory].forEach(texture => {
                                inner_folder.file(texture.name, texture.data);
                            });
                        }
                    });
                } else if (window.texture_data[category].length > 0) {
                    // Handle regular categories
                    const category_folder = texture_folder.folder(category);
                    window.texture_data[category].forEach(texture => {
                        category_folder.file(texture.name, texture.data);
                    });
                }
            }
        });
    }

    metadata = {
        "creation": new Date().toISOString(),
    }
    zip.file("metadata.json", JSON.stringify(metadata, null, 2))
    
    if (output_as_encoded) {
        Promise.all(promises).then((data) => {
            zip.generateAsync({type:"blob"}).then(function(content) {
                saveAs(content, "pack.zip");
            });
        })
    } else {
        zip.generateAsync({type:"blob"}).then(function(content) {
            saveAs(content, "pack.zip");
        });
    }               
}

async function buildBinaryPack() {
    output_as_encoded = false;
    buildPack();
}

async function buildCandyPack() {
    output_as_encoded = true;
    buildPack();
}