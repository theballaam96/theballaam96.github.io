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
    let self = _____WB$wombat$assign$function_____("self");
    let document = _____WB$wombat$assign$function_____("document");
    let location = _____WB$wombat$assign$function_____("location");
    let top = _____WB$wombat$assign$function_____("top");
    let parent = _____WB$wombat$assign$function_____("parent");
    let frames = _____WB$wombat$assign$function_____("frames");
    let opens = _____WB$wombat$assign$function_____("opens");
    var a = [];
    var WIDTH, HEIGHT, readoutElement, averageElement, holdMaxElement, textElement, loadingElement, loadingAnimationElement, averageLabelElement, holdMaxLabelElement, b = function(e, t) {
            return a[e -= 0]
        },
        audioContext = null,
        mediaStreamSource = null,
        canvasContext = null,
        rafID = null,
        MAIN_HEIGHT = 450,
        GuiScaling = 1,
        SettingsPanelOpen = !1,
        lineWidth = 1,
        meterRange = 70,
        meterOffset = 0,
        usingSPLScale = !0,
        usingStandard = "momentary",
        nOfSelectedFiles = 0,
        fileAnalyzeIndex = 1,
        drawScaleIsDirty = !0;

    function audioFromMic() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext;
        try {
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            var e = {};
            e.googEchoCancellation = "false";
            e.googAutoGainControl = "false";
            e.googNoiseSuppression = "false";
            e.googHighpassFilter = "false";
            var t = {};
            t.mandatory = e;
            t.optional = [];
            var a = {};
            a.audio = t;
            navigator.getUserMedia(a, gotStream, didntGetStream);
        } catch (e) {
            return void alert("getUserMedia threw exception :" + e)
        }
        document.getElementsByClassName("use-files")[0].style.visibility = "hidden";
        document.getElementsByClassName("use-files")[0].style.transition = "all 0.0s";
        document.getElementsByClassName("readout-group")[0].style.visibility = "visible";
        document.getElementById("meter").style.visibility = "visible";
        document.getElementById("settings_button").style.visibility = "visible";
        document.getElementById("readout").style.visibility = "visible";
        document.getElementById("beta_mic").style.visibility = "visible";
        drawLoop();
    }

    function didntGetStream() {
        alert("Could not get permission to use microphone.")
    }

    function gotStream(e) {
        mediaStreamSource = audioContext.createMediaStreamSource(e);
        var t = createAudioMeter(audioContext, !1);
        mediaStreamSource.connect(t), drawLoop()
    }

    function audioFromFile() {
        if (window.File && window.FileReader) {
            try {
                window.AudioContext = window.AudioContext || window.webkitAudioContext;
                createAudioMeter(audioContext = new AudioContext, !0);
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
        for (var t = !1, a = "", x = 0; x < e.length; x++) {
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
                t = !0
            }
        }
        t && alert("File extensions not supported: \n\n" + a)
    }

    function printLoudnessFromFile(e) {
        var t = Number(values["momentaryLoudnessMax"])["toFixed"](2),
            a = Number(values["shortTermLoudnessMax"])["toFixed"](2),
            x = Number(values["integratedLoudness"])["toFixed"](2);
        nOfSelectedFiles > 1 && (textElement["value"] = textElement["value"] + fileAnalyzeIndex + ". ");
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

    function settingsPanel() {
        !1 === SettingsPanelOpen ? (SettingsPanelOpen = !0, document.getElementsByClassName("settings-group")[0].style.visibility = "visible", document.getElementsByClassName("control__indicator")[0].style.transition = "all 0.5s", document.getElementsByClassName("control__indicator")[1].style.transition = "all 0.5s", document.getElementsByClassName("control__indicator")[2].style.transition = "all 0.5s", document.getElementsByClassName("control__indicator")[3].style.transition = "all 0.5s", document.getElementsByClassName("control__indicator")[4].style.transition = "all 0.5s") : (SettingsPanelOpen = !1, document.getElementsByClassName("settings-group")[0].style.visibility = "hidden", document.getElementsByClassName("control__indicator")[0].style.transition = "all 0.0s", document.getElementsByClassName("control__indicator")[1].style.transition = "all 0.0s", document.getElementsByClassName("control__indicator")[2].style.transition = "all 0.0s", document.getElementsByClassName("control__indicator")[3].style.transition = "all 0.0s", document.getElementsByClassName("control__indicator")[4].style.transition = "all 0.0s")
    }

    function setStandard(e) {
        (usingStandard = e) === "volume" ? averageLabelElement["innerText"] = "AVG" : averageLabelElement["innerText"] = "INT", ResetAll()
    }

    function useSPLScale(e) {
        usingSPLScale = e, drawScaleIsDirty = !0
    }
    window.onload = function() {
        canvasContext = document.getElementById("meter").getContext("2d");
        readoutElement = document.getElementById("readout");
        averageElement = document.getElementById("average");
        holdMaxElement = document.getElementById("hold-max");
        averageLabelElement = document.getElementById("label-average");
        holdMaxLabelElement = document.getElementById("label-hold-max");
        textElement = document.getElementById("text-info");
        WIDTH = canvasContext.canvas.width;
        HEIGHT = canvasContext["canvas"]["height"];
        GuiScaling = window.devicePixelRatio;
        addEvent(window, "resize", responsiveCanvas);
        responsiveCanvas();
    };
    var readFromBuffer, addEvent = function(e, t, a) {
        null != e && typeof e != "undefined" && (e["addEventListener"] ? e["addEventListener"](t, a, !1) : e["attachEvent"] ? e["attachEvent"]("on" + t, a) : e["on" + t] = a)
    };

    function responsiveCanvas() {
        drawScaleIsDirty = !0;
        document.getElementById("meter").getBoundingClientRect();
        canvasContext.canvas.width = WIDTH * GuiScaling;
        canvasContext.canvas.height = HEIGHT * GuiScaling;
        canvasContext.canvas.style.width = `${WIDTH}px`;
        canvasContext.canvas.style.height = `${HEIGHT}px`;
        canvasContext.scale(GuiScaling, GuiScaling);
    }

    function mouseDown(e) {}

    function drawMeterLines(e, t, a, x, s, n, i) {
        canvasContext.lineWidth = lineWidth;
        var r = (i - s - lineWidth) / meterRange;
        if (!(r < .01))
            for (var o = 0;;) {
                var l = Math.round(-o + meterOffset),
                    u = s + o * r;
                if (u + lineWidth > i) break;
                e >= l && t <= l && l % a == 0 ? (canvasContext["beginPath"](), canvasContext["moveTo"](x, u), canvasContext.lineTo(n, u), canvasContext["stroke"](), o += a) : o++
            }
    }

    function drawMeterText(e, t, a, x, s, n, i, r) {
        canvasContext.textAlign = "right";
        var o = x / 2 * .7,
            l = (r - n - lineWidth) / meterRange;
        if (!(l < .01))
            for (var u = 0;;) {
                var d = Math.round(-u + meterOffset),
                    h = n + u * l;
                if (h + 1 > r) break;
                e >= d && t <= d && d % a == 0 ? (usingSPLScale && (d += 70), canvasContext.fillText(Number(d).toFixed(0), i, h + o), u += a) : u++
            }
    }

    function drawMeter(e, t, a, x, s) {
        var n = (e - meterOffset) * (1 / meterRange * (s - a) * -1);
        a + n <= s && canvasContext.fillRect(t, a + n, x - t, s - a - n)
    }

    function updateReadout(e, t, a) {
        usingSPLScale && (splCorrection = 70, t += 70), usingSPLScale && t < 0 || !usingSPLScale && t < -70 ? e["innerText"] = "-" : (t = Number(t)["toFixed"](1), a ? usingStandard === "volume" ? e["innerText"] = t + " dB" : e["innerText"] = "momentary" === usingStandard ? t + " LUFS M" : t + " LUFS S" : e["innerText"] = t)
    }

    function drawMainMeter(e, t, a, x, s, n, i) {
        canvasContext.fillStyle = "white";
        canvasContext.strokeStyle = "white";
        canvasContext.font = `${t}px Lato`;
        var r = x + 2 * t;
        drawScaleIsDirty && drawMeterText(0, -65, 10, t, x, s, r, i);
        var o = r + 2 * a;
        drawScaleIsDirty && drawMeterLines(0, -65, 5, r + a, s, o, i), canvasContext.fillStyle = "turquoise";
        var l = n - 3 * a;
        drawScaleIsDirty || canvasContext["clearRect"](o + a, s, l - (o + a), i - s), drawMeter(e, o + a, s, l, i), canvasContext.fillStyle = "white", drawScaleIsDirty && (drawMeterLines(0, -65, 5, l + a, s, n - a, i), drawScaleIsDirty = !1), canvasContext["fillStyle"] = "white", canvasContext["beginPath"](), canvasContext["moveTo"](o + a, i), canvasContext["lineTo"](l, i), canvasContext["stroke"]()
    }

    function drawITUMeter() {
        var e = HEIGHT - 20;
        "volume" === usingStandard ? drawMainMeter(values["volume"], 16, 10, 0, 20, WIDTH, e) : usingStandard === "momentary" ? drawMainMeter(values["momentaryLoudness"], 16, 10, 0, 20, WIDTH, e) : drawMainMeter(values["shortTermLoudness"], 16, 10, 0, 20, WIDTH, e)  // 0xb2
    }

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

    function drawLoop() {
        drawScaleIsDirty && canvasContext["clearRect"](0, 0, WIDTH, HEIGHT), drawITUMeter(), usingStandard === "volume" ? (updateReadout(readoutElement, values["volume"], !0), updateReadout(holdMaxElement, values["volumeMax"], !1), updateReadout(averageElement, values["volumeAveraged"], !1)) : usingStandard === "momentary" ? (updateReadout(readoutElement, values["momentaryLoudness"], !0), updateReadout(holdMaxElement, values["momentaryLoudnessMax"], !1), updateReadout(averageElement, values.integratedLoudness, !1)) : usingStandard === "short" && (updateReadout(readoutElement, values["shortTermLoudness"], !0), updateReadout(holdMaxElement, values["shortTermLoudnessMax"], !1), updateReadout(averageElement, values.integratedLoudness, !1)), rafID = window["requestAnimationFrame"](drawLoop)
    }
    var envelopeObject, averageVolumeObject, loudnessObject, integratedObject, maxVolumeObject, maxMomentaryObject, maxShortObject, RefreshRate, fileProgress, MIN_VALUE = 1e-7,
        RefreshCount = 0,
        values = {};
    values["momentaryLoudness"] = -200, values.shortTermLoudness = -200, values["integratedLoudness"] = -200, values["volumeMax"] = -200, values.momentaryLoudnessMax = -200, values["shortTermLoudnessMax"] = -200, values["volumeAveraged"] = -200;
    class Delay {
        constructor() {
            this.buffer = new Array, this.n = 0, this["prevDelaySize"] = 0
        }
        resize_array(e, t) {
            for (; e > this.buffer.length;) this["buffer"].push(t);
            this.buffer.length = e
        } ["delay_in_samples"](e, t) {
            if (this["prevDelaySize"] != t) {
                this["resize_array"](t, 0), this["prevDelaySize"] = t;
                for (var a = 0; a < t; a++) this.buffer[a] = 0
            }
            return this["buffer"][this.n] = e, this.n++, this.n >= t && (this.n = 0), this["buffer"][this.n]
        }
        reset() {
            for (var e = 0; e < this.buffer.length; e++) this["buffer"][e] = 0
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
            this.out = this.out + e - t;
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
            var a = e.a1 - 2,
                x = e.a1,
                s = -e.a1 - 2,
                n = e.a2 - 1,
                i = e.a2 + 1,
                r = 1 - e.a2,
                o = i * a - x * n,
                l = (i * s - x * r) / o,
                u = (a * r - n * s) / o,
                d = 1 + u + l;
            t.k = Math.sqrt(l), t.q = t.k / u, t.vb = .5 * d * (e.b0 - e.b2) / u, t.vl = .25 * d * (e.b0 + e.b1 + e.b2) / l, t.vh = .25 * d * (e.b0 - e.b1 + e.b2)
        }
        biquad_requantize(e, t) {
            if (e.fs == t.fs) t.a1 = e.a1, t.a2 = e.a2, t.b0 = e.b0, t.b1 = e.b1, t.b2 = e.b2;
            else {
                var a, x, s, n, i = {};
                i.k = 0, i.q = 0, i.vb = 0, i.vl = 0, i.vh = 0, this["biquad_get_ps"](e, i), x = (a = Math["tan"](e.fs / t.fs * Math["atan"](i.k))) * a, n = 1 + (s = a / i.q) + x, t.a1 = 2 * (x - 1) / n, t.a2 = (1 - s + x) / n, t.b0 = (i.vh + i.vb * s + i.vl * x) / n, t.b1 = 2 * (i.vl * x - i.vh) / n, t.b2 = (i.vh - i.vb * s + i.vl * x) / n
            }
        }
        biquad_one(e, t) {
            return this.out = e * t.b0 + this["in1"] * t.b1 + this.in2 * t.b2 - this["out1"] * t.a1 - this["out2"] * t.a2, this["out2"] = this["out1"], this["out1"] = this["out"], this["in2"] = this["in1"], this["in1"] = e, this["out"]
        }
        biquad_two(e, t) {
            return this["_out"] = e * t.b0 + this._in1 * t.b1 + this["_in2"] * t.b2 - this["_out1"] * t.a1 - this._out2 * t.a2, this["_out2"] = this["_out1"], this["_out1"] = this["_out"], this._in2 = this["_in1"], this["_in1"] = e, this["_out"]
        }
        perform_kweighting(e) {
            return e = this["biquad_one"](e, this["biquad_one_coeffs"]), this["biquad_two"](e, this["biquad_two_coeffs"])
        } ["setup_kweight_filter"](e) {
            this["biquad_one_coeffs"].fs = e, this["biquad_two_coeffs"].fs = e, this.biquad_requantize(this.biquad_one_coeffs_48kHz, this.biquad_one_coeffs), this["biquad_requantize"](this["biquad_two_coeffs_48kHz"], this["biquad_two_coeffs"])
        } ["reset"]() {
            this["in1"] = 0, this["in2"] = 0, this["out1"] = 0, this["out2"] = 0, this["out"] = 0, this["_in1"] = 0, this["_in2"] = 0, this["_out1"] = 0, this["_out2"] = 0, this._out = 0
        }
    }
    class Loudness {
        constructor(e) {
            this["maxChannels"] = e, this["momentary"] = 1e-10, this["short"] = 1e-10, this["kWeight"] = new Array, this["averageMomentary"] = new MovingAverage, this["averageShortTerm"] = new MovingAverage;
            for (var t = 0; t < e; t++) this["kWeight"].push(new KWeightFilter);
            for (this["channelWeights"] = new Array(5), t = 0; t < this.channelWeights.length; t++) this["channelWeights"][t] = new Array(6);
            this["channelWeights"][0][0] = 1, this["channelWeights"][0][1] = 0, this["channelWeights"][0][2] = 0, this["channelWeights"][0][3] = 0, this["channelWeights"][0][4] = 0, this.channelWeights[0][5] = 0, this["channelWeights"][1][0] = 1, this["channelWeights"][1][1] = 1, this["channelWeights"][1][2] = 0, this["channelWeights"][1][3] = 0, this["channelWeights"][1][4] = 0, this["channelWeights"][1][5] = 0, this["channelWeights"][2][0] = 1, this["channelWeights"][2][1] = 1, this.channelWeights[2][2] = 1.4125375446227544, this["channelWeights"][2][3] = 1.4125375446227544, this["channelWeights"][2][4] = 1, this["channelWeights"][2][5] = 0, this["channelWeights"][3][0] = 1, this["channelWeights"][3][1] = 1, this["channelWeights"][3][2] = 1, this["channelWeights"][3][3] = 0, this["channelWeights"][3][4] = 1.4125375446227544, this["channelWeights"][3][5] = 1.4125375446227544, this["channelWeights"][4][0] = 1, this.channelWeights[4][1] = 1, this["channelWeights"][4][2] = 1, this["channelWeights"][4][3] = 1.4125375446227544, this.channelWeights[4][4] = 1.4125375446227544, this["channelWeights"][4][5] = 0
        }
        calculate(e, t, a) {
            var x = 0,
                s = 0;
            s = a < 6 ? a - 1 : 3;
            for (var n = 0; n < a; n++) x += Math.pow(this["kWeight"][n].perform_kweighting(e[n][t]) * this.channelWeights[s][n], 2);
            this["momentary"] = .8529037030705663 * this["averageMomentary"]["average"](x), this["short"] = .8529037030705663 * this["averageShortTerm"].average(x)
        } ["get_momentary"]() {
            return this.momentary
        } ["get_short_term"]() {
            return this["short"]
        } ["set_samplerate"](e) {
            this["averageMomentary"]["setup_moving_average"](400, e), this.averageShortTerm["setup_moving_average"](3e3, e);
            for (var t = 0; t < this["maxChannels"]; t++) this["kWeight"][t]["setup_kweight_filter"](e)
        } ["reset"]() {
            for (var e = 0; e < this["maxChannels"]; e++) this.kWeight[e]["reset"]();
            this["averageMomentary"]["reset"](), this["averageShortTerm"].reset()
        }
    }
    class Integrated {
        constructor() {
            this["buffer"] = new Array, this["integratedFirstThreshSum"] = 0, this.integratedFirstThreshCounter = 0
        }
        resize_array(e, t) {
            for (; e > this.buffer.length;) this["buffer"].push(t);
            this["buffer"].length = e
        } ["get_relative_gate"](e) {
            return this["integratedFirstThreshSum"] += e, this["integratedFirstThreshCounter"]++, this["integratedFirstThreshSum"] / this["integratedFirstThreshCounter"] * .1
        } ["get_integrated"](e) {
            this.buffer.push(e);
            var t = this["get_relative_gate"](e);
            return volumeToLUFS(this["get_average_above_relative_gate"](t))
        } ["get_average_above_relative_gate"](e) {
            for (var t = 0, a = 0, x = 0; x < this["buffer"].length; x++) this["buffer"][x] > e && (t += this.buffer[x], a++);
            return a > 0 ? t / a : 0
        } ["reset"]() {
            for (var e = 0; e < this["buffer"].length; e++) this["buffer"][e] = 0;
            this["resize_array"](0, 0), this["integratedFirstThreshSum"] = 0, this["integratedFirstThreshCounter"] = 0
        }
    }
    class envelope_follower {
        constructor() {
            this.out = 0, this["attack"] = 0, this["release"] = 0, this.lastAttack = 0, this["lastRelease"] = 0, this["lastSamplerate"] = 0
        } ["coeffCalc"](e, t) {
            return e < MIN_VALUE ? 0 : Math["exp"](-1 / (t * e * .001))
        } ["envelope"](e, t, a, x) {
            return e = Math.abs(e), a == this.lastAttack && x == this.lastRelease && this.lastSamplerate == t || (this["attack"] = this["coeffCalc"](a, t), this["release"] = this["coeffCalc"](x, t), this["lastAttack"] = a, this["lastRelease"] = x, this["lastSamplerate"] = t), e > this["out"] ? this["out"] = this["attack"] * (this.out - e) + e : this["out"] = this["release"] * (this["out"] - e) + e, this["out"]
        } ["reset"]() {
            this["out"] = 0
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
        if (readFromBuffer = t, envelopeObject = new envelope_follower, loudnessObject = new Loudness(6), averageVolumeObject = new AverageContinuous, integratedObject = new Integrated, maxVolumeObject = new HoldMax, maxMomentaryObject = new HoldMax, maxShortObject = new HoldMax, fileProgress = new Array, readFromBuffer || ((a = e["createScriptProcessor"](256))["onaudioprocess"] = volumeAudioProcess, loudnessObject["set_samplerate"](e["sampleRate"])), RefreshRate = msToSamples(16.666667, e.sampleRate), values["volume"] = -200, values["momentaryLoudness"] = -200, values["shortTermLoudness"] = -200, values["integratedLoudness"] = -200, values["volumeMax"] = -200, values["momentaryLoudnessMax"] = -200, values["shortTermLoudnessMax"] = -200, values["volumeAveraged"] = -200, values["integratedLoudness"] = -200, !readFromBuffer) return a["connect"](e["destination"]), a["shutdown"] = function() {
            this.disconnect();
            this.onaudioprocess = null;
        }, a
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

    function ResetHoldMax() {
        maxVolumeObject.reset();
        maxMomentaryObject.reset();
        maxShortObject.reset();
        values.volumeMax = -200;
        values.momentaryLoudnessMax = -200;
        values.shortTermLoudnessMax = -200;
    }

    function ResetAverage() {
        averageVolumeObject.reset();
        integratedObject.reset();
        values.volumeAveraged = -200;
        values.integratedLoudness = -200;
    }

    function volumeAudioProcess(e) {
        var t;
        a, x = new Array;
        readFromBuffer ? (t = e["numberOfChannels"], a = e["sampleRate"], loudnessObject["set_samplerate"](a)) : (t = e["inputBuffer"]["numberOfChannels"], a = e.inputBuffer["sampleRate"]);
        for (var s = 0; s < t; s++) readFromBuffer ? x.push(e["getChannelData"](s)) : x.push(e.inputBuffer["getChannelData"](s));
        var n = x[0].length;
        for (s = 0; s < n; s++) {
            for (var i = 0, r = 0; r < t; r++) i = Math["max"](i, Math["abs"](x[r][s]));
            var o, l, u = envelopeObject["envelope"](i, a, 0, 400);
            loudnessObject["calculate"](x, s, t, a), o = loudnessObject["get_momentary"](), l = loudnessObject.get_short_term(), RefreshCount % RefreshRate == 0 && (values["volume"] = volumeToDb(u), values["momentaryLoudness"] = volumeToLUFS(o), values["shortTermLoudness"] = volumeToLUFS(l), values["volumeMax"] = maxVolumeObject.hold(values["volume"]), values["momentaryLoudnessMax"] = maxMomentaryObject["hold"](values["momentaryLoudness"]), values["shortTermLoudnessMax"] = maxShortObject["hold"](values.shortTermLoudness), values.momentaryLoudness > -70 && (values["integratedLoudness"] = integratedObject["get_integrated"](o)), values.volumeAveraged = averageVolumeObject["average"](values["volume"])), RefreshCount++
        }
    }
}