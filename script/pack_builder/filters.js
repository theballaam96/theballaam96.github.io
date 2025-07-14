const QUERY_STRING_IDENTIFIER = "is_qs=true"       
const ACCEPTED_TAGS = [
    "Fights",
    "Lobbies and Shops",
    "Interiors",
    "Exteriors",
    "Minigames",
    "Happy",
    "Gloomy",
    "Calm",
    "Spawning",
    "Collection",
]
let query_keys = {}

function populateTagSuggestions() {
    const hook = document.getElementById("tag-list")
    hook.innerHTML = ACCEPTED_TAGS.map(item => `
        <div class='advf-tag-container'>
            <input type='checkbox' class='advf-tag form-check-input' value='' id='advf-tag-${window.filterName(item)}' data-toggle='toggle' checked/>
            <label for='advf-tag-${window.filterName(item)}' class=form-check-label>${item}</label>
        </div>
    `).join("")
}
populateTagSuggestions();

const tc_sliders = document.getElementsByClassName("slider-range")
const tc_default = [[0, 600], [0, 60]]
const tc_els = ["advf-bgm-length", "advf-noloop-length"]
tc_els.forEach((el, index) => {
    $( `#${el}` ).slider({
        range: true,
        min: tc_default[index][0],
        max: tc_default[index][1],
        values: tc_default[index],
        slide: function( event, ui ) {
            $( `#${el}` ).attr("value-min", ui.values[0])
            $( `#${el}` ).attr("value-max", ui.values[1])
            const handles = event.target.getElementsByClassName("ui-slider-handle")
            for (let i = 0; i < 2; i++) {
                const tc_min = parseInt(ui.values[i] / 60);
                const tc_sec = parseInt(ui.values[i] - (tc_min * 60));
                handles[i].innerHTML = `<span class='ui-slider-timecode'>${tc_min}:${tc_sec < 10 ? `0${tc_sec}` : tc_sec}</span>`
            }
        }
    });
    const hook = document.getElementById(el)
    document.getElementById(el).setAttribute("value-min", tc_default[index][0].toString())
    document.getElementById(el).setAttribute("value-max", tc_default[index][1].toString())
    const tc_handles = hook.getElementsByClassName("ui-slider-handle")
    for (let i = 0; i < 2; i++) {
        const tc_min = parseInt(tc_default[index][i] / 60);
        const tc_sec = parseInt(tc_default[index][i] - (tc_min * 60));
        tc_handles[i].innerHTML = `<span class='ui-slider-timecode'>${tc_min}:${tc_sec < 10 ? `0${tc_sec}` : tc_sec}</span>`
    }
})

function filterAdvancedFilterValue(value) {
    if (value == "") {
        return null
    }
    return value.replaceAll("&","").replace("=","")
}

function checkQueryKey(key) {
    if (Object.keys(query_keys).includes(key)) {
        const key_value = query_keys[key]
        if (key_value == "true") {
            return true;
        } else if (key_value == "false") {
            return false;
        } else if (isNumeric(key_value)) {
            return parseFloat(key_value);
        }
        return key_value
    }
    return null;
}

