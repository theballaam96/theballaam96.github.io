const B64_chars = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q",
    "R","S","T","U","V","W","X","Y","Z",
    "a","b","c","d","e","f"
];
const nums = ["0","1","2","3","4","5","6","7","8","9"];
const BIT_SIZE_PER_CHAR = 5;
const setting_presets = {
    "spooky": "ADcESB2E2COASACAEYB2AM3ACISQAGQ2AI2A2ECAQC2AEIAE6AE2AC3ABE6AJBLAQACBCAB7AECB2AIAEcWIABAEN4AIQIAIQ3AEADAC2ACQEZ3BAICBU3AGQAI10AS2AI3AQAQJ2CABQAFC3AI3AQKA2EUIQC3AMQ3ACQDBQI2AUEJKAC2QAH2ADEAEAQA2BEAQKS2AY2QYCBAI5AI2AC9AIQE11AJ2AEA2IAI5AC4ABAQUE2CAUBUGYAEbG4ACGNKICI3AIAIC2ASQ2ACGIA",
}

function getShareLink(include_settings=false, include_song=false, include_download=false, song_id=0, force_download=false) {
    if (force_download == undefined) {
        force_download = false;
    }
    if (include_download == undefined) {
        include_download = false;
    }
    if (include_song == undefined) {
        include_song = false;
    }
    if (include_settings == undefined) {
        include_settings = false;
    }
    let url = new URL(window.location.href);
    let stateObj = {}
    if (include_settings) {
        const seed = convertSelectionsToString();
        stateObj["s"] = seed;
        url.searchParams.set("s",seed.toString());
    }
    if (include_download) {
        url.searchParams.set("download", force_download.toString())
        stateObj["download"] = force_download.toString()
    }
    if (include_song) {
        url.searchParams.set("conversion_id", song_id.toString())
        stateObj["conversion_id", song_id.toString()]
    }
    window.history.replaceState(stateObj, "", url.toString());
}

function convertSelectionsToString() {
    let activated = [];
    const checkboxes = document.getElementsByClassName("song-item")
    for (let c = 0; c < checkboxes.length; c++) {
        const index = idToSongInfo(checkboxes[c].getAttribute("song-id")).index;
        if (activated.length <= index) {
            const diff = (index - activated.length) + 1;
            for (let d = 0; d < diff; d++) {
                activated.push(false)
            }
        }
        activated[index] = checkboxes[c].getElementsByClassName("song-select")[0].checked;
    }
    const B64_SIZE = Math.ceil(activated.length / BIT_SIZE_PER_CHAR);
    let base64num = new Array(B64_SIZE).fill(0)
    activated.forEach((bit, index) => {
        if (bit) {
            base64num[Math.floor(index / BIT_SIZE_PER_CHAR)] |= (1 << (index % BIT_SIZE_PER_CHAR))
        }
    })
    let b64_string = "";
    let prev_char = "";
    let counter = 0;
    let char_seq = []
    base64num.forEach((character, index) => {
        if ((index == 0) || char_seq[char_seq.length - 1][0] != B64_chars[character]) {
            char_seq.push([])
        }
        char_seq[char_seq.length - 1].push(B64_chars[character])
    })
    char_seq.forEach(subset => {
        if (subset.length > 1) {
            b64_string += subset.length.toString()
        }
        b64_string += subset[0];
    })
    return b64_string;
}

function unpackSeed(seed) {
    const characters = seed.split("");
    let count_string = "";
    let unpacked_seed_nums = [];
    characters.forEach(char => {
        if (nums.includes(char)) {
            count_string += char;
        } else {
            let count = 1;
            if (count_string != "") {
                count = Number(count_string);
            }
            if (B64_chars.includes(char)) {
                for (let c = 0; c < count; c++) {
                    unpacked_seed_nums.push(B64_chars.indexOf(char));
                }
            }
            count_string = "";
        }
    })
    return unpacked_seed_nums.slice()
}

function parseSeed(index) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let seed = urlParams.get("s");
    const preset = urlParams.get("preset");
    if (seed == null) {
        if (preset == null) {
            return false; // No data
        }
        if (!Object.keys(setting_presets).includes(preset)) {
            return false; // Invalid Preset
        }
        seed = setting_presets[preset];
        generateDelayedToast(`Applying the ${preset} preset`)
    } else {
        generateDelayedToast(`Applying selections from URL Parameters`)
    }
    const seed_arr = unpackSeed(seed);
    const loc = Math.floor(index / BIT_SIZE_PER_CHAR);
    const subposition = index % BIT_SIZE_PER_CHAR;
    if (loc >= seed_arr.length) {
        return false; // Data is past seed boundaries
    }
    return (seed_arr[loc] & (1 << subposition)) != 0; // Extracted from seed
}
window.parseSeed = parseSeed;

function generateDelayedToast(message) {
    // Generates toast as soon as soon as the page shows up
    window.generated_delayed_toast = message; 
}