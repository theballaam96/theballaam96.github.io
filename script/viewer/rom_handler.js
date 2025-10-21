let pointer_offset = 0x101C50;
function getFileBoundaries(dv, table_index, file_index) {
    const table_head = pointer_offset + dv.getUint32(pointer_offset + (table_index * 4), false);
    const file_start = pointer_offset + (dv.getUint32(table_head + (file_index * 4), false));
    const file_end = pointer_offset + (dv.getUint32(table_head + ((file_index + 1) * 4), false));
    const file_size = file_end - file_start;
    console.log(file_start.toString(16), file_end.toString(16))
    return {
        "start": file_start,
        "end": file_end,
        "size": file_size,
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

function readFile(buffer, offset, size) {
    let val = 0;
    for (let i = 0; i < size; i++) {
        val <<= 8;
        val += (buffer[offset + i]);
    }
    return val;
}
window.readFile = readFile;