/** @type {AudioContext | undefined} */
let ac;

let sfontBin;
let musicBin;
let synth;
let sfontId;
let musicLoaded = false;
let lastSFontIsDefault = false;
let playingStatus = 'Stopped';

function getFormInput(name) {
	return document.getElementById(name);
}

async function loadBinary(url) {
	const resp = await fetch(url);
	return await resp.arrayBuffer();
}

async function loadBinaryFromFile(input) {
	if (input.files.length === 0) {
		return null;
	}
	const file = input.files[0];
	return await new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result);
		reader.onerror = () => reject(new Error('Unable to read'));
		reader.readAsArrayBuffer(file);
	});
}

async function loadDefaultSFont() {
	if (sfontBin) {
		return sfontBin;
	}
	const buff = await loadBinary('ChoriumRevA.sf2');
	sfontBin = buff;
	return buff;
}

async function loadDefaultMusic() {
	if (musicBin) {
		return musicBin;
	}
	const buff = await loadBinary('Tinkle.mid');
	musicBin = buff;
	return buff;
}

function loadSFont() {
	return loadBinaryFromFile(getFormInput('soundfont-selector'))
			.then(
				// if soundfont is not selected, use default
				(bin) => bin || loadDefaultSFont()
			);
}

function loadMusic() {
	return loadBinaryFromFile(getFormInput('file-selector'))
			.then(
				// if SMF file is not selected, use default
				(bin) => bin || loadDefaultMusic()
			);
}

async function initializeSynthesizer(useDefaultSFont) {
	// Load Soundfont binary asynchronously
	const promiseSFont = loadSFont(useDefaultSFont);
	lastSFontIsDefault = useDefaultSFont;

	if (!ac) {
		ac = new AudioContext();
	}

	if (synth) {
		await synth.unloadSFontAsync(sfontId);
	} else {
		// Initialize AudioWorklet
		await ac.audioWorklet.addModule('script/libfluidsynth-2-3-0.min.js');
		await ac.audioWorklet.addModule('script/js-synthesizer.worklet.min.js');

		// Create the synthesizer instance for AudioWorkletNode
		synth = new JSSynth.AudioWorkletNodeSynthesizer();
		synth.init(ac.sampleRate);
		const node = synth.createAudioNode(ac);
		node.connect(ac.destination);
	}

	// Load binaries
	const sfontBin = await promiseSFont;

	// Load SoundFont data to the synthesizer
	sfontId = await synth.loadSFont(sfontBin);

	return synth;
}
setPlayingStatus("Stopped")

function setPlayingStatus(status) {
    const hook = document.getElementById("play-button")
    const class_data = [
        {
            "target_status": "Playing",
            "class_set": "playbtn-play",
            "text": "Stop",
            "svg": "pause",
			"html": "<i class=\"fa-solid fa-stop\"></i>",
        },
        {
            "target_status": "Preparing",
            "class_set": "playbtn-buffer",
            "text": "Buffering",
            "svg": "buffer",
			"html": "",
        },
        {
            "target_status": "_",
            "class_set": "playbtn-stop",
            "text": "Play",
            "svg": "play",
			"html": "<i class=\"fa-solid fa-play\"></i>",
        },
    ]
    class_data.forEach(item => {
        hook.classList.remove(item["class_set"])
        // document.getElementById(item["class_set"]).classList.add("hide")
    })
    let found_targ = false;
    class_data.forEach((item, index) => {
        if (!found_targ) {
            if ((item["target_status"] == status) || ((index + 1) == class_data.length)) {
                hook.classList.add(item["class_set"])
				hook.innerHTML = item["html"]
                // document.getElementById(item["class_set"]).classList.remove("hide")
                found_targ = true;
            }
        }
    })
    console.log(`Status: ${status}`)
	playingStatus = status;
}

