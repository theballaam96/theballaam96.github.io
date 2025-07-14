const unsafe_song_tag = "stream-unsafe";
const grandfathered_song_tag = "grandfathered";
const site_is_down = false;
const total_prog = 6;
let icon_json = {}

function lazyLoadImages() {
    document.getElementById("lazy-loader").innerHTML = Object.keys(icon_json).map(key => `
        <img src='${icon_json[key].icon}' height="1px" width="1px" async loading=lazy />
    `).join("")
}

function filterNote(note) {
    bad_note_characters = ["'","\""]
    bad_note_characters.forEach(char => {
        note = note.replaceAll(char, "")
    })
    return note
}

function isCreditHidden() {
    return document.getElementById("credits_hidden").checked;
}

function ReLoadImages(){
    document.getElementById("lazy-loader").remove()
}

function handleCredits(update_cookie) {
    const credit_info = document.getElementById("popup_global_container").getElementsByClassName("name_meta_data");
    const audio_containers = document.getElementById("popup_global_container").getElementsByClassName("audio_container");
    const guitars = document.getElementById("popup_global_container").getElementsByClassName("credit-guitar");
    const hide = document.getElementById("credits_hidden").checked;
    for (let c = 0; c < credit_info.length; c++) {
        if (hide) {
            credit_info[c].classList.add("hide");
        } else {
            credit_info[c].classList.remove("hide");
        }
    }
    for (let a = 0; a < audio_containers.length; a++) {
        if (hide) {
            audio_containers[a].classList.add("hide");
        } else {
            audio_containers[a].classList.remove("hide");
        }
    }
    for (let g = 0; g < guitars.length; g++) {
        if (hide) {
            guitars[g].classList.remove("hide");
        } else {
            guitars[g].classList.add("hide");
        }
    }
    if (update_cookie) {
        window.setPackCookie("credits", hide);
    }
}

function handleMinView(update_cookie, update_checkbox) {
    let setting = "grid";
    if (document.getElementById("min-view").checked) {
        setting = "minimal";
    }
    document.getElementById("song_list").setAttribute("render",setting);
    if (update_cookie) {
        window.setPackCookie("min-view", setting);
    }
    document.getElementById("song_list").setAttribute("defaultrender", getCookie("min-view"));
}

function handleTextView(update_cookie) {
    let setting = "hide";
    if (document.getElementById("text-view").checked) {
        setting = "show";
    }
    document.getElementById("song_list").setAttribute("gridtext",setting);
    if (update_cookie) {
        window.setPackCookie("text-view", setting);
    }
}

function setMinView(state, update_cookie, update_checkbox) {
    if (update_checkbox) {
        document.getElementById("min-view").checked = state;
    }
    handleMinView(update_cookie, update_checkbox);
}

function setMinViewToDefault() {
    const hook = document.getElementById("song_list");
    hook.setAttribute("render", hook.getAttribute("defaultrender"));
}

function setTextView(state, update_cookie) {
    document.getElementById("text-view").checked = state;
    handleTextView(update_cookie);
}

let previous_width = null;
function handleSize() {
    return;
    const force_limit = 700;
    const width = document.documentElement.clientWidth;
    if (width <= force_limit) {
        if ((previous_width == null) || (previous_width > force_limit)) {
            setMinView(true, false, false);
        }
    } else {
        if ((previous_width == null) || (previous_width <= force_limit)) {
            setMinViewToDefault();
        }
    }
    previous_width = width;
}
window.onresize = handleSize;
handleSize();

