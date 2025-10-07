window.playing_random = false;
let song_history = [];
let song_position = -1;
let song_order = null;
let song_order_with_nobgm = null;

function populate_song_order() {
    if (song_order !== null) {
        return;
    }
    song_order = [];
    song_order_with_nobgm = [];
    const items = document.getElementsByClassName("song-item");
    for (let i = 0; i < items.length; i++) {
        const id = parseInt(items[i].getAttribute("song-id"));
        song_order_with_nobgm.push(id);
        if (items[i].getAttribute("group") == "bgm") {
            song_order.push(id);
        }
    }
}

function playNextSong() {
    let index = 0;
    populate_song_order();
    const checked_count = window.getSongSelectedCount();
    if (window.current_song !== null) {
        index = song_order.indexOf(window.current_song);
        if (!song_order.includes(window.current_song)) { // Non-bgm
            let temp_index = song_order_with_nobgm.indexOf(window.current_song);
            let start_index = temp_index;
            while (true) {
                temp_index++;
                if (temp_index >= song_order_with_nobgm.length) {
                    temp_index = 0;
                }
                if (song_order.includes(song_order_with_nobgm[temp_index])) {
                    index = song_order.indexOf(song_order_with_nobgm[temp_index]);
                    break;
                }
                if (start_index == temp_index) {
                    break;
                }
            }
        }
    }
    if (index == -1) {
        index = 0;
    }
    let start_index = index;
    while (true) {
        index++;
        if (index >= song_order.length) {
            index = 0;
        }
        if (checked_count == 0) {
            break;
        }
        const container = document.getElementById(`song-${song_order[index]}`);
        if (container.getElementsByClassName("song-select")[0].checked) {
            break;
        }
        if (start_index == index) {
            break;
        }
    }
    let id = song_order[index];
    id = pushSong(id);
    playSongId(id);
}

function updatePrevious() {
    if (song_position <= 0) {
        document.getElementById("rs-prev").classList.add("text-secondary");
        document.getElementById("rs-prev").setAttribute("disabled", "disabled");
    } else {
        document.getElementById("rs-prev").classList.remove("text-secondary");
        document.getElementById("rs-prev").removeAttribute("disabled");
    }
}

function playSongId(id) {
    updatePrevious();
    window.stopAllAudio();
    const container = document.getElementById(`song-${id}`);
    const btn = container.getElementsByClassName("song-play")[0];
    window.playSong(btn.getAttribute("audio"), id);
    window.showSongPopup(id);
}

function pushSong(id) {
    song_position++;
    if (song_position >= song_history.length) {
        song_history.push(id)
        return id;
    }
    return song_history[song_position];
}
window.pushSong = pushSong;

function playRandomSong() {
    let valid_ids = midi_data_copy.filter(k => k.group == "bgm").map(k => k.index);
    const checked_count = window.getSongSelectedCount();
    if (checked_count > 0) {
        const cbx = document.querySelectorAll(".song-select:checked");
        let selected_ids = [];
        for (let c = 0; c < cbx.length; c++) {
            selected_ids.push(parseInt(cbx[c].getAttribute("song-id")));
        }
        if (selected_ids.length > 0) {
            valid_ids = valid_ids.filter(x => selected_ids.includes(x));
        }
    }
    let random_id = valid_ids[Math.floor(Math.random() * valid_ids.length)];
    random_id = pushSong(random_id);
    playSongId(random_id);
    window.playing_random = true;
    document.getElementById("rs-shuffle").classList.remove("text-secondary");
}
window.playRandomSong = playRandomSong;

function playNextSongContainer() {
    if (window.playing_random) {
        playRandomSong();
    } else {
        playNextSong();
    }
}

document.getElementById("rs-prev").addEventListener("click", () => {
    if (song_position > 0) {
        song_position--;
    }
    playSongId(song_history[song_position]);
})
document.getElementById("rs-next").addEventListener("click", () => {
    if (song_position == (song_history.length - 1)) {
        playNextSongContainer();
    } else {
        song_position++;
        playSongId(song_history[song_position]);
    }
});
document.getElementById("rs-shuffle").addEventListener("click", () => {
    const btn = document.getElementById("rs-shuffle");
    btn.classList.toggle("text-secondary");
    if (!btn.classList.contains("text-secondary")) {
        window.playing_random = true;
    } else {
        window.playing_random = false;
    }
});

document.getElementById("rs-goto").addEventListener("click", () => {
    const btn = document.getElementById("rs-goto");
    if (!btn.hasAttribute("disabled") && !btn.classList.contains("text-secondary")) {
        window.gotoCurrentGame();
    }
});
// document.getElementById("rs-toggle").addEventListener("click", () => {
//     const toastEl = document.getElementById('rs-toast-inner');
//     const toast = bootstrap.Toast.getOrCreateInstance(toastEl);
//     toast.hide();
//     window.stopAllAudio();
//     playing_random = false;
// });