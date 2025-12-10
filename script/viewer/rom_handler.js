window.pointer_offset = 0x101C50;
window.table_offset = 0;
window.geo_offset = 0;
window.actor_spawner_offset = 0;
window.fluid_data = [];
window.overlay_data = [];
window.actor_models = {};
window.char_data = [];
window.cutscene_models = [];
window.actor_sprites = {};
window.balloons = [];
window.has_box_void = false;
window.music_triggers = [];
window.distant_screen_texture = 0;
window.ambient_sfx_data = [];

function getFileBoundaries(dv, table_index, file_index) {
    table_index -= window.table_offset;
    const table_head = window.pointer_offset + dv.getUint32(window.pointer_offset + (table_index * 4), false);
    const file_start_read = dv.getUint32(table_head + (file_index * 4), false);
    const is_pointer = (file_start_read & 0x80000000) != 0;
    const file_start = window.pointer_offset + (file_start_read & 0x7FFFFFFF);
    const file_end = window.pointer_offset + (dv.getUint32(table_head + ((file_index + 1) * 4), false) & 0x7FFFFFFF);
    const file_size = file_end - file_start;
    let pointing_file_index = null;
    if (is_pointer) {
        pointing_file_index = dv.getUint32(file_start, false) >> 16;
    }
    return {
        start: file_start,
        end: file_end,
        size: file_size,
        is_pointer: is_pointer,
        pointing_file_index: pointing_file_index,
    }
}

function addFakeGzipFooter(buf, decompressedSize) {
    const newBuf = new Uint8Array(buf.length + 8);
    newBuf.set(buf, 0);

    // CRC32: 4 bytes, little-endian (just 0 here)
    newBuf[buf.length + 0] = 0x00;
    newBuf[buf.length + 1] = 0x00;
    newBuf[buf.length + 2] = 0x00;
    newBuf[buf.length + 3] = 0x00;

    // ISIZE: 4 bytes, little-endian
    newBuf[buf.length + 4] = decompressedSize & 0xff;
    newBuf[buf.length + 5] = (decompressedSize >> 8) & 0xff;
    newBuf[buf.length + 6] = (decompressedSize >> 16) & 0xff;
    newBuf[buf.length + 7] = (decompressedSize >> 24) & 0xff;

    return newBuf;
}

function getFile(bytes, dv, table_index, file_index, decompress) {
    const data = getFileBoundaries(dv, table_index, file_index);
    if (data.is_pointer) {
        return getFile(bytes, dv, table_index, data.pointing_file_index, decompress);
    }
    if (data.size == 0) {
        return new Uint8Array([]);
    }
    let output = bytes.slice(data.start, data.end);
    output = output.slice(); // forces a copy, zero offset

    if (decompress) {
        // const compressed_sizes = getFileBoundaries(dv, 26, table_index);
        // let decomp_size_bytes = bytes.slice(compressed_sizes.start + (file_index * 4), compressed_sizes.start + ((file_index + 1) * 4));
        // let decomp_size_val = 0;
        // decomp_size_bytes.forEach(val => {
        //     decomp_size_val <<= 8;
        //     decomp_size_val += val;
        // })
        let decomp_size_val = 0x100000;
        let output_copy = addFakeGzipFooter(output, decomp_size_val);
        output = decompressSync(output_copy);
    }

    return output;
}
window.getFile = getFile;

function readFile(buffer, offset, size, signed = false) {
    let val = 0;
    if (offset > buffer.length) {
        throw Error(`Offset (0x${offset.toString(16)}) goes past buffer (0x${buffer.length.toString(16)}).`)
    }
    if ((offset + size) > buffer.length) {
        size = buffer.length - offset;
    }
    for (let i = 0; i < size; i++) {
        if (signed) {
            val <<= 8;
        } else {
            // Ensures it doesn't get converted to a signed (js lol)
            val = (val << 8) >>> 0;
        }
        val += (buffer[offset + i]);
    }
    if (signed) {
        const limit = 1 << ((size << 3 >>> 0) - 1) >>> 0;
        const offset = 1 << (size * 8);
        if (val >= limit) {
            val -= offset;
        }
    }
    return val;
}
window.readFile = readFile;

function writeFile(buffer, value, offset, size) {
    let val_bytes = [];
    for (let i = 0; i < size; i++) {
        val_bytes.push(0);
    }
    let val = value;
    if (value < 0) {
        val += (1 << (8 * size));
    }
    for (let i = 0; i < size; i++) {
        val_bytes[(size - 1) - i] = val & 0xFF;
        val >>= 8;
        if (val == 0) {
            break;
        }
    }
    val_bytes.forEach((v, i) => {
        buffer[offset + i] = v;
    });
}
window.writeFile = writeFile;

function readFloat(buffer, offset) {
    const val = readFile(buffer, offset, 4);
    const view = new DataView(new ArrayBuffer(4));
    view.setUint32(0, val);
    return view.getFloat32(0);
}
window.readFloat = readFloat;

let version_details = {};
const versions = [
    window.version_us,
    window.version_pal,
    window.version_jp,
    window.version_kiosk,
    window.version_lodgenet,
];
versions.forEach(v => version_details[v.region] = v);

