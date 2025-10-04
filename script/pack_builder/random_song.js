window.playing_random = false;
let song_history = [];
let song_position = -1;

function playSongId(id) {
    window.stopAllAudio();
    const container = document.getElementById(`song-${id}`);
    container.getElementsByClassName("song-play")[0].click();
    window.showSongPopup(id);
    window.playing_random = true;
}

function playRandomSong() {
    const valid_ids = midi_data_copy.filter(k => k.group == "bgm").map(k => k.index);
    const random_id = valid_ids[Math.floor(Math.random() * valid_ids.length)];
    song_history.push(random_id);
    song_position++;
    playSongId(random_id);
}
window.playRandomSong = playRandomSong;

document.getElementById("rs-prev").addEventListener("click", () => {
    if (song_position > 0) {
        song_position--;
    }
    playSongId(song_history[song_position]);
})
document.getElementById("rs-next").addEventListener("click", () => {
    if (song_position == (song_history.length - 1)) {
        playRandomSong();
    } else {
        song_position++;
        playSongId(song_history[song_position]);
    }
});
// document.getElementById("rs-toggle").addEventListener("click", () => {
//     const toastEl = document.getElementById('rs-toast-inner');
//     const toast = bootstrap.Toast.getOrCreateInstance(toastEl);
//     toast.hide();
//     window.stopAllAudio();
//     playing_random = false;
// });