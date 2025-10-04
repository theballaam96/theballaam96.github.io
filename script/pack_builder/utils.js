function getSongSelectedCount() {
    const checkboxes = document.querySelectorAll(".song-select:checked");
    return checkboxes.length;
}
window.getSongSelectedCount = getSongSelectedCount;

function idToSongInfo(id) {
    if (midi_data_copy != null) {
        let song = null;
        let song_short = null;
        let folder = null;
        let download = null;
        let song_index = null;
        let drive_id = null;
        let game = null;
        let preview = null;
        let tags = [];
        const entry = midi_data_copy.find(item => item.index == id);
        if (entry) {
            song = entry.name;
            song_short = entry.short_name;
            folder = entry.group;
            download = entry.drive_id;
            song_index = id;
            drive_id = entry.drive_id
            game = entry.game;
            preview = entry.audio,
            tags = entry.tags
        }
        if (song != null) {
            return {
                "song": song,
                "song_short": song_short,
                "game": game,
                "folder": folder,
                "download": download,
                "index": song_index,
                "drive_id": drive_id,
                "preview": preview,
                "tags": tags.slice()
            }
        }
    }
    return null;
}
window.idToSongInfo = idToSongInfo;

function waitFor(conditionFunction) {
    const poll = resolve => {
        if(conditionFunction()) resolve();
        else setTimeout(_ => poll(resolve), 400);
    }
    return new Promise(poll);
}
window.waitFor = waitFor;

function last(array) {
    return array[array.length - 1];
}
window.last = last;

const char_upper_alpha_idx = Array.from(Array(26)).map((e, i) => i + 65);
const char_lower_alpha_idx = Array.from(Array(26)).map((e, i) => i + 97);
const char_upper_alpha = char_upper_alpha_idx.map((x) => String.fromCharCode(x));
const char_lower_alpha = char_lower_alpha_idx.map((x) => String.fromCharCode(x));
const char_num = Array.from(Array(10).keys()).map(x => x.toString())
const char_alphanumeric = char_upper_alpha + char_lower_alpha + char_num;
function filterName(name) {
    return name.split("").filter(item => char_alphanumeric.includes(item)).join("").toLowerCase();
}
window.filterName = filterName;

function clone(instance) {
    return Object.assign(
        Object.create(
            // Set the prototype of the new object to the prototype of the instance.
            // Used to allow new object behave like class instance.
            Object.getPrototypeOf(instance),
        ),
        // Prevent shallow copies of nested structures like arrays, etc
        JSON.parse(JSON.stringify(instance)),
    );
}