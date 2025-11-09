function dumpObjCollision(prop_file, map_id, mode) {
    let mesh = [];
    let applied_mode = mode
    if (mode == "slip" && [0xB7, 0x97].includes(map_id)) {
        applied_mode = "slip_forceostandslip"
    }
    // Walls
    if (window.files_to_load[mode]) {
        if (window.files_to_load[mode].includes(2)) {
            const wall_start = window.readFile(prop_file, 0x4C, 4);
            const wall_tri_count = window.readFile(prop_file, wall_start, 4);
            for (let x = 0; x < wall_tri_count; x++) {
                const coord_set_start = wall_start + 4 + (0x16 * x);
                let coord_set = [];
                for (let v = 0; v < 3; v++) {
                    const local_start = coord_set_start + (6 * v);
                    coord_set.push([
                        window.readFile(prop_file, local_start + 0, 2, true),
                        window.readFile(prop_file, local_start + 2, 2, true),
                        window.readFile(prop_file, local_start + 4, 2, true),
                    ]);
                }
                /*
                    0x12 - Props
                    0x13 - Wall Index Byte
                    0x14 
                    0x15
                */
                const wall_prop = window.readFile(prop_file, coord_set_start + 0x12, 1);
                let output_tri = createTriangle(coord_set[0], coord_set[1], coord_set[2], wall_prop, 0, 0, 0, 2, applied_mode);
                output_tri.is_solid = (wall_prop & 2) == 0;
                mesh.push(output_tri);
            }
        }
        // Floors
        if (window.files_to_load[mode].includes(3)) {
            const floor_start = window.readFile(prop_file, 0x50, 4);
            const floor_tri_count = window.readFile(prop_file, floor_start, 4);
            for (let x = 0; x < floor_tri_count; x++) {
                const coord_set_start = floor_start + 0x10 + (0x18 * x);
                let coord_set = [];
                for (let v = 0; v < 3; v++) {
                    const local_start = coord_set_start + (6 * v);
                    coord_set.push([
                        window.readFile(prop_file, local_start + 0, 2, true),
                        window.readFile(prop_file, local_start + 2, 2, true),
                        window.readFile(prop_file, local_start + 4, 2, true),
                    ]);
                }
                mesh.push(createTriangle(coord_set[0], coord_set[1], coord_set[2], 0, window.readFile(prop_file, coord_set_start + 0x12, 1) << 8, 0, 0, 3, applied_mode));
            }
        }
    }
    return mesh;
}

/*
    40 - 00 78: DL Start
    44 - 08 B0: Expansions Start
    48 - 0A 68: Expansions End / Vert Start
    4C - 18 B8: Vert End / Walls Start
    50 - 1F F4: Walls End / Floors Start
    54 - 20 C4: Floors End
    58 - 20 C8
    5C - 20 CC
    60 - 20 D0
    64 - 21 10
    68 - 24 CC
    6C - 26 D4
    70 - 27 E0
*/

function getTexture(tex_data, pal_data) {
    if (pal_data !== null) {
        const palette = window.texParserRGBA5551(pal_data, null);
        return window.texParserCI4(tex_data, palette);
    }
    return window.texParserRGBA5551(tex_data, null);
}

