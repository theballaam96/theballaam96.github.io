YT_EMBED_CAP = 199

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
  
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function getYTPlaylist() {
    if ((window.getSongSelectedCount() < 1) && (Object.keys(uploaded_pack_data).length == 0)) {
        window.generateToast("Cannot generate playlist, no songs selected", true);
        return;
    }
    const checkboxes = document.getElementsByClassName("midi-checkbox");
    folder_data = {...uploaded_pack_data}
    let data_array = []
    for (let c = 0; c < checkboxes.length; c++) {
        if (checkboxes[c].getAttribute("ticked") == "true") {
            if (checkboxes[c].getAttribute("group") == "bgm") {
                const data = window.idToSongInfo(checkboxes[c].getAttribute("song-id"));
                if (data != null) {
                    data_array.push(data)
                }
            }
        }
    }
    data_array = data_array.filter(item => item.preview.includes("youtube") || item.preview.includes("youtu.be"))
    data_array = data_array.map(item => item.preview)
    shuffle(data_array)
    if (data_array.length > YT_EMBED_CAP) {
        // Embeded playlists only can have a max of YT_EMBED_CAP videos
        data_array = data_array.filter((item, index) => index < YT_EMBED_CAP)
    }
    let yt_ids = []
    data_array.forEach(item => {
        YT_LONG_SPLITTER = "youtube.com/watch?v="
        YT_SHORT_SPLITTER = "youtu.be/"
        if (item.includes(YT_LONG_SPLITTER)) {
            let id_seg = item.split(YT_LONG_SPLITTER)[1]
            if (id_seg.includes("&")) {
                id_seg = id_seg.split("&")[0]
            }
            yt_ids.push(id_seg)
        } else if (item.includes(YT_SHORT_SPLITTER)) {
            let id_seg = item.split(YT_SHORT_SPLITTER)[1]
            if (id_seg.includes("?")) {
                id_seg = id_seg.split("?")[0]
            }
            yt_ids.push(id_seg)
        }
    })
    const LINK_INIT = "http://www.youtube.com/embed/?playlist="
    const full_link = `${LINK_INIT}${yt_ids.join(",")}`
    window.open(full_link, "_blank");
}

function playSong(url, converter, song_name, index=null) {
    const hook = document.getElementById("audio-event-content");
    getShareLink(false, true, false, index, false);
    document.getElementById("playSongModalLabel").innerText = song_name;
    if ((url.includes("cdn.discordapp.com")) || (url.includes(GITHUB_AUDIO))) {
        // Embedded audio
        hook.innerHTML = `
            <audio controls autoplay>
                <source src="${url}" type="audio/mpeg">
            </audio>
        `
    } else if ((url.includes("youtube")) || (url.includes("youtu.be"))) {
        const CONVERTER_NO_EXTERNAL = []; // Any users who make their videos non-distributable on external websites will just open a new tab to YT
        if (CONVERTER_NO_EXTERNAL.includes(converter)) {
            window.open(url, "_blank");
            document.getElementById("playSongModalClose").click();
            return;
        }
        // Embedded YT Link
        let video_id = null;
        if (url.includes("youtube")) {
            // Full YT Link
            const queryString = `?${url.split("?")[1]}`;
            const urlParams = new URLSearchParams(queryString);
            video_id = urlParams.get("v")
        } else if (url.includes("youtu.be")) {
            // YT URL Shortener
            video_id = window.last(url.split("/"))
        }
        if (video_id != null) {
            hook.innerHTML = `
                <iframe 
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/${video_id}"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                    ></iframe>
            `
        }
    } else {
        window.open(url, "_blank");
        document.getElementById("playSongModalClose").click();
        return;
    }
}

function closeSong() {
    document.getElementById("audio-event-content").innerHTML = ""
}

function autoPlaySong() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlOutput = urlParams.get("conversion_id")
    if (urlOutput == null) {
        const game = urlParams.get("game");
        if (game == null) {
            return;
        }
        const btn = document.querySelector(`.game-header[game_id='${game}']`);
        if (btn) {
            btn.click();
        }
        return;
    }
    let song_id = null;
    if (!isNaN(urlOutput)) {
        song_id = Number(urlOutput);
    }
    const audio_clickers = document.getElementsByClassName("audio-clicker")
    for (let a = 0; a < audio_clickers.length; a++) {
        const targ_id = audio_clickers[a].getAttribute("conversion_id");
        if (!isNaN(targ_id)) {
            if (Number(targ_id) == song_id) {
                audio_clickers[a].click();
                return;
            }
        }
    }

}