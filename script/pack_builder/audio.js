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
    const checkboxes = document.getElementsByClassName("song-item");
    folder_data = {...uploaded_pack_data}
    let data_array = []
    for (let c = 0; c < checkboxes.length; c++) {
        if (checkboxes[c].getElementsByClassName("song-select")[0].checked) {
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

let player;
let currentInterval;
window.current_song = null;

function updatePlayer(videoId, index) {
    console.log(`Playing ${videoId}`)
    if (player && player.destroy) {
        player.destroy();
    }
    const container = document.getElementById(`song-${index}`);
    const playBtn = container.getElementsByClassName('song-play')[0];
    playBtn.innerHTML = "<i class='fa-solid fa-spinner'></i>";
    playBtn.setAttribute("play_state", "loading");
    player = new YT.Player('player', {
        videoId: videoId, // replace with your video ID
        playerVars: {
            controls: 0,
            modestbranding: 1
        },
        events: {
            onReady: (event) => {
                setupControls(index, true);
            }
        }
    });
}

function playVideo(button, seekBar) {
    button.innerHTML = "<i class='fa-solid fa-pause'></i>";
    button.setAttribute("play_state", "playing");
    player.playVideo();
    seekBar.removeAttribute("hidden");
}

function pauseVideo(button) {
    button.innerHTML = "<i class='fa-solid fa-play'></i>";
    button.setAttribute("play_state", "paused");
    player.pauseVideo();
}

function clearSongUIFromIndex(index) {
    const container = document.getElementById(`song-${index}`);
    if (!container) {
        return;
    }
    const playBtn = container.getElementsByClassName("song-play")[0];
    playBtn.innerHTML = "<i class='fa-solid fa-play'></i>";
    playBtn.setAttribute("play_state", "not_loaded");

    const seekBar = container.getElementsByClassName('song-seek-container')[0];
    seekBar.setAttribute("hidden", "hidden");
}

function numToTime(num) {
    const as_int = parseInt(num);
    const secs = as_int % 60;
    const mins = parseInt((as_int - secs) / 60);
    const secs_s = secs < 10 ? `0${secs}` : secs;
    const mins_s = mins < 10 ? `0${mins}` : mins;
    return `${mins_s}:${secs_s}`
}

function setupControls(index, autoplay) {
    console.log("Setting up controls")
    const container = document.getElementById(`song-${index}`);
    const playBtn = container.getElementsByClassName('song-play')[0];
    // const pauseBtn = document.getElementById('pause');
    const seekBar = container.getElementsByClassName('song-seek')[0];
    const songTime = container.getElementsByClassName('song-time')[0];
    const seekBarContainer = container.getElementsByClassName('song-seek-container')[0];
    // const volumeBar = document.getElementById('volume');

    playBtn.onclick = (e) => {
        const playState = e.target.closest("button").getAttribute("play_state");
        if (playState == "playing") {
            pauseVideo(playBtn);
        } else if (playState == "paused") {
            playVideo(playBtn, seekBarContainer); 
        }
    };
    // pauseBtn.onclick = () => player.pauseVideo();
    // volumeBar.oninput = (e) => player.setVolume(e.target.value);

    // Update seek bar regularly
    currentInterval = setInterval(() => {
        if (player && player.getDuration) {
            const duration = player.getDuration();
            const current = player.getCurrentTime();
            if (duration > 0) {
                seekBar.value = (current / duration) * 100;
                songTime.innerHTML = `${numToTime(current)} / ${numToTime(duration)}`;
                if (seekBar.value == 100) {
                    clearSongUIFromIndex(window.current_song);
                }
            }
        }
    }, 500);

    // Seeking
    seekBar.oninput = (e) => {
        const percent = e.target.value / 100;
        player.seekTo(player.getDuration() * percent, true);
    };
    if (autoplay) {
        playVideo(playBtn, seekBarContainer);
    }
}

function playSong(url, converter, index=null) {
    const hook = document.getElementById("audio-event-content");
    getShareLink(false, true, false, index, false);
    if (window.current_song !== null) {
        clearSongUIFromIndex(window.current_song);
    }
    if (currentInterval) {
        clearInterval(currentInterval);
    }
    window.current_song = index;
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
            updatePlayer(video_id, index);
        }
    } else {
        window.open(url, "_blank");
        document.getElementById("playSongModalClose").click();
        return;
    }
}
window.playSong = playSong;

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