function getFrames(prop_file) {
    const images_start = window.readFile(prop_file, 0x6C, 4);
    const gif_data = window.readFile(prop_file, 0x70, 4);
    const dyn_tex_count = window.readFile(prop_file, images_start, 4);
    const allotment_count = window.readFile(prop_file, gif_data, 4);
    let x_count = 1;
    let y_count = 1;
    let x_flip = false;
    let y_flip = false;
    let allotment_data = [];
    for (let i = 0; i < allotment_count; i++) {
        const allotment_start = gif_data + 4 + (i * 0x30);
        const palette = window.readFile(prop_file, allotment_start + 2, 2);
        let x_pos = [];
        let y_pos = [];
        for (let j = 0; j < 4; j++) {
            x_pos.push(window.readFile(prop_file, allotment_start + 4 + (j * 2), 2, true));
            y_pos.push(window.readFile(prop_file, allotment_start + 12 + (j * 2), 2, true));
        }
        allotment_data.push({
            default_texture: window.readFile(prop_file, allotment_start + 0, 2),
            palette: palette,
            width: window.readFile(prop_file, allotment_start + 0x2C, 1),
            height: window.readFile(prop_file, allotment_start + 0x2D, 1),
            avg_x: x_pos.reduce((sum, num) => sum + num, 0) / x_pos.length,
            avg_y: y_pos.reduce((sum, num) => sum + num, 0) / y_pos.length,
            min_x: Math.min(...x_pos),
            min_y: Math.min(...y_pos),
            max_x: Math.max(...x_pos),
            max_y: Math.max(...y_pos),
        })
    }
    let min_x = 99999;
    let min_y = 99999;
    let max_x = -1;
    let max_y = -1;
    allotment_data.forEach(a => {
        if (a.min_x < min_x) {
            min_x = a.min_x;
        }
        if (a.min_y < min_y) {
            min_y = a.min_y;
        }
        if (a.max_x > max_x) {
            max_x = a.max_x;
        }
        if (a.max_y > max_y) {
            max_y = a.max_y;
        }
    });
    const x_size = max_x - min_x;
    const y_size = max_y - min_y;
    if (allotment_count == 2) {
        const dx = Math.abs(allotment_data[1].avg_x - allotment_data[0].avg_x);
        const dy = Math.abs(allotment_data[1].avg_y - allotment_data[0].avg_y);
        if (allotment_data[1].avg_x < allotment_data[0].avg_x) {
            x_flip = true;
        }
        if (allotment_data[1].avg_y < allotment_data[0].avg_y) {
            y_flip = true;
        }
        if (dy > dx) {
            y_count = 2;
        } else {
            x_count = 2;
        }
    } else if (allotment_count == 4) {
        x_count = 2;
        y_count = 2;
    }
    let frame_count = 0;
    let textures_global = [];
    if (dyn_tex_count == 0) {
        allotment_data.forEach(a => {
            const tex_data = window.getFile(window.rom_bytes, window.rom_dv, 25, a.default_texture, true);
            let pal_data = null;
            if (a.palette != 0xFFFF) {
                pal_data = window.getFile(window.rom_bytes, window.rom_dv, 25, a.palette, true);
            }
            const stream = getTexture(tex_data, pal_data);
            textures_global.push(stream);
        })
        frame_count = 1;
    } else {
        for (let x = 0; x < dyn_tex_count; x++) {
            const block_start = images_start + 4 + (x * 0x84);
            const default_texture = window.readFile(prop_file, block_start + 0x00, 4);
            const tex_count = window.readFile(prop_file, block_start + 0x0C, 4);
            frame_count = tex_count;
            let textures = [default_texture];
            for (let y = 0; y < tex_count - 1; y++) {
                textures.push(window.readFile(prop_file, block_start + 0x10 + (y * 4), 4));
            }
            textures.forEach(tex => {
                const tex_data = window.getFile(window.rom_bytes, window.rom_dv, 7, tex, false);
                const stream = getTexture(tex_data, null);
                textures_global.push(stream);
            });
        }
    }
    const original_width = allotment_data[0].width;
    const original_height = allotment_data[0].height;
    const width = original_width * x_count;
    const height = original_height * y_count;
    if (allotment_count > 1) {
        // Join images
        let new_textures = [];
        for (let i = 0; i < frame_count; i++) {
            const buffer = new Uint8Array(4 * width * height);
            let offset = 0;
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    let ax_index = Math.floor(x / original_width);
                    let ay_index = Math.floor(y / original_height);
                    if (x_flip) {
                        ax_index = (x_count - 1) - ax_index;
                    }
                    if (y_flip) {
                        ay_index = (y_count - 1) - ay_index;
                    }
                    const a_index = (ay_index * x_count) + ax_index;
                    const t_index = i + (frame_count * a_index);
                    const local_x = (x % original_width);
                    const local_y = (y % original_height);
                    const l_offset = 4 * ((local_y * original_width) + local_x);
                    buffer[offset + 0] = textures_global[t_index][l_offset + 0];
                    buffer[offset + 1] = textures_global[t_index][l_offset + 1];
                    buffer[offset + 2] = textures_global[t_index][l_offset + 2];
                    buffer[offset + 3] = textures_global[t_index][l_offset + 3];
                    offset += 4;
                }
            }
            new_textures.push(buffer);
        }
        return {
            frames: new_textures,
            width: width,
            height: height,
            x_size: x_size,
            y_size: y_size,
        }
    }
    return {
        frames: textures_global,
        width: width,
        height: height,
        x_size: x_size,
        y_size: y_size,
    }
}

function handleObject(obj_id, map_id, mode) {
    const prop_file = window.getFile(window.rom_bytes, window.rom_dv, 4, obj_id, true);
    if (mode == "geo") {
        const obj_type = window.readFile(prop_file, 0x1C, 1);
        if (obj_type == 2) {
            // Billboarded Texture
            const frames = getFrames(prop_file);
            return {
                shape: "billboard",
                images: frames.frames,
                frame_count: frames.frame_count,
                width: frames.width,
                height: frames.height,
                x_size: frames.x_size,
                y_size: frames.y_size,
                speed: 40,
            }
        }
        const vert_start = window.readFile(prop_file, 0x48, 4);
        const vert_end = window.readFile(prop_file, 0x4C, 4);
        return window.generateGeometryGeneric({
            file: prop_file,
            dl_start: window.readFile(prop_file, 0x40, 4),
            dl_end: window.readFile(prop_file, 0x48, 4),  // Technically 44
            vert_start: vert_start,
            vert_length: vert_end - vert_start,
            include_textures: mode == "geo_tex",
        });
    }
    return dumpObjCollision(prop_file, map_id, mode);
}

function isObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseSetup(map_id, mode) {
    let objects = [];
    const setup_file = window.getFile(window.rom_bytes, window.rom_dv, 9, map_id, true);
    const prop_count = window.readFile(setup_file, 0, 4);
    let parsed_models = {};
    for (let x = 0; x < prop_count; x++) {
        const obj_start = 4 + (x * 0x30);
        const obj_type = window.readFile(setup_file, obj_start + 0x28, 2);
        if (!parsed_models[obj_type]) {
            let temp = handleObject(obj_type, map_id, mode);
            if (mode == "gaps") {
                temp = temp.concat(window.dumpGapTris(temp));
            }
            parsed_models[obj_type] = temp;
        }
        if ((parsed_models[obj_type].length > 0) || isObject(parsed_models[obj_type])) {
            let data = {
                coords: [
                    window.readFloat(setup_file, obj_start + 0),
                    window.readFloat(setup_file, obj_start + 4),
                    window.readFloat(setup_file, obj_start + 8),
                ],
                scale: window.readFloat(setup_file, obj_start + 12),
                rotation: window.readFloat(setup_file, obj_start + 0x1C),
            };
            if (mode == "geo") {
                if (Array.isArray(parsed_models[obj_type])) {
                    // Obj file
                    data.obj = parsed_models[obj_type][0];
                } else {
                    // Assume object
                    data.cobj = parsed_models[obj_type];
                }
            } else {
                data.tris = JSON.parse(JSON.stringify(parsed_models[obj_type]));
            }
            objects.push(data);
        }
    }
    return objects;
}

window.parseSetup = parseSetup;