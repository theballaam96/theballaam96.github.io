function getPaletteColor(palette, index) {
    return {
        red: palette[(4 * index) + 0],
        green: palette[(4 * index) + 1],
        blue: palette[(4 * index) + 2],
        alpha: palette[(4 * index) + 3],
    }
}

/*
    RGBA 5551 Format
*/

function texParserRGBA5551(texture_bytes, palette) {
    const pixel_count = texture_bytes.length / 2;
    const stream = new Uint8Array(4 * pixel_count);
    for (let i = 0; i < pixel_count; i++) {
        const px_data = window.readFile(texture_bytes, i * 2, 2);
        const red = (((px_data >> 11) & 0x1F) << 3);
        const green = (((px_data >> 6) & 0x1F) << 3);
        const blue = (((px_data >> 1) & 0x1F) << 3);
        const alpha = (px_data & 1) == 1 ? 255 : 0;
        stream[(i * 4) + 0] = red;
        stream[(i * 4) + 1] = green;
        stream[(i * 4) + 2] = blue;
        stream[(i * 4) + 3] = alpha;
    }
    return stream;
}
window.texParserRGBA5551 = texParserRGBA5551;

/*
    RGBA 32 Format
*/

function texParserRGBA32(texture_bytes, palette) {
    const pixel_count = texture_bytes.length / 4;
    const stream = new Uint8Array(4 * pixel_count);
    for (let i = 0; i < pixel_count; i++) {
        for (let j = 0; j < 4; j++) {
            stream[(i * 4) + j] = window.readFile(texture_bytes, (i * 4) + j, 1);
        }
    }
    return stream;
}
window.texParserRGBA32 = texParserRGBA32;

/*
    CI4 Format
*/

function texParserCI4(texture_bytes, palette) {
    const pixel_count = texture_bytes.length * 2;
    const stream = new Uint8Array(4 * pixel_count);
    for (let i = 0; i < pixel_count; i++) {
        let offset = Math.floor(i / 2);
        let shift = 4 - ((i % 2) * 4);
        let val = (window.readFile(texture_bytes, offset, 1) >> shift) & 0xF;
        stream[(i * 4) + 0] = getPaletteColor(palette, val).red;
        stream[(i * 4) + 1] = getPaletteColor(palette, val).green;
        stream[(i * 4) + 2] = getPaletteColor(palette, val).blue;
        stream[(i * 4) + 3] = getPaletteColor(palette, val).alpha;
    }
    return stream;
}
window.texParserCI4 = texParserCI4;

/*
    CI8 Format
*/

function texParserCI8(texture_bytes, palette) {
    const pixel_count = texture_bytes.length * 2;
    const stream = new Uint8Array(4 * pixel_count);
    for (let i = 0; i < pixel_count; i++) {
        let val = window.readFile(texture_bytes, i, 1);
        stream[(i * 4) + 0] = getPaletteColor(palette, val).red;
        stream[(i * 4) + 1] = getPaletteColor(palette, val).green;
        stream[(i * 4) + 2] = getPaletteColor(palette, val).blue;
        stream[(i * 4) + 3] = getPaletteColor(palette, val).alpha;
    }
    return stream;
}
window.texParserCI8 = texParserCI8;

/*
    IA4 Format
*/

function texParserIA4(texture_bytes, palette) {
    const pixel_count = texture_bytes.length * 2;
    const stream = new Uint8Array(4 * pixel_count);
    for (let i = 0; i < pixel_count; i++) {
        let offset = Math.floor(i / 2);
        let shift = 4 - ((i % 2) * 4);
        let val = (window.readFile(texture_bytes, offset, 1) >> shift) & 0xF;
        const intensity = (val >> 1) & 7;
        const chan = Math.round((intensity * 255) / 7);
        stream[(i * 4) + 0] = chan;
        stream[(i * 4) + 1] = chan;
        stream[(i * 4) + 2] = chan;
        stream[(i * 4) + 3] = val & 1 ? 255 : 0;
    }
    return stream;
}
window.texParserIA4 = texParserIA4;

/*
    IA8 Format
*/

function texParserIA8(texture_bytes, palette) {
    const pixel_count = texture_bytes.length;
    const stream = new Uint8Array(4 * pixel_count);
    for (let i = 0; i < pixel_count; i++) {
        let val = window.readFile(texture_bytes, i, 1);
        let portions = [
            (val >> 4) & 0xF,
            val & 0xF,
        ]
        portions.forEach((p, j) => {
            portions[j] = Math.round((p * 255) / 15);
        })
        stream[(i * 4) + 0] = portions[0];
        stream[(i * 4) + 1] = portions[0];
        stream[(i * 4) + 2] = portions[0];
        stream[(i * 4) + 3] = portions[1];
    }
    return stream;
}
window.texParserIA8 = texParserIA8;