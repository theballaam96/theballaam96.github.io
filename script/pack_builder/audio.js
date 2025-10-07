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

function updatePlayer(videoId, autoplay=true) {
    console.log(`Playing ${videoId}`)
    if (player && player.destroy) {
        player.destroy();
    }
    const playBtn = document.getElementById("rs-toggle");
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
                setupControls(autoplay);
            }
        }
    });
}

function playVideo(update_yt_player = true) {
    document.getElementById("rs-toggle").innerHTML = "<i class='fa-solid fa-pause'></i>";
    document.getElementById("rs-toggle").setAttribute("play_state", "playing");
    if (update_yt_player) {
        player.setVolume(document.getElementById("rs-volume").value);
        player.playVideo();
    } else {
        document.getElementById("audio-event-handler").volume = document.getElementById("rs-volume").value / 100;
        document.getElementById("audio-event-handler").play();
    }
}

function pauseVideo(update_yt_player = true) {
    document.getElementById("rs-toggle").innerHTML = "<i class='fa-solid fa-play'></i>";
    document.getElementById("rs-toggle").setAttribute("play_state", "paused");
    if (update_yt_player) {
        player.pauseVideo();
    } else {
        document.getElementById("audio-event-handler").pause();
    }
}

function numToTime(num) {
    const as_int = parseInt(num);
    const secs = as_int % 60;
    const mins = parseInt((as_int - secs) / 60);
    const secs_s = secs < 10 ? `0${secs}` : secs;
    const mins_s = mins < 10 ? `0${mins}` : mins;
    return `${mins_s}:${secs_s}`
}

function showSongPopup(id) {
    const container = document.getElementById(`song-${id}`);
    const game = container.getAttribute("game");
    const game_tab = document.getElementById(`tab-${game}`);
    const game_name = game_tab.getElementsByClassName("name_container")[0].innerText.trim();
    const song_name = container.getElementsByClassName("song_name_container")[0].innerText.trim();
    document.getElementById("rs-song").innerText = song_name;
    document.getElementById("rs-game").innerText = game_name;
    
    // Enable the goto button when a song is playing
    const gotoBtn = document.getElementById("rs-goto");
    gotoBtn.classList.remove("text-secondary");
    gotoBtn.removeAttribute("disabled");
    
    console.log(`Playing: ${game_name} - ${song_name}`);
    const toastEl = document.getElementById('rs-toast-inner');
    if (!toastEl.classList.contains("show")) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastEl, {
            autohide: false
        });
        toastBootstrap.show()
    }
}
window.showSongPopup = showSongPopup;

function updateSongProgress(current, duration, seekBar, songTime) {
    if (!current) {
        current = 0;
    }
    if (!duration) {
        return;
    }
    if (duration > 0) {
        seekBar.value = (current / duration) * 100;
        songTime.innerHTML = `${numToTime(current)} / ${numToTime(duration)}`;
        if (seekBar.value == 100) {
            if (window.playing_random) {
                console.log("New song")
                window.playRandomSong();
            }
        }
    }
}

function setVolumeFA() {
    const vol = document.getElementById("rs-volume").value;
    const container = document.getElementById("volume-control-btn");
    let fa_class = "volume-high";
    if (vol == 0) {
        fa_class = "volume-xmark";
    } else if (vol < 10) {
        fa_class = "volume-off";
    } else if (vol < 50) {
        fa_class = "volume-low";
    }
    container.innerHTML = `<i class="fa-solid fa-${fa_class}"></i>`;
}