async function getMidiData() {
    let prog = 0;
    updateProgress(prog++, total_prog, "Initializing");
    await getSpreadsheetData()
    if (window.getCookie("min-view") != "minimal") {
        lazyLoadImages();
    }
    updateProgress(prog++, total_prog, "Grabbed midi data");
    const zip_url = "https://raw.githubusercontent.com/theballaam96/candys-shop/main/binaries.zip"
    const zip_res = await fetch(zip_url, {
        cache: "no-store"
    });
    pack_zip_data = await zip_res.blob();
    updateProgress(prog++, total_prog, "Grabbing Pack.zip");

    updateProgress(prog++, total_prog, "Adjusting Pack.zip");
    const hook = document.getElementById("song_list")
    let html = ""
    let songs_by_game = {}
    let other = []
    midi_data_copy.sort(function(a, b) {
        // Sort songs alphabetically
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    midi_data_copy.forEach(song => {
        const game_name = song.game;
        if (game_name == MISC_NAME) {
            other.push(song)
        } else {
            if (!Object.keys(songs_by_game).includes(game_name)) {
                songs_by_game[game_name] = []
            }
            songs_by_game[game_name].push(song)
        }
    })
    songs_by_game = Object.keys(songs_by_game).sort().reduce(
        (obj, key) => { 
            obj[key] = songs_by_game[key]; 
            return obj;
        }, {}
    );
    songs_by_game[MISC_NAME] = other.slice();
    
    Object.keys(songs_by_game).forEach(game_pretty => {
        let game = window.filterName(game_pretty);
        if (game != null) {
            const song_list = songs_by_game[game_pretty].sort()
            // <input type='checkbox' class='midi-checkbox' id='' onclick='updateMaster(\"${game}\")' game='${game}'/>
            let local_html = {};
            song_list.forEach(song => {
                const group = song.group;
                let displayed_song_name = song.name.replace(/['"]/g, '');
                let composer = song.composer ? song.composer.replace(/['"]/g, '') : "";
                let converter = song.converter ? song.converter.replace(/['"]/g, '') : "";
                let audio = song.audio;
                if (!Object.keys(local_html).includes(group)) {
                    local_html[group] = "";
                }
                const state_index = song.index;
                local_html[group] += 
                    `
                    <div class='midi-checkbox-container'>
                        <div 
                            class='midi-checkbox noselect' 
                            song-id='${song.index}' 
                            onclick='updateTickbox(this,\"${game}\")' 
                            ticked=${window.parseSeed(state_index) ? 'true' : 'false'}
                            update_notif='false'
                            group='${group}'
                            game='${game}'
                            safe='${!song.tags.includes(unsafe_song_tag)}'
                            ${song.notes ? `title='${song.notes}'` : ''}>
                            <div class='flexsplitter bottom-line'>
                                <div class='name_data handle-overflow' title='${filterNote(displayed_song_name.replace('.bin',''))}'>${displayed_song_name.replace('.bin','')}</div>
                            </div>
                            <div class='bottom-line name_meta_data${isCreditHidden() ? ' hide' : ''}'>
                                ${composer != '' ? `<div title='Composer${composer.includes(',') ? 's' : ''} of original song: ${composer}' class="handle-overflow">&#119070; ${composer}</div>` : ''}
                                ${converter != '' ? `<div title='Converter${converter.includes(',') ? 's' : ''} into DK64 Soundfont: ${converter}' class="handle-overflow"><i class="fa-solid fa-rotate"></i> ${converter}</div>` : ''}
                            </div>
                            <div class='midi-tray'>
                                ${
                                    `<span class='midi-tag credit-guitar${isCreditHidden() ? '' : ' hide'}' title='Composer${composer.includes(',') ? 's' : ''} of original song: ${composer}\nConverter${converter.includes(',') ? 's' : ''} into DK64 Soundfont: ${converter}'
                                        data-bs-toggle='tooltip'>
                                        <i class='fa-solid fa-guitar'></i>
                                    </span>`
                                }
                                ${
                                    song.notes ?
                                    song.notes.trim().length > 0 ?
                                    `<span class='midi-tag' title='${filterNote(song.notes)}'><i class='fa-solid fa-note-sticky'></i></span>`
                                    : ""
                                    : ""
                                }
                                ${
                                    song.tags.filter(t => t != unsafe_song_tag && t != grandfathered_song_tag).length > 0 ?
                                    `<span class='midi-tag' title='${song.tags.filter(t => t != unsafe_song_tag && t != grandfathered_song_tag).join(', ')}'>
                                        <i class='fa-solid fa-tags'></i>
                                    </span>`
                                    : ""
                                }
                                <span class='badge text-bg-info rounded-pill new-pill' title='This song is newer than when you last built your pack.'>New!</span>
                                ${
                                    song.tags.includes(unsafe_song_tag) ? 
                                    "<span class='badge text-bg-danger rounded-pill' title='This song has been tied to copyright claim issues which may result in demonetization.'>Stream Unsafe</span>" : ""
                                }
                                ${
                                    song.tags.includes(grandfathered_song_tag) ? 
                                    "<span class='badge text-bg-warning rounded-pill' title='This song was submitted before our current policies were installed, and would go against them. However, we have grandfathered this song in to the pack builder. This song may be stream unsafe as a result, and is subject to removal upon any issues.'>Grandfathered</span>" : ""
                                }
                                ${
                                    song.tags.filter(t => t != unsafe_song_tag && t != grandfathered_song_tag).map((item, index) => index < 10 ? `
                                        <span class='badge text-bg-light rounded-pill'>
                                            ${item}
                                        </span>
                                    ` : "").join("")
                                }
                            </div>
                        </div>
                        <div class='audio_positioner'>
                            <div class='audio_positioner_internal'>
                                ${
                                    audio ?
                                    `<span class='midi-tag audio-clicker' title='Listen to song' onclick='playSong(\"${audio}\",\"${converter}\",\"${filterNote(displayed_song_name.replace('.bin',''))}\", ${song.index})' data-bs-toggle="modal" data-bs-target="#playSongModal" conversion_id="${song.index}"><i class='fa-solid fa-play'></i></span>`
                                    : ""
                                }
                            </div>
                        </div>
                    </div>`
            })
            let local_html_total = "";
            const group_priority = {
                "bgm": "Background Music",
                "events": "Events",
                "majoritems": "Major Items",
                "minoritems": "Minor Items"
            }
            let first = true;
            Object.keys(group_priority).forEach(group => {
                if (Object.keys(local_html).includes(group)) {
                    local_html_total += `${first ? '' : '<br>'}
                        <div class='fs-5'>${group_priority[group]}</div>
                        <div class='midi-grid'>
                            ${local_html[group]}
                        </div>
                    `
                    first = false;
                }
            })
            const game_name = game_pretty;
            html += `<div class='game-handler' title='${filterNote(game_name)}'>
                <div class='game-header noselect collapsed' game_id='${game}' onclick='toggleGameVisibility(\"${game}\",this)'>
                    <div class='game-icon'>
                        <span class='icon-alignment'></span>
                        <img class='game-image ${
                            Object.keys(icon_json).includes(game_name) ? 
                            "" : "no-icon"
                        }' src='${
                            Object.keys(icon_json).includes(game_name) ?
                            icon_json[game_name].icon :
                            BASE_NO_ICON_IMG
                        }' loading=lazy />
                        ${Object.keys(icon_json).includes(game_name) ?
                            "" :
                            `<div class='game-image-replacement'>${game_name}</div>`
                        }
                    </div>
                    <div class='game-internal-name'>${game_name}</div>
                    <div class='game-fullness-panel d-flex justify-content-end'></div>
                </div>
                <div class='game-songs hide' game='${game}'>
                    ${local_html_total}
                </div>
            </div>`
            //hook.innerHTML = html // Start loading
        }
    })
    hook.innerHTML = html;
    updateProgress(prog++, total_prog, "Lazy Loading Images");
    ReLoadImages();
    updateProgress(prog++, total_prog, "Populated Site");
    window.updateMaster();
    updateProgress(prog++, total_prog, "Updated Master");
    // Update click events
    setMinView(window.getCookie("min-view") == "minimal", false, true);
    setTextView(window.getCookie("text-view") == "show", false)
    document.getElementById("credits_hidden").checked = window.getCookie("credits") == "true";
    document.getElementById("credits_hidden").addEventListener("click", () => {handleCredits(true)});
    document.getElementById("min-view").addEventListener("click", () => {handleMinView(true, true)});
    document.getElementById("text-view").addEventListener("click", () => {handleTextView(true)});

    if (willAutoDownload()) {
        document.getElementById("build-pack-button").click();
    }
    autoPlaySong();
}

function updateProgress(progress, total, text="", error=false) {
    const hook = document.getElementById("loading_bar")
    const bar = hook.getElementsByTagName("div")[0]
    const perc = Math.floor(100 * (progress / total));
    hook.setAttribute("aria-valuenow", perc.toString()); 
    bar.style.width = `${perc}%`
    bar.innerText = `${perc}%`
    bar.classList.remove("bg-info");
    bar.classList.remove("bg-danger");
    if (error) {
        bar.classList.add("bg-danger");
    } else {
        bar.classList.add("bg-info");
    }
    document.getElementById("loading_text").innerText = text;
    if ((progress == total) && (!error)) {
        document.getElementById("load-event").style.opacity = 0;
        setTimeout(() => {
            document.getElementById("load-event").classList.add("hide")
        }, TRANSITION_SPEED * 2);
        if (window.generated_delayed_toast) {
            window.generateToast(window.generated_delayed_toast);
        }
    }
}

class MIDIHeader {
    constructor (name, mandatory, excluded_values=[null], push_item=true) {
        this.name = name
        this.mandatory = mandatory
        this.excluded_values = excluded_values
        this.push_item = push_item
    }
}

async function getSpreadsheetData() {
    // Get generic data
    const res = await fetch('https://raw.githubusercontent.com/theballaam96/candys-shop/main/mapping.json')
    const text = await res.text()
    json = JSON.parse(text)
    // Get icon data
    const icon_res = await fetch('https://raw.githubusercontent.com/theballaam96/candys-shop/main/images.json')
    const icon_text = await icon_res.text()
    icon_json = JSON.parse(icon_text)

    let counter = 0;
    midi_data_copy = [];
    total_data_copy = [];
    let used_game_song_combos = [];
    json.forEach(json_item => {
        const headers = [
            // Has to remain in this order
            new MIDIHeader("Song", true), // Name
            new MIDIHeader("Game", true), // Game
            new MIDIHeader("Category", true), // Category
            new MIDIHeader("Composers", false), // Composer
            new MIDIHeader("Converters", false), // Converter
            new MIDIHeader("Binary", true), // Binary
            new MIDIHeader("Date", false), // Timestamp
            new MIDIHeader("Audio", false), // Audio
            new MIDIHeader("Duration", false), // Duration
            new MIDIHeader("Tracks", false), // Track Count
            new MIDIHeader("Tags", false), // Tags
            new MIDIHeader("Additional Notes", false), // Notes
            new MIDIHeader("Verified", true, [null, false], false), // Song is Verified
        ]
        let permit = true;
        const arr_length = headers.filter(i => i.push_item).length;
        let params = new Array(arr_length).fill(null);
        let index = 0;
        headers.forEach(header => {
            if (header.push_item) {
                params[index] = Object.keys(json_item).includes(header.name) ? json_item[header.name] : null;
                index += 1;
            }
            if (!Object.keys(json_item).includes(header.name)) {
                if (header.mandatory) {
                    permit = false;
                }
            } else if (header.excluded_values.includes(json_item[header.name])) {
                permit = false;
            }
        })
        if (permit) {
            const short_name = Object.keys(json_item).includes("songshort") ? json_item["songshort"] : json_item["Song"];
            const new_data = new MIDIInfo(...params, short_name, counter)
            if (!new_data.delisted) {
                const game_song_combo = `${new_data.game}|${new_data.name}`
                total_data_copy.push(clone(new_data))
                if (!used_game_song_combos.includes(game_song_combo)) {
                    // Completely new song
                    midi_data_copy.push(new_data)
                    used_game_song_combos.push(game_song_combo)
                } else {
                    // Used song, update existing entry
                    const existing_entry = midi_data_copy.find(item => ((item.game == new_data.game) && (item.name == new_data.name)));
                    if (existing_entry) {
                        existing_entry.update_entry(new_data)
                    }
                }
            }
            counter++
        }
    })
    window.updateRecent()
}