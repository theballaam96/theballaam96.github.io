window.pointer_offset = 0x101C50;
window.table_offset = 0;
window.geo_offset = 0;

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
        val <<= 8;
        val += (buffer[offset + i]);
    }
    if (signed) {
        const limit = 1 << ((size * 8) - 1);
        const offset = 1 << (size * 8);
        if (val >= limit) {
            val -= offset;
        }
    }
    return val;
}
window.readFile = readFile;

const version_details = {
    "NDOE": {
        name: "US",
        table_offset: 0,
        geo_offset: 0,
        pointer_offset: 0x101C50,
        emoji: "\u{1F1FA}\u{1F1F8}",
    },
    "NDOJ": {
        name: "JP",
        table_offset: 0,
        geo_offset: 0,
        pointer_offset: 0x1039C0,
        emoji: "\u{1F1EF}\u{1F1F5}",
    },
    "NDPE": {
        name: "Kiosk",
        table_offset: 1,
        geo_offset: 8,
        pointer_offset: 0x1A7C20,
    },
    "NDOG": {
        name: "Lodgenet",
        table_offset: 0,
        geo_offset: 0,
        pointer_offset: 0x1037C0,
    },
    "NDOP": {
        name: "PAL",
        table_offset: 0,
        geo_offset: 0,
        pointer_offset: 0x1038D0,
        emoji: "\u{1F1EA}\u{1F1FA}",
    },
}

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
        if (vdata.emoji) {
            document.getElementById("fileUploadText").innerHTML = `<span id="versionFlag">${vdata.emoji}</span> loaded`;
            twemoji.parse(document.getElementById('versionFlag'), { folder: 'svg', ext: '.svg' });
        } else {
            document.getElementById("fileUploadText").innerHTML = `${vdata.name} loaded`;
        }
        return;
    }
    document.getElementById("fileUploadText").innerText = "Invalid ROM";
}
window.detectVersion = detectVersion;