function setupControls(autoplay = true) {
    console.log("Setting up controls")
    const playBtn = document.getElementById("rs-toggle");
    // const pauseBtn = document.getElementById('pause');
    const seekBar = document.getElementById("rs-seek");
    const songTime = document.getElementById("song-time");
    const volumeBar = document.getElementById("rs-volume");

    playBtn.onclick = (e) => {
        const playState = e.target.closest("button").getAttribute("play_state");
        if (playState == "playing") {
            pauseVideo();
        } else if (playState == "paused") {
            playVideo(); 
        }
    };
    volumeBar.oninput = (e) => {
        player.setVolume(e.target.value);
        setVolumeFA();
    };

    // Update seek bar regularly
    currentInterval = setInterval(() => {
        if (player && player.getDuration) {
            const duration = player.getDuration();
            const current = player.getCurrentTime();
            updateSongProgress(current, duration, seekBar, songTime);
        }
    }, 500);
    player.addEventListener("onStateChange", e => {
        const duration = player.getDuration();
        const current = player.getCurrentTime();
        updateSongProgress(current, duration, seekBar, songTime);
    });

    // Seeking
    seekBar.oninput = (e) => {
        const percent = e.target.value / 100;
        player.seekTo(player.getDuration() * percent, true);
    };
    if (autoplay) {
        playVideo();
    } else {
        pauseVideo();
    }
}

function updateAudioPlayer(url, autoplay=true) {
    const audio_container = document.getElementById("audio-event-content");
    audio_container.innerHTML = `
        <audio controls autoplay id="audio-event-handler">
            <source src="${url}" type="audio/mpeg">
        </audio>
    `
    const playBtn = document.getElementById("rs-toggle");
    // const pauseBtn = document.getElementById('pause');
    const seekBar = document.getElementById("rs-seek");
    const songTime = document.getElementById("song-time");
    const volumeBar = document.getElementById("rs-volume");
    playBtn.onclick = (e) => {
        const playState = e.target.closest("button").getAttribute("play_state");
        if (playState == "playing") {
            pauseVideo(false);
        } else if (playState == "paused") {
            playVideo(false); 
        }
    };
    volumeBar.oninput = (e) => {
        document.getElementById("audio-event-handler").volume = e.target.value / 100;
        setVolumeFA();
    };
    currentInterval = setInterval(() => {
        const audio_handler = document.getElementById("audio-event-handler");
        if (audio_handler) {
            updateSongProgress(audio_handler.currentTime, audio_handler.duration, seekBar, songTime);
        }
    }, 500);
    audio_container.addEventListener("timeupdate", () => {
        const audio_handler = document.getElementById("audio-event-handler");
        updateSongProgress(audio_handler.currentTime, audio_handler.duration, seekBar, songTime);
    });



    // Seeking
    seekBar.oninput = (e) => {
        const percent = e.target.value / 100;
        const audio_handler = document.getElementById("audio-event-handler");
        audio_handler.currentTime = audio_handler.duration * percent;
    };
    if (autoplay) {
        playVideo(false);
    } else {
        pauseVideo(false);
    }
}

function stopAllAudio() {
    if (currentInterval) {
        clearInterval(currentInterval);
    }
    const audio_handler = document.getElementById("audio-event-handler");
    if (audio_handler) {
        audio_handler.pause();
        document.getElementById("audio-event-content").innerHTML = "";
    }
    if (player && player.destroy) {
        player.destroy();
    }
    
    // Disable the goto button when audio stops
    const gotoBtn = document.getElementById("rs-goto");
    if (gotoBtn) {
        gotoBtn.classList.add("text-secondary");
        gotoBtn.setAttribute("disabled", "disabled");
    }
}
window.stopAllAudio = stopAllAudio;

function playSong(url, index=null, autoplay=true) {
    getShareLink(false, true, false, index, false);
    stopAllAudio();
    window.current_song = index;
    if ((url.includes("cdn.discordapp.com")) || (url.includes(GITHUB_AUDIO))) {
        // Embedded audio
        updateAudioPlayer(url, autoplay);
    } else if ((url.includes("youtube")) || (url.includes("youtu.be"))) {
        // Embedded YT Link
        let video_id = null;
        if (url.includes("youtube")) {
            // Full YT Link
            const queryString = `?${url.split("?")[1]}`;
            const urlParams = new URLSearchParams(queryString);
            video_id = urlParams.get("v")
        } else if (url.includes("youtu.be")) {
            // YT URL Shortener
            video_id = window.last(url.split("/")).split("?")[0]
        }
        if (video_id != null) {
            updatePlayer(video_id, autoplay);
        }
    } else {
        window.open(url, "_blank");
        document.getElementById("playSongModalClose").click();
        return;
    }
    showSongPopup(index);
}
window.playSong = playSong;

