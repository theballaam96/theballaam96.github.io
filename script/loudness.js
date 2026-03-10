/*
    File sourced from youlean.org
    You made a bad website update which includes horribly slowing down the read rate, so we can no longer trust that your amazing tool is going to stay great forever.
    We rely on the ability to tell the loudness of a song so much, and with such accuracy that we need to make a copy of this code.
    Also, why on earth did you originally obfuscate this to a stupid degree?
*/

var _____WB$wombat$assign$function_____ = function(name) {
    return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name];
};
if (!self.__WB_pmw) {
    self.__WB_pmw = function(obj) {
        this.__WB_source = obj;
        return this;
    }
} {
    let window = _____WB$wombat$assign$function_____("window");
    let document = _____WB$wombat$assign$function_____("document");
    audioContext = null;
    MAIN_HEIGHT = 450;
    nOfSelectedFiles = 0;
    fileAnalyzeIndex = 1;

    function audioFromFile() {
        if (window.File && window.FileReader) {
            try {
                window.AudioContext = window.AudioContext || window.webkitAudioContext;
                createAudioMeter(audioContext = new AudioContext, true);
                bufferSource = audioContext.createBufferSource();
            } catch (e) {
                return void alert("Your browser doesn't support Web Audio API");
            }
        } else alert("The File APIs are not fully supported in this browser.");
    }

    function handleFiles(e) {
        if (e.length === 0) {
            return;
        }
        nOfSelectedFiles = e.length, fileAnalyzeIndex = 1, fileProgress.length = 0;
        var t = false;
        a = "";
        for (x = 0; x < e.length; x++) {
            const valid_types = [
                "audio/wav",
                "audio/mp3",
                "audio/mpeg",
                "audio/mp4",
                "audio/aac",
                "audio/aacp",
                "audio/ogg",
                "audio/webm",
                "audio/flac",
                "audio/x-wav",
                "audio/x-pn-wav",
                "audio/vnd.wave",
            ];
            if (valid_types.includes(e[x].type)) {
                analyzeFile(e[x]);
                setSpinnerState(true);
            } else {
                a += e[x].name + "\n";
                nOfSelectedFiles--;
                t = true;
            }
        }
        if (t) {
            alert("File extensions not supported: \n\n" + a);
        }
    }

    function printLoudnessFromFile(e) {
        var t = Number(values.momentaryLoudnessMax).toFixed(2),
            a = Number(values.shortTermLoudnessMax).toFixed(2),
            x = Number(values.integratedLoudness).toFixed(2);
        document.getElementById("results_table").removeAttribute("hidden");
        document.getElementById("results-file").innerText = e.name;
        document.getElementById("results-mommax").innerText = `${t} LUFS`;
        document.getElementById("results-stmax").innerText = `${a} LUFS`;
        document.getElementById("results-integrated").innerText = `${x} LUFS`;
        fileAnalyzeIndex++;
        drawProgressBar();
    }

    function analyzeFile(e) {
        var t = new FileReader;
        t.readAsArrayBuffer(e), t.onload = function(t) {
            decode(t.target.result, e)
        }, t.onerror = function(e) {
            alert("Reader error")
        }, t = null
    }

    function decode(e, t) {
        try {
            audioContext.decodeAudioData(e, function(e) {
                ResetAll();
                volumeAudioProcess(e);
                fileProgress.push(0);
                fileProgress[fileProgress.length - 1] = 1;
                printLoudnessFromFile(t);
            }, function() {
                fileProgress.push(0);
                fileProgress[fileProgress.length - 1] = 1;
                alert("Error decoding: " + t.name);
            })
        } catch (e) {
            alert("Decoding error: " + e.message)
        }
    }

    var readFromBuffer;
    addEvent = function(e, t, a) {
        if (null != e && typeof e != "undefined") {
            if (e.addEventListener) {
                e.addEventListener(t, a, false);
            } else if (e.attachEvent) {
                e.attachEvent(`on${t}`, a);
                e[`on${t}`] = a;
            }
        }
    };

    function setSpinnerState(loading_state) {
        if (loading_state) {
            document.getElementById("loading-spinner").removeAttribute("hidden");
            document.getElementById("default-loader").setAttribute("hidden", "hidden");
            document.getElementById("audio-from-file").setAttribute("disabled", "disabled");
        } else {
            document.getElementById("loading-spinner").setAttribute("hidden", "hidden");
            document.getElementById("default-loader").removeAttribute("hidden");
            document.getElementById("audio-from-file").removeAttribute("disabled");
        }
    }

    function drawProgressBar() {
        for (var e = 0, t = 0; t < fileProgress.length; t++) e += fileProgress[t];
        if (nOfSelectedFiles > 0) {
            var a = e / nOfSelectedFiles * 100;
            setSpinnerState(Math.round(a) !== 100);
        } else alert("No valid files were selected!")
    }

    var envelopeObject, averageVolumeObject, loudnessObject, integratedObject, maxVolumeObject, maxMomentaryObject, maxShortObject, RefreshRate, fileProgress, MIN_VALUE = 1e-7,
        RefreshCount = 0;
    let values = {
        momentaryLoudness: -200,
        shortTermLoudness: -200,
        integratedLoudness: -200,
        volumeMax: -200,
        momentaryLoudnessMax: -200,
        shortTermLoudnessMax: -200,
        volumeAveraged: -200,
    };
    class Delay {
        constructor() {
            this.buffer = new Array;
            this.n = 0;
            this.prevDelaySize = 0;
        }
        resize_array(e, t) {
            while (e > this.buffer.length) {
                this.buffer.push(t);
            }
            this.buffer.length = e;
        }
        delay_in_samples(e, t) {
            if (this.prevDelaySize != t) {
                this.resize_array(t, 0);
                this.prevDelaySize = t;
                for (var a = 0; a < t; a++) {
                    this.buffer[a] = 0;
                }
            }
            this.buffer[this.n] = e;
            this.n++;
            if (this.n >= t) {
                this.n = 0;
            }
            return this.buffer[this.n];
        }
        reset() {
            for (var e = 0; e < this.buffer.length; e++) {
                this.buffer[e] = 0;
            }
        }
    }
    class MovingAverage {
        constructor() {
            this.delayObject = new Delay;
            this.out = 0;
            this.samplesize = 0;
        }
        average(e) {
            var t = this.delayObject.delay_in_samples(e, this.samplesize);
            this.out += (e - t);
            return this.out / this.samplesize;
        }
        setup_moving_average(e, t) {
            this.samplesize = e * t * .001;
            this.reset();
        }
        reset() {
            this.delayObject.reset();
            this.out = 0;
        }
    }
    class KWeightFilter {
        constructor() {
            this.biquad_one_coeffs_48kHz = {
                fs: 48e3,
                a1: -1.69065929318241,
                a2: .73248077421585,
                b0: 1.53512485958697,
                b1: -2.69169618940638,
                b2: 1.19839281085285,
            };
            this.biquad_two_coeffs_48kHz = {
                fs: 48e3,
                a1: -1.99004745483398,
                a2: .99007225036621,
                b0: 1,
                b1: -2,
                b2: 1,
            };
            this.biquad_one_coeffs = {
                fs: 0,
                a1: 0,
                a2: 0,
                b0: 0,
                b1: 0,
                b2: 0,
            };
            this.biquad_two_coeffs = {
                fs: 0,
                a1: 0,
                a2: 0,
                b0: 0,
                b1: 0,
                b2: 0,
            };
            this.in1 = 0;
            this.in2 = 0;
            this.out1 = 0;
            this.out2 = 0;
            this.out = 0;
            this._in1 = 0;
            this._in2 = 0;
            this._out1 = 0;
            this._out2 = 0;
            this._out = 0;
        }
        biquad_get_ps(e, t) {
            var a = e.a1 - 2;
            let x = e.a1;
            let s = -e.a1 - 2;
            let n = e.a2 - 1;
            let i = e.a2 + 1;
            let r = 1 - e.a2;
            let o = i * a - x * n;
            let l = (i * s - x * r) / o;
            let u = (a * r - n * s) / o;
            let d = 1 + u + l;
            t.k = Math.sqrt(l);
            t.q = t.k / u;
            t.vb = .5 * d * (e.b0 - e.b2) / u;
            t.vl = .25 * d * (e.b0 + e.b1 + e.b2) / l;
            t.vh = .25 * d * (e.b0 - e.b1 + e.b2);
        }
        biquad_requantize(e, t) {
            if (e.fs == t.fs) {
                t.a1 = e.a1;
                t.a2 = e.a2;
                t.b0 = e.b0;
                t.b1 = e.b1;
                t.b2 = e.b2;
            } else {
                var a, x, s, n, i = {};
                i.k = 0;
                i.q = 0;
                i.vb = 0;
                i.vl = 0;
                i.vh = 0;
                this.biquad_get_ps(e, i);
                x = (a = Math.tan(e.fs / t.fs * Math.atan(i.k))) * a;
                n = 1 + (s = a / i.q) + x;
                t.a1 = 2 * (x - 1) / n;
                t.a2 = (1 - s + x) / n;
                t.b0 = (i.vh + i.vb * s + i.vl * x) / n;
                t.b1 = 2 * (i.vl * x - i.vh) / n;
                t.b2 = (i.vh - i.vb * s + i.vl * x) / n;
            }
        }
        biquad_one(e, t) {
            const b0 = t.b0, b1 = t.b1, b2 = t.b2;
            const a1 = t.a1, a2 = t.a2;

            const in1 = this.in1, in2 = this.in2;
            const out1 = this.out1, out2 = this.out2;

            const out = e * b0 + in1 * b1 + in2 * b2 - out1 * a1 - out2 * a2;

            this.out2 = out1;
            this.out1 = out;
            this.in2 = in1;
            this.in1 = e;

            return out;
        }
        biquad_two(e, t) {
            const b0 = t.b0, b1 = t.b1, b2 = t.b2;
            const a1 = t.a1, a2 = t.a2;

            const in1 = this._in1, in2 = this._in2;
            const out1 = this._out1, out2 = this._out2;

            const out = e * b0 + in1 * b1 + in2 * b2 - out1 * a1 - out2 * a2;

            this._out2 = out1;
            this._out1 = out;
            this._in2 = in1;
            this._in1 = e;

            return out;
        }
        perform_kweighting(e) {
            e = this.biquad_one(e, this.biquad_one_coeffs);
            return this.biquad_two(e, this.biquad_two_coeffs);
        }
        setup_kweight_filter(e) {
            this.biquad_one_coeffs.fs = e;
            this.biquad_two_coeffs.fs = e;
            this.biquad_requantize(this.biquad_one_coeffs_48kHz, this.biquad_one_coeffs);
            this.biquad_requantize(this.biquad_two_coeffs_48kHz, this.biquad_two_coeffs);
        }
        reset() {
            this.in1 = 0;
            this.in2 = 0;
            this.out1 = 0;
            this.out2 = 0;
            this.out = 0;
            this._in1 = 0;
            this._in2 = 0;
            this._out1 = 0;
            this._out2 = 0;
            this._out = 0;
        }
    }
    class Loudness {
        constructor(max_channels) {
            this.maxChannels = max_channels;
            this.momentary = 1e-10;
            this.short = 1e-10;
            this.kWeight = new Array;
            this.averageMomentary = new MovingAverage;
            this.averageShortTerm = new MovingAverage;
            for (var t = 0; t < max_channels; t++) {
                this.kWeight.push(new KWeightFilter);
            }
            this.channelWeights = [
                [1, 0, 0, 0, 0, 0],
                [1, 1, 0, 0, 0, 0],
                [1, 1, 1.4125375446227544, 1.4125375446227544, 1, 0],
                [1, 1, 1, 0, 1.4125375446227544, 1.4125375446227544],
                [1, 1, 1, 1.4125375446227544, 1.4125375446227544, 0],
            ];
        }
        calculate(e, t, a) {
            var x = 0;
            let s = 0;
            if (a < 6) {
                s = a - 1;
            } else {
                s = 3;
            }
            for (var n = 0; n < a; n++) {
                x += Math.pow(this.kWeight[n].perform_kweighting(e[n][t]) * this.channelWeights[s][n], 2);
            }
            this.momentary = .8529037030705663 * this.averageMomentary.average(x);
            this.short = .8529037030705663 * this.averageShortTerm.average(x);
        }
        get_momentary() {
            return this.momentary
        }
        get_short_term() {
            return this.short
        }
        set_samplerate(e) {
            this.averageMomentary.setup_moving_average(400, e), this.averageShortTerm.setup_moving_average(3e3, e);
            for (var t = 0; t < this.maxChannels; t++) this.kWeight[t].setup_kweight_filter(e)
        }
        reset() {
            for (var e = 0; e < this.maxChannels; e++) this.kWeight[e].reset();
            this.averageMomentary.reset(), this.averageShortTerm.reset()
        }
    }
    class Integrated {
        constructor() {
            this.buffer = new Array;
            this.integratedFirstThreshSum = 0;
            this.integratedFirstThreshCounter = 0;
        }
        resize_array(e, t) {
            for (; e > this.buffer.length;) this.buffer.push(t);
            this.buffer.length = e;
        }
        get_relative_gate(e) {
            this.integratedFirstThreshSum += e;
            this.integratedFirstThreshCounter++;
            return this.integratedFirstThreshSum / this.integratedFirstThreshCounter * .1
        }
        get_integrated(e) {
            this.buffer.push(e);
            var t = this.get_relative_gate(e);
            return volumeToLUFS(this.get_average_above_relative_gate(t))
        }
        get_average_above_relative_gate(e) {
            for (var t = 0, a = 0, x = 0; x < this.buffer.length; x++) {
                if (this.buffer[x] > e) {
                    t += this.buffer[x];
                    a++;
                }
            }
            if (a > 0) {
                return t / a;
            }
            return 0;
        }
        reset() {
            for (var e = 0; e < this.buffer.length; e++) {
                this.buffer[e] = 0;
            }
            this.resize_array(0, 0);
            this.integratedFirstThreshSum = 0;
            this.integratedFirstThreshCounter = 0;
        }
    }
    class envelope_follower {
        constructor() {
            this.out = 0;
            this.attack = 0;
            this.release = 0;
            this.lastAttack = 0;
            this.lastRelease = 0;
            this.lastSamplerate = 0;
        }
        coeffCalc(e, t) {
            if (e < MIN_VALUE) {
                return 0;
            }
            return Math.exp(-1 / (t * e * .001));
        }
        envelope(e, t, a, x) {
            e = Math.abs(e);
            if (a !== this.lastAttack || x !== this.lastRelease || t !== this.lastSamplerate) {

                this.attack = this.coeffCalc(a, t);
                this.release = this.coeffCalc(x, t);

                this.lastAttack = a;
                this.lastRelease = x;
                this.lastSamplerate = t;
            }

            if (e > this.out) {
                this.out = this.attack * (this.out - e) + e;
            } else {
                this.out = this.release * (this.out - e) + e;
            }
            return this.out;
        }
        reset() {
            this.out = 0
        }
    }
    class AverageContinuous {
        constructor() {
            this.count = 0;
            this.sum = 0;
        }
        average(e) {
            this.sum += e;
            this.count++;
            return this.sum / this.count;
        }
        reset() {
            this.count = 0;
            this.sum = 0;
        }
    }
    class HoldMax {
        constructor() {
            this.out = -999999;
        }
        hold(e) {
            this.out = Math.max(this.out, e);
            return this.out;
        }
        reset() {
            this.out = -999999;
        }
    }

    function createAudioMeter(e, t) {
        var a;
        readFromBuffer = t;
        envelopeObject = new envelope_follower;
        loudnessObject = new Loudness(6);
        averageVolumeObject = new AverageContinuous;
        integratedObject = new Integrated;
        maxVolumeObject = new HoldMax;
        maxMomentaryObject = new HoldMax;
        maxShortObject = new HoldMax;
        fileProgress = new Array;
        if (!readFromBuffer) {
            (a = e.createScriptProcessor(256)).onaudioprocess = volumeAudioProcess;
            loudnessObject.set_samplerate(e.sampleRate);
        }
        RefreshRate = msToSamples(16.666667, e.sampleRate);
        values.volume = -200;
        values.momentaryLoudness = -200;
        values.shortTermLoudness = -200;
        values.integratedLoudness = -200;
        values.volumeMax = -200;
        values.momentaryLoudnessMax = -200;
        values.shortTermLoudnessMax = -200;
        values.volumeAveraged = -200;
        values.integratedLoudness = -200;
        if (!readFromBuffer) {
            a.connect(e.destination);
            a.shutdown = function() {
                this.disconnect();
                this.onaudioprocess = null;
            }
            return a;
        }
    }

    function volumeToDb(e) {
        return e > 1e-7 ? 20 * Math.log10(e) : -200
    }

    function volumeToLUFS(e) {
        return e > 1e-10 ? 10 * Math.log10(e) : -100
    }

    function msToSamples(e, t) {
        return Math.round(.001 * t * e)
    }

    function ResetAll() {
        envelopeObject.reset();
        averageVolumeObject.reset();
        loudnessObject.reset();
        integratedObject.reset();
        maxVolumeObject.reset();
        maxMomentaryObject.reset();
        maxShortObject.reset();
        values.volume = -200;
        values.momentaryLoudness = -200;
        values.shortTermLoudness = -200;
        values.integratedLoudness = -200;
        values.volumeMax = -200;
        values.momentaryLoudnessMax = -200;
        values.shortTermLoudnessMax = -200;
        values.volumeAveraged = -200;
        values.integratedLoudness = -200;
        RefreshCount = 0;
    }

    function volumeAudioProcess(e) {
        var t;
        var a, x = new Array;
        if (readFromBuffer) {
            t = e.numberOfChannels;
            a = e.sampleRate;
            loudnessObject.set_samplerate(a);
        } else {
            t = e.inputBuffer.numberOfChannels;
            a = e.inputBuffer.sampleRate;
        }
        for (var s = 0; s < t; s++) {
            if (readFromBuffer) {
                x.push(e.getChannelData(s));
            } else {
                x.push(e.inputBuffer.getChannelData(s));
            }
        }
        var n = x[0].length;
        for (s = 0; s < n; s++) {
            for (var i = 0, r = 0; r < t; r++) {
                i = Math.max(i, Math.abs(x[r][s]));
            }
            var o, l, u = envelopeObject.envelope(i, a, 0, 400);
            loudnessObject.calculate(x, s, t, a);
            o = loudnessObject.get_momentary();
            l = loudnessObject.get_short_term();
            if (RefreshCount % RefreshRate == 0) {
                values.volume = volumeToDb(u);
                values.momentaryLoudness = volumeToLUFS(o);
                values.shortTermLoudness = volumeToLUFS(l);
                values.volumeMax = maxVolumeObject.hold(values.volume);
                values.momentaryLoudnessMax = maxMomentaryObject.hold(values.momentaryLoudness);
                values.shortTermLoudnessMax = maxShortObject.hold(values.shortTermLoudness);
                if (values.momentaryLoudness > -70) {
                    values.integratedLoudness = integratedObject.get_integrated(o);
                }
                values.volumeAveraged = averageVolumeObject.average(values.volume);
            }
            RefreshCount++;
        }
    }
}