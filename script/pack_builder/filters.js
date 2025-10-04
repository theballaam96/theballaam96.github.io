function adheresToFilters(song) {
    const song_search = document.getElementById("filter-songname").value.trim().toLowerCase();
    if ((song_search.length > 0) && !song.name.toLowerCase().includes(song_search)) {
        return false;
    }
    const group_search = document.getElementById("filter-group").value;
    if (group_search != "any" && song.group != group_search) {
        return false;
    }
    const composer_search = document.getElementById("filter-composer").value.trim().toLowerCase();
    if ((composer_search.length > 0) && !song.composer.toLowerCase().includes(composer_search)) {
        return false;
    }
    const converter_search = document.getElementById("filter-converter").value.trim().toLowerCase();
    if ((converter_search.length > 0) && !song.converter.toLowerCase().includes(converter_search)) {
        return false;
    }
    const new_search = document.getElementById("filter-new").value;
    if (new_search != "any" && window.uploaded_date !== null) {
        const upl_date = new Date(window.uploaded_date);
        const song_date = new Date(song.initial_timestamp);
        if ((upl_date <= song_date) && (new_search == "not-new")) {
            return false;
        }
        if ((song_date < upl_date) && (new_search == "new")) {
            return false;
        }
    }
    console.log(song);
    return true;
}
window.adheresToFilters = adheresToFilters;

function filterGame() {
    const list_items = document.querySelectorAll("#game_list li");
    const search_term = document.getElementById("search_game_input").value;
    let force_show = false;
    if (search_term.trim().length == 0) {
        force_show = true;
    }
    for (let l = 0; l < list_items.length; l++) {
        const name = list_items[l].getElementsByClassName("name_container")[0].innerText;
        if (name.toLowerCase().includes(search_term.toLowerCase()) || force_show) {
            list_items[l].classList.remove("d-none");
        } else {
            list_items[l].classList.add("d-none");
        }
    }
}
window.filterGame = filterGame;

const filter_data = {
    "filter-songname": "input",
    "filter-group": "change",
    "filter-new": "change",
    "filter-composer": "input",
    "filter-converter": "input",
}

function rebuildView() {
    let game_counts = {};
    midi_data_copy.forEach(song => {
        const show = adheresToFilters(song);
        const song_el = document.getElementById(`song-${song.index}`);
        if (show) {
            song_el.classList.remove("filter-invalidated");
            const game = `tab-${song_el.getAttribute("game")}`;
            if (!Object.keys(game_counts).includes(game)) {
                game_counts[game] = 0;
            }
            game_counts[game]++;
        } else {
            song_el.classList.add("filter-invalidated");
        }
    });
    const game_tabs = document.getElementsByClassName("game-tab");
    for (let g = 0; g < game_tabs.length; g++) {
        const id = game_tabs[g].getAttribute("id");
        if (!Object.keys(game_counts).includes(id)) {
            game_tabs[g].classList.add("filter-invalidated");
        } else {
            game_tabs[g].classList.remove("filter-invalidated");
        }
    };
}

function resetFilters() {
    Object.keys(filter_data).forEach(f => {
        if (filter_data[f] == "input") {
            document.getElementById(f).value = "";
        } else if (filter_data[f] == "change") {
            document.getElementById(f).value = "any";
        }
    });
}