function detectVersion(buffer) {
    let indicator = "";
    for (let i = 0; i < 4; i++) {
        indicator += String.fromCharCode(buffer[0x3B + i]);
    }
    console.log(`Testing version: ${indicator}`)
    if (version_details[indicator]) {
        const vdata = version_details[indicator];
        window.pointer_offset = vdata.pointer_offset;
        window.table_offset = vdata.table_offset;
        window.geo_offset = vdata.geo_offset;
        window.fluid_data = vdata.fluids;
        window.overlay_data = vdata.overlay_data;
        window.actor_spawner_offset = vdata.actor_spawner_offset;
        window.has_box_void = vdata.has_box_void;
        window.balloons = vdata.balloons.slice();
        window.distant_screen_texture = vdata.distant_screen_texture;
        window.overlay_data.forEach(ovl => {
            ovl.data = null;
        })
        if (vdata.emoji) {
            document.getElementById("fileUploadText").innerHTML = `<span id="versionFlag">${vdata.emoji}</span> loaded`;
            twemoji.parse(document.getElementById('versionFlag'), { folder: 'svg', ext: '.svg' });
        } else {
            document.getElementById("fileUploadText").innerHTML = `${vdata.name} loaded`;
        }
        // Actor Models
        window.char_models = [];
        window.actor_models = {};
        window.cutscene_models = [];
        window.actor_sprites = {};
        for (let i = 0; i < vdata.actor_behav_count; i++) {
            const head = vdata.actor_behav_rdram + (i * 0x30);
            const actor = readOverlay(1, head + 0, 2);
            const model = readOverlay(1, head + 2, 2) - 1;
            if (model == -1 && actor > 0) {
                // Usually sprites
            }
            if (actor == 0 || model == -1) {
                continue;
            }
            window.actor_models[actor] = model;
        }
        for (let i = 0; i < vdata.char_spawner_count; i++) {
            const head = vdata.char_spawner_rdram + (i * vdata.char_spawner_size);
            const actor = readOverlay(1, head + 0, 2);
            const model = readOverlay(1, head + 2, 2) - 1;
            if (actor == 0 || model == -1) {
                window.char_models.push(null);
                continue;
            }
            window.actor_models[actor] = model;
            window.char_models.push({
                actor: actor,
                model: model,
            })
        }
        for (let i = 0; i < vdata.cutscene_model_count; i++) {
            window.cutscene_models.push(readOverlay(1, vdata.cutscene_model_rdram + (2 * i), 2) - 1);
        }
        // Actor Sprites
        vdata.actor_sprites.forEach(spr => {
            const addr = readOverlay(1, vdata.sprite_table + (spr.sprite_index * 4), 4);
            const codec = readOverlay(1, addr + 0x7, 1);
            const table = readOverlay(1, addr + 0xD, 1) == 1 ? 25 : 7;
            const frame_count = readOverlay(1, addr + 0x12, 2);
            const width = readOverlay(1, addr + 0xE, 2);
            const height = readOverlay(1, addr + 0x10, 2);
            let frames = [];
            for (let i = 0; i < frame_count; i++) {
                frames.push(readOverlay(1, addr + 0x14 + (2 * i), 2));
            }
            const parsers = [
                window.texParserIA4,
                window.texParserIA8,
                window.texParserRGBA5551,
                window.texParserRGBA32,
            ]
            window.actor_sprites[spr.actor] = {
                parser: parsers[codec],
                table: table,
                frames: frames,
                width: width,
                height: height,
            };
        })
        window.music_triggers = window.loadMusicTriggers(vdata.music_triggers);
        window.ambient_sfx_data = window.loadAmbSFXData((vdata.amb_sfx))
        return true;
    }
    document.getElementById("fileUploadText").innerText = "Invalid ROM";
    return false;
}
window.detectVersion = detectVersion;

function concatUint8(a, b) {
    const out = new Uint8Array(a.length + b.length);
    out.set(a, 0);
    out.set(b, a.length);
    return out;
}

function readOverlay(overlay_index, rdram_address, size, signed=false) {
    const ovl = window.overlay_data[overlay_index];
    if (ovl.data === null) {
        const start = ovl.rom_code_start;
        const end = ovl.rom_data_end;
        const ovl_size = end - start;
        if (ovl_size == 0) {
            throw new Error("Invalid overlay");
        }
        let output = window.rom_bytes.slice(start, end);
        output = output.slice(); // forces a copy, zero offset

        if (ovl.compressed) {
            // const compressed_sizes = getFileBoundaries(dv, 26, table_index);
            // let decomp_size_bytes = bytes.slice(compressed_sizes.start + (file_index * 4), compressed_sizes.start + ((file_index + 1) * 4));
            // let decomp_size_val = 0;
            // decomp_size_bytes.forEach(val => {
            //     decomp_size_val <<= 8;
            //     decomp_size_val += val;
            // })
            let decomp_size_val = ovl.rdram_code_end - ovl.rdram_start;
            let temp_items = [];
            let offset = 0;
            let initial_pass = false;
            let target_bytes = [0x1F, 0x8B, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00];
            let target_progress = 0;
            output.forEach((b, i) => {
                if (!initial_pass) {
                    initial_pass = true;
                    return;
                }
                if (b == target_bytes[target_progress]) {
                    target_progress++;
                    if (target_progress == target_bytes.length) {
                        temp_items.push(output.slice(offset, i - target_bytes.length));
                        offset = i - target_bytes.length + 1;
                        target_progress = 0;
                    }
                } else {
                    target_progress = 0;
                }
            });
            let u8arr = null;
            temp_items.forEach(item => {
                let output_copy = addFakeGzipFooter(item, decomp_size_val);
                const temp1 = decompressSync(output_copy);
                if (u8arr == null) {
                    u8arr = temp1;
                } else {
                    u8arr = concatUint8(u8arr, temp1);
                }
            })
            output = u8arr;
        }
        ovl.data = output;
    }
    return window.readFile(ovl.data, rdram_address - ovl.rdram_start, size, signed);
}
window.readOverlay = readOverlay;