function closeSong() {
    document.getElementById("audio-event-content").innerHTML = "";
    
    // Disable the goto button when the song modal is closed
    const gotoBtn = document.getElementById("rs-goto");
    if (gotoBtn) {
        gotoBtn.classList.add("text-secondary");
        gotoBtn.setAttribute("disabled", "disabled");
    }
    
    // Clear the current song
    window.current_song = null;
}

function autoPlaySong() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlOutput = urlParams.get("conversion_id")
    console.log(urlOutput)
    if (urlOutput == null) {
        return;
    }
    let song_id = null;
    if (!isNaN(urlOutput)) {
        song_id = Number(urlOutput);
    }
    const container = document.getElementById(`song-${song_id}`);
    if (container) {
        const btn = container.getElementsByClassName("song-play")[0];
        if (btn) {
            const id = parseInt(btn.getAttribute("song_index"));
            window.pushSong(id);
            playSong(btn.getAttribute("audio"), id, false);
        }
    }
}
window.autoPlaySong = autoPlaySong;

function gotoCurrentGame() {
    if (window.current_song == null) {
        console.warn("No current song playing");
        return;
    }
    
    const container = document.getElementById(`song-${window.current_song}`);
    if (!container) {
        console.warn(`Could not find song container for song ${window.current_song}`);
        return;
    }
    
    const game = container.getAttribute("game");
    const game_tab = document.getElementById(`tab-${game}`);
    if (!game_tab) {
        console.warn(`Could not find game tab: tab-${game}`);
        return;
    }
    
    console.log(`Going to song ${window.current_song} in game: ${game}`);
    
    // Switch to game view if needed
    const global_song_list = document.getElementById("song_list");
    const popup_container = document.getElementById("popup_global_container");
    
    if (global_song_list && !global_song_list.hasAttribute("hidden")) {
        global_song_list.setAttribute("hidden", "");
        popup_container.removeAttribute("hidden");
    }
    
    // Activate the game tab
    game_tab.click();
    
    // Scroll to and highlight the song after a brief delay
    setTimeout(() => {
        const songElement = document.querySelector(`#${game} #song-${window.current_song}`);
        if (songElement) {
            songElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Add highlight effect
            songElement.style.backgroundColor = 'rgba(255, 193, 7, 0.3)';
            songElement.style.border = '2px solid #ffc107';
            songElement.style.transition = 'all 0.3s ease';
            
            // Remove highlight after 3 seconds
            setTimeout(() => {
                songElement.style.backgroundColor = '';
                songElement.style.border = '';
            }, 3000);
        }
    }, 200);
}

function activateGameTabAndGoToSong(game_tab, goToSongCallback) {
    try {
        if (typeof bootstrap !== 'undefined' && bootstrap.Tab) {
            const tabTrigger = new bootstrap.Tab(game_tab);
            tabTrigger.show();
            console.log("Activated game tab using Bootstrap");
            
            // Wait for tab content to be shown, then scroll to song
            setTimeout(goToSongCallback, 300);
        } else {
            // Fallback: manually trigger the tab
            game_tab.click();
            console.log("Activated game tab using click");
            
            // Wait for tab content to be shown, then scroll to song
            setTimeout(goToSongCallback, 300);
        }
    } catch (error) {
        console.error("Error activating tab:", error);
        // Last resort: try clicking and still attempt to scroll
        try {
            game_tab.click();
            setTimeout(goToSongCallback, 500);
        } catch (clickError) {
            console.error("Even clicking failed:", clickError);
        }
    }
}
window.gotoCurrentGame = gotoCurrentGame;