function adheresToFilter(index) {
    /*
        .name .game .group
        .composer .converter
        .drive_id .timestamp
        .audio .index .midi_length
        .track_count .tags .notes
        .days_since_submission .is_new
        .older_revisions .changelog_entry
        .safe
    */
    const midi_info = midi_data_copy.find(item => item.index == index)
    const filter_value = document.getElementById("search-game").value.toLowerCase();
    const filtered_game = window.filterName(filter_value);
    if (filter_value.includes(QUERY_STRING_IDENTIFIER)) {
        const array_keys = ["composers","converters"]
        const queries = filter_value.split("&")
        query_keys = {}
        queries.forEach(query => {
            if (query != QUERY_STRING_IDENTIFIER) {
                const q_k = query.split("=")[0]
                const q_v = query.split("=")[1]
                if (array_keys.includes(q_k)) {
                    query_keys[q_k] = q_v.split(",").map(item => item.trim())
                } else {
                    query_keys[q_k] = q_v
                }
            }
        })
        Object.keys(query_keys).forEach(key => {
            query_keys[key] = checkQueryKey(key); // Basic filtering
        })
        let valid_entry = true;
        Object.keys(query_keys).forEach(key => {
            if (!valid_entry) {
                return;
            }
            const key_value = query_keys[key];
            if (key == "game") {
                valid_entry &= midi_info.game.toLowerCase().includes(window.filterName(key_value));
            } else if (key == "song") {
                valid_entry &= midi_info.name.toLowerCase().includes(key_value);
            } else if (key == "composers") {
                const entry_composers = midi_info.composer.split(",").map(item => item.trim().toLowerCase())
                let has_valid_composer = false;
                entry_composers.forEach(composer => {
                    key_value.forEach(suggested_composer => {
                        has_valid_composer |= composer.includes(suggested_composer)
                    })
                })
                valid_entry &= has_valid_composer;
            } else if (key == "converters") {
                const entry_converters = midi_info.converter.split(",").map(item => item.trim().toLowerCase())
                let has_valid_converter = false;
                entry_converters.forEach(converter => {
                    key_value.forEach(suggested_converter => {
                        has_valid_converter |= converter.includes(suggested_converter)
                    })
                })
                valid_entry &= has_valid_converter;
            } else if (key == "group") {
                if (key_value.toLowerCase() != "any") {
                    let referenced_group = key_value;
                    if (key_value == "background music") {
                        referenced_group = "bgm"
                    }
                    valid_entry &= midi_info.group.replaceAll(" ","") == referenced_group.toLowerCase()
                }
            } else if (key == "bgm-min") {
                if (midi_info.group == "bgm") {
                    valid_entry &= midi_info.midi_length >= key_value;
                }
            } else if (key == "bgm-max") {
                if (midi_info.group == "bgm") {
                    valid_entry &= midi_info.midi_length <= key_value;
                }
            } else if (key == "noloop-min") {
                if (midi_info.group != "bgm") {
                    valid_entry &= midi_info.midi_length >= key_value;
                }
            } else if (key == "noloop-max") {
                if (midi_info.group != "bgm") {
                    valid_entry &= midi_info.midi_length <= key_value;
                }
            } else if (key.substring(0,4) == "tag-") {
                const tag = key.substring(4)
                if (key_value) {
                    valid_entry &= midi_info.tags.length == 0 || midi_info.tags.map(item => item.replaceAll(" ","").toLowerCase()).includes(tag)
                }
            } else if (key == "safe") {
                if (key_value) {
                    valid_entry &= (!midi_info.tags.includes(unsafe_song_tag));
                }
            }
        })
        return valid_entry;
    }
    if (filter_value.replaceAll(" ","") == "") {
        return true;
    }
    return midi_info.game.toLowerCase().includes(filtered_game) || midi_info.name.toLowerCase().includes(filter_value);
}

function adheresToFilterCheckbox(el) {
    const name = el.getElementsByClassName("name_data")[0].innerText;
    const success = adheresToFilter(parseInt(el.getAttribute("song-id")));
    return success;
}

function filterGame() {
    const checkboxes = document.getElementsByClassName("midi-checkbox-container");
    for (let c = 0; c < checkboxes.length; c++) {
        if (adheresToFilterCheckbox(checkboxes[c].getElementsByClassName("midi-checkbox")[0])) {
            checkboxes[c].classList.remove("hide");
        } else {
            checkboxes[c].classList.add("hide");
        }
    }
    const handlers = document.getElementsByClassName("game-handler")
    for (let h = 0; h < handlers.length; h++) {
        const h_checkboxes = handlers[h].getElementsByClassName("midi-checkbox-container");
        let has_any = false;
        for (let c = 0; c < h_checkboxes.length; c++) {
            has_any |= !h_checkboxes[c].classList.contains("hide");
        }
        if (has_any) {
            handlers[h].classList.remove("hide");
        } else {
            handlers[h].classList.add("hide");
        }
    }
}

function compileAdvancedFilters() {
    let filtering_information = {
        "game": filterAdvancedFilterValue(document.getElementById("advf-game").value),
        "song": filterAdvancedFilterValue(document.getElementById("advf-song").value),
        "group": filterAdvancedFilterValue(document.getElementById("advf-group").value),
        "bgm-min": parseInt(document.getElementById("advf-bgm-length").getAttribute("value-min")),
        "bgm-max": parseInt(document.getElementById("advf-bgm-length").getAttribute("value-max")),
        "noloop-min": parseInt(document.getElementById("advf-noloop-length").getAttribute("value-min")),
        "noloop-max": parseInt(document.getElementById("advf-noloop-length").getAttribute("value-max")),
        "composers": filterAdvancedFilterValue(document.getElementById("advf-composer").value),
        "converters": filterAdvancedFilterValue(document.getElementById("advf-converter").value),
        "safe": document.getElementById("advf-safe").checked,
    }
    let all_tagged = true;
    ACCEPTED_TAGS.forEach(tag => {
        if (!document.getElementById(`advf-tag-${window.filterName(tag)}`).checked) {
            all_tagged = false;
        }
    })
    if (!all_tagged) {
        ACCEPTED_TAGS.forEach(tag => {
            filtering_information[`tag-${window.filterName(tag)}`] = document.getElementById(`advf-tag-${window.filterName(tag)}`).checked
        })
    }
    let filtering_array = [QUERY_STRING_IDENTIFIER]
    Object.keys(filtering_information).forEach(key => {
        if (filtering_information[key] != null) {
            filtering_array.push(`${key}=${filtering_information[key]}`)
        }
    })
    document.getElementById("search-game").value = filtering_array.join("&");
    filterGame();
}