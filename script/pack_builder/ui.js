const unsafe_song_tag = "stream-unsafe";
const grandfathered_song_tag = "grandfathered";
const mood_tags = ["Happy", "Gloomy", "Calm"];
const site_is_down = false;
const total_prog = 6;
let icon_json = {}
const group_priority = {
    "bgm": "Background Music",
    "events": "Events",
    "majoritems": "Major Items",
    "minoritems": "Minor Items"
}

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

function getGameTabName(game_name) {
    const filtered_name = game_name
        .replace(/[^a-zA-Z0-9 ]/g, '') // keep only alphanumeric + space
        .trim()                         // remove leading/trailing spaces
        .replace(/\s+/g, '-');          // replace spaces with hyphens
    return `game-${filtered_name}`;  // Make to start with game- to fix those which start with an invalid character
}

function getTagDetails(tag_name) {
    let color = "light";
    let title = "";
    let tag_order = 0;
    if (tag_name == grandfathered_song_tag) {
        color = "warning";
        title = "This song was submitted before our current policies were installed, and would go against them. However, we have grandfathered this song in to the pack builder. This song may be stream unsafe as a result, and is subject to removal upon any issues."
        tag_name = "Grandfathered";
        tag_order = 2;
    } else if (tag_name == unsafe_song_tag) {
        color = "danger";
        title = "This song has been tied to copyright claim issues which may result in demonetization.";
        tag_name = "Stream Unsafe";
        tag_order = 2;
    } else if (tag_name == "new") {
        color = "info new-pill";
        title = "This song was uploaded after your pack was last updated.";
        tag_name = "New!";
        tag_order = -1;
    } else if (mood_tags.includes(tag_name)) {
        tag_order = 1;
    }
    return {
        "name": tag_name,
        "color": color,
        "title": title,
        "tag_order": tag_order,
    }
}

function addGame(game_name, image_url, songs, shown) {
    // console.log(songs)
    const tab_name = getGameTabName(game_name);
    // Game Construction
    const local_game_html = `<li class="list-group-item ${shown ? 'active' : ''} game-tab" id="tab-${tab_name}" data-bs-toggle="pill" data-bs-target="#${tab_name}" type="button" role="tab" aria-controls="${tab_name}" aria-selected="${shown ? 'true' : 'false'}">
        <div class="d-flex">
            <div class="flex-grow-1">
                <div class="name_container">
                    ${game_name}
                </div>
                <div>
                    <small><span id="count-${tab_name}" game="${tab_name}" class="song_count_digits">0</span>/${songs.length} song${songs.length == 1 ? '' : 's'}</small>
                    <small><span id="new-${tab_name}" class="new_count"></span></small>
                </div>
            </div>
            <div class="form-check position-relative" title="Select/Deselect all songs for game">
                <input type="checkbox" game="${tab_name}" id="all-${tab_name}" class="game_all_checkbox form-check-input position-absolute top-50 translate-middle-y mt-0" />
            </div>
        </div>
    </li>`;
    // Song construction
    let song_inner_html = "";
    Object.keys(group_priority).forEach(key => {
        const songs_for_group = songs.filter(s => s.group == key);
        if (songs_for_group.length > 0) {
            song_inner_html += "<div class='my-3'>";
            song_inner_html += `<h3>${group_priority[key]}</h3>`;
            songs_for_group.forEach(s => {
                let converter = s.converter ? s.converter.replace(/['"]/g, '') : "";
                let composer = s.composer ? s.composer.replace(/['"]/g, '') : "";
                let tag_data = s.tags.map(tag => {
                    return getTagDetails(tag)
                })
                tag_data.push(getTagDetails("new"));
                tag_data.sort((a, b) => a.tag_order - b.tag_order);
                let tag_html = tag_data.map(tag => {
                    return `<span class='badge text-bg-${tag.color} rounded-pill ms-2' title='${tag.title}'>${tag.name}</span>`
                }).join("")
                song_inner_html += `<div id="song-${s.index}" class="card mb-2 song-item" game="${tab_name}" song-id="${s.index}" group="${key}">
                    <div class="d-flex p-2">
                        <div class="flex-grow-1">
                            <div class="position-relative" style="height: 100%">
                                <div class="position-absolute top-50 start-0 translate-middle-y">
                                    <div class="d-flex">
                                        <div class="form-check" title="Add/Remove Song">
                                            <input type="checkbox" game="${tab_name}" song-id="${s.index}" class="song-select form-check-input" />
                                        </div>
                                        <div class="flex-grow-1 fw-bold ps-1 song_name_container">
                                            ${s.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="btn song-play" audio="${s.audio}" song_index="${s.index}" play_state="not_loaded" style="width: fit-content">
                            <i class="fa-solid fa-play"></i>
                        </button>
                    </div>
                    <div class="d-flex px-2 pb-2 justify-content-between">
                        <div class="d-flex justify-content-start" style="width: 50%">
                            <div style="width: 50%; max-width: 50%; overflow: hidden">
                                ${converter != '' ? `<div title='Converter${converter.includes(',') ? 's' : ''} into DK64 Soundfont: ${converter}' class="handle-overflow"><i class="fa-solid fa-rotate" style="width: 24px"></i> ${converter}</div>` : ''}
                            </div>
                            <div class="ms-3" style="width: 50%; max-width: 50%">
                                ${composer != '' ? `<div title='Composer${composer.includes(',') ? 's' : ''} of original song: ${composer}' class="handle-overflow"><span class="fw-bold" style="width: 24px">&#119070;</span> ${composer}</div>` : ''}
                            </div>
                        </div>
                        <div>
                            ${tag_html}
                        </div>
                    </div>
                </div>`
            });
            song_inner_html += "</div>";
        }
    })
    const local_song_html = `<div class="tab-pane fade ${shown ? 'show active' : ''}" id="${tab_name}" role="tabpanel" aria-labelledby="tab-${tab_name}" tabindex="0">
        <h1>${game_name}</h1>
        ${song_inner_html}
    </div>`;
    return [local_game_html, local_song_html];
}

function updateGameCount(name = null) {
    let els = [];
    if (name !== null) {
        els = [document.getElementById(`count-${name}`)];
    } else {
        els = document.getElementsByClassName("song_count_digits");
    }
    for (let k = 0; k < els.length; k++) {
        const local_game = els[k].getAttribute("game");
        const song_checkboxes = document.querySelectorAll(`.song-select[game='${local_game}']`);
        let local_count = 0;
        let local_new_count = document.querySelectorAll(`.song-item[game='${local_game}'].song-new`).length;
        let found_false = false;
        let found_true = false;
        for (let i = 0; i < song_checkboxes.length; i++) {
            if (song_checkboxes[i].checked) {
                local_count++;
                found_true = true;
            } else {
                found_false = true;
            }
        }
        const cbx = document.getElementById(`all-${local_game}`);
        cbx.indeterminate = false;
        if ((found_true !== found_false) && (found_true || found_false)) {
            // One but not both are truthy
            cbx.checked = !found_false;
        } else if (found_true && found_false) {
            cbx.indeterminate = true;
        }
        els[k].innerText = local_count;
        let new_text = "";
        document.getElementById(`tab-${local_game}`).classList.remove("has-new");
        if (local_new_count > 0) {
            new_text = `(${local_new_count} new)`;
            document.getElementById(`tab-${local_game}`).classList.add("has-new");
        }
        document.getElementById(`new-${local_game}`).innerText = new_text;
    }
    window.updateCount();
}
window.updateGameCount = updateGameCount;

function selectAllForGame(name = null, state = true) {
    let song_checkboxes = [];
    if (name !== null) {
        song_checkboxes = document.querySelectorAll(`.song-select[game='${name}']`);
    } else {
        song_checkboxes = document.querySelectorAll(`.song-select`);
    }
    for (let k = 0; k < song_checkboxes.length; k++) {
        song_checkboxes[k].checked = state;
    }
    updateGameCount(name);
}

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

    let game_html = "";
    let song_html = "";
    let is_first = true;
    
    Object.keys(songs_by_game).forEach(game_pretty => {
        let game = window.filterName(game_pretty);
        if (game != null) {
            const song_list = songs_by_game[game_pretty].sort()
            const game_name = game_pretty;
            const [local_game, local_song] = addGame(game_name, Object.keys(icon_json).includes(game_name) ? icon_json[game_name].icon : BASE_NO_ICON_IMG, song_list, is_first);
            is_first = false;
            game_html += local_game;
            song_html += local_song;
        }
    })
    document.getElementById("game_list").innerHTML = game_html;
    document.getElementById("song_panel").innerHTML = song_html;

    updateProgress(prog++, total_prog, "Lazy Loading Images");
    ReLoadImages();
    updateProgress(prog++, total_prog, "Populated Site");
    window.updateMaster();
    updateProgress(prog++, total_prog, "Updated Master");
    // Update click events
    document.getElementById("credits_hidden").checked = window.getCookie("credits") == "true";
    document.getElementById("credits_hidden").addEventListener("click", () => {handleCredits(true)});
    const song_selects = document.getElementsByClassName("song-select");
    for (let s = 0; s < song_selects.length; s++) {
        song_selects[s].addEventListener("click", (e) => {
            updateGameCount(e.target.getAttribute("game"));
        })
    }
    const game_all_cb = document.getElementsByClassName("game_all_checkbox");
    for (let s = 0; s < game_all_cb.length; s++) {
        game_all_cb[s].addEventListener("click", (e) => {
            selectAllForGame(e.target.getAttribute("game"), e.target.checked);
        })
    }
    const song_buttons = document.getElementsByClassName("song-play");
    for (let s = 0; s < song_buttons.length; s++) {
        song_buttons[s].addEventListener("click", (e) => {
            const btn = e.target.closest("button");
            const sg_index = parseInt(btn.getAttribute("song_index"));
            if (btn.getAttribute("play_state") == "not_loaded" || (window.current_song !== sg_index)) {
                window.pushSong(sg_index);
                window.playSong(btn.getAttribute("audio"), sg_index);
            }
        })
    }
    document.getElementById("search_game_input").addEventListener("input", window.filterGame)

    if (willAutoDownload()) {
        document.getElementById("build-pack-button").click();
    }
    window.autoPlaySong();
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