SAFE_BUFFER = 20
playing_song = false
ENABLE_LOOP = true
player_position = 0
player_cap = 0
pressing_nav = false
nav_location = 0

function ticksToSeconds(position_t, cap_t, total_s) {
	const ratio = position_t / cap_t;
	const sec = ratio * total_s;
	const minutes = Math.floor(sec / 60)
	const seconds = Math.floor(sec - (60 * minutes))
	let sec_str = seconds.toString()
	if (seconds < 10) {
		sec_str = "0" + sec_str
	}
	return `${minutes}:${sec_str}`
}

function updatePlayerNav(position, update_navigator) {
	const total_seconds = Number(document.getElementById("player-navigator").getAttribute("t_s"))
	document.getElementById("player-position-display").innerText = `${ticksToSeconds(position, player_cap, total_seconds)}/${ticksToSeconds(player_cap, player_cap, total_seconds)}`
	if (update_navigator) {
		document.getElementById("player-navigator").value = player_position;
	}
}

function getLoopStatus() {
	loop = document.getElementById("loop-check").checked
	raw_loop_point = document.getElementById("loop-point").value
	if (raw_loop_point == "") {
		loop_point = 0
	} else {
		let numbers = []
		for (let i = 0; i < 10; i++) {
			numbers.push(i.toString())
		}
		const characters = raw_loop_point.split("").filter(item => !numbers.includes(item))
		if (characters.length == 0) {
			loop_point = Number(raw_loop_point)
		} else {
			loop_point = 0
		}
	}
	return {
		"loop": loop,
		"point": loop_point
	}
}

async function doPlay(progress) {
	setPlayingStatus('Preparing');

	const [synth, musicBin] = await Promise.all([
		// Initialize the synthesizer
		initializeSynthesizer(false),
		// Load SMF file binary
		loadMusic(false)
	]);

	// Load SMF file data to the synthesizer
	await synth.addSMFDataToPlayer(musicBin);

	// Play the loaded SMF data
	await synth.playPlayer();

	setPlayingStatus('Playing');
    if (progress != 0) {
        // Start track mid-song
        setTimeout(function(){
            console.log("Waited a second");
            synth.seekPlayer(progress);
        }, SAFE_BUFFER);
    }

	let navigator_update;
	navigator_update = setInterval(async () => {
		if (playing_song) {
			if (!pressing_nav) {
				player_position = await synth.retrievePlayerCurrentTick();
				player_cap = await synth.retrievePlayerTotalTicks();
				updatePlayerNav(player_position, true);
			}
		} else {
			clearInterval(navigator_update);
		}
	}, 1000);

	// Wait for finishing playing
	await synth.waitForPlayerStopped();

	// Wait for all voices stopped
	await synth.waitForVoicesStopped();

	// Reset synthesizer (release loaded SMF data)
	await synth.resetPlayer();
    
	setPlayingStatus('Stopped'); // TODO: Hook into looping
    
	loop_data = getLoopStatus();
	will_loop = ENABLE_LOOP && loop_data["loop"];
    if ((playing_song) && (will_loop)) {
        setTimeout(function(){
            console.log("Waited a second");
            doPlay(loop_data["point"]);
        }, SAFE_BUFFER);
    }
	if (!will_loop) {
		playing_song = false;
	}
}

function navigatorClick(pressing) {
	pressing_nav = pressing;
	if (pressing) {
		nav_location = document.getElementById("player-navigator").value
	} else {
		navigatorMove(true);
		synth.seekPlayer(nav_location)
	}
}

function navigatorMove(ignore_press) {
	if ((pressing_nav) || (ignore_press)) {
		nav_location = document.getElementById("player-navigator").value
		updatePlayerNav(nav_location, false)
	}
}

function playMusic() {
	if (playingStatus === 'Playing') {
        playing_song = false;
		synth.stopPlayer();
	} else if (playingStatus === 'Stopped') {
		doPlay(0);
        playing_song = true;
	}
}