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
        });
    }
    return dumpObjCollision(prop_file, map_id, mode);
}

function genActorObj(triangles, verts) {
    let mesh_indexes = [];
    let output = "";
    triangles.forEach(triangle => {
        if (!mesh_indexes.includes(triangle.bone_index)) {
            mesh_indexes.push(triangle.bone_index);
        }
    })
    mesh_indexes = mesh_indexes.sort((a, b) => a - b);
    let mesh_triangles = {};
    verts.forEach(vert => {
        selected_vert = vert.coords;
        output += `v ${selected_vert[0]} ${selected_vert[1]} ${selected_vert[2]} ${window.getRatioString(...vert.rgba)}\n`;
    });
    triangles.forEach(triangle => {
        if (!mesh_triangles[triangle.bone_index]) {
            mesh_triangles[triangle.bone_index] = [];
        }
        mesh_triangles[triangle.bone_index].push([
            triangle.verts[0].index + 1,
            triangle.verts[1].index + 1,
            triangle.verts[2].index + 1,
        ])
    })
    Object.keys(mesh_triangles).forEach(mesh_index => {
        output += `\no ${mesh_index}\ng ${mesh_index}\n`;
        mesh_triangles[mesh_index].forEach(tri => {
            output += `f ${tri[0]} ${tri[1]} ${tri[2]}\n`;
        })
    })
    return output;
}

function handleActor(model_id, map_id, mode, sprite_data) {
    if (model_id !== null && model_id !== undefined) {
        const actor_file = window.getFile(window.rom_bytes, window.rom_dv, 5, model_id, true);
        const file_offset = window.readFile(actor_file, 0, 4);
        const dl_end_offset = window.readFile(actor_file, 4, 4);
        const bone_start_offset = window.readFile(actor_file, 8, 4);
        const dl_end_pointer = (dl_end_offset - file_offset) + 0x28;
        const bone_start_pointer = (bone_start_offset - file_offset) + 0x28;
        const vert_end_offset = window.readFile(actor_file, dl_end_pointer, 4);
        const vert_end_pointer = (vert_end_offset - file_offset) + 0x28;
        const bone_count = window.readFile(actor_file, 0x20, 1);
        let bone_offsets = [];
        let bone_bases = [];
        let bone_master = [];
        let vert_bones = [];
        let vert_cache = [];
        for (let b = 0; b < bone_count; b++) {
            bone_offsets.push([0, 0, 0]);
            bone_bases.push([0, 0, 0]);
            bone_master.push(0);
            vert_bones.push([]);
        }
        for (let i = 0; i < 32; i++) {
            vert_cache.push(null);
        }
        let bone_index = 0;
        let verts = [];
        const vert_count = parseInt((vert_end_pointer - 0x28) / 0x10);
        for (let v = 0; v < vert_count; v++) {
            const vert_start = 0x28 +  (v * 0x10);
            verts.push({
                coords: [
                    window.readFile(actor_file, vert_start + 0x0, 2, true),
                    window.readFile(actor_file, vert_start + 0x2, 2, true),
                    window.readFile(actor_file, vert_start + 0x4, 2, true),
                ],
                u: window.readFile(actor_file, vert_start + 0x8, 2),
                v: window.readFile(actor_file, vert_start + 0xA, 2),
                rgba: [
                    window.readFile(actor_file, vert_start + 0xC, 1),
                    window.readFile(actor_file, vert_start + 0xD, 1),
                    window.readFile(actor_file, vert_start + 0xE, 1),
                    window.readFile(actor_file, vert_start + 0xF, 1),
                ],
                index: v,
            })
        }
        const dl_count = parseInt((dl_end_pointer - vert_end_pointer) / 8);
        let mesh = [];
        for (let d = 0; d < dl_count; d++) {
            const dl_header = vert_end_pointer + (d * 8);
            const instruction = window.readFile(actor_file, dl_header, 1);
            const i_hi = window.readFile(actor_file, dl_header, 4);
            const i_lo = window.readFile(actor_file, dl_header + 4, 4);
            if (instruction == 0xDA) {
                const data = window.readFile(actor_file, dl_header + 6, 2);
                bone_index = parseInt(data / 0x40);
            } else if (instruction == 1) {
                const data_0 = window.readFile(actor_file, dl_header + 1, 2);
                const loaded_vert_count = data_0 >> 4;
                const data_1 = window.readFile(actor_file, dl_header + 6, 2);
                const loaded_vert_start = parseInt(data_1 / 0x10);
                for (let v = 0; v < loaded_vert_count; v++) {
                    const focused_vert = loaded_vert_start + v;
                    if (bone_index < bone_count) {
                        vert_bones[bone_index].push(focused_vert);
                    }
                }
                const i_vert_count = (i_hi >> 12) & 0xFF;
                const i_vert_buffer_end = i_hi & 0xFF;
                const i_vert_buffer_start = (i_vert_buffer_end >> 1) - i_vert_count;
                const i_load_position = i_lo & 0xFFFFFF;
                let offset = 0
                let vert_cap = 0xFFFFFFFF;
                const i_load_vert = (i_load_position + offset) >> 4
                const i_load_vert_end = Math.min(i_load_vert + i_vert_count, vert_cap);
                const verts_loaded = verts.slice(i_load_vert, i_load_vert_end);
                verts_loaded.forEach((v, i) => {
                    if ((i_vert_buffer_start + i) < 32) {
                        vert_cache[i_vert_buffer_start + i] = v;
                    } else {
                        console.log(i_hi.toString(16), i_lo.toString(16));
                    }
                })
            } else if (instruction == 5) {
                const tri_buffer_positions = [
                    ((i_hi >> 16) & 0xFF) >> 1,
                    ((i_hi >> 8) & 0xFF) >> 1,
                    ((i_hi >> 0) & 0xFF) >> 1,
                ]
                mesh.push({
                    verts: [
                        vert_cache[tri_buffer_positions[0]],
                        vert_cache[tri_buffer_positions[1]],
                        vert_cache[tri_buffer_positions[2]],
                    ],
                    bone_index: bone_index,
                })
            } else if ((instruction == 6) || (instruction == 7)) {
                const tri_buffer_positions = [
                    ((i_hi >> 16) & 0xFF) >> 1,
                    ((i_hi >> 8) & 0xFF) >> 1,
                    ((i_hi >> 0) & 0xFF) >> 1,
                    ((i_lo >> 16) & 0xFF) >> 1,
                    ((i_lo >> 8) & 0xFF) >> 1,
                    ((i_lo >> 0) & 0xFF) >> 1,
                ]
                mesh.push({
                    verts: [
                        vert_cache[tri_buffer_positions[0]],
                        vert_cache[tri_buffer_positions[1]],
                        vert_cache[tri_buffer_positions[2]],
                    ],
                    bone_index: bone_index,
                })
                mesh.push({
                    verts: [
                        vert_cache[tri_buffer_positions[3]],
                        vert_cache[tri_buffer_positions[4]],
                        vert_cache[tri_buffer_positions[5]],
                    ],
                    bone_index: bone_index,
                })
            }
        }
        for (let b = 0; b < bone_count; b++) {
            const bone_header = bone_start_pointer + (b * 0x10);
            const base_bone = window.readFile(actor_file, bone_header + 0, 1);
            const local_bone = window.readFile(actor_file, bone_header + 1, 1);
            const master_bone = window.readFile(actor_file, bone_header + 2, 1);
            let coords = [0, 0, 0];
            if (base_bone != 0xFF) {
                coords = bone_offsets[base_bone].slice();
            }
            for (let c = 0; c < 3; c++) {
                coords[c] += window.readFloat(actor_file, bone_header + 0x4 + (c * 4));
            }
            bone_offsets[local_bone] = coords.slice();
            if (master_bone < bone_count) {
                bone_bases[master_bone] = bone_offsets[local_bone].slice()
            } else {
                bone_bases.push(bone_offsets[local_bone].slice())
            }
            bone_master[local_bone] = master_bone
        }
        vert_bones.forEach((bone, i) => {
            bone.forEach(vert => {
                for (let c = 0; c < 3; c++) {
                    verts[vert].coords[c] += bone_offsets[i][c];
                }
            })
        })
        return genActorObj(mesh, verts);
    } else if (sprite_data !== null && sprite_data !== undefined) {
        return {
            shape: "billboard",
            images: sprite_data.frames.map(f => {
                return sprite_data.parser(window.getFile(window.rom_bytes, window.rom_dv, sprite_data.table, f, sprite_data.table !== 7))
            }),
            frame_count: sprite_data.frames.length,
            width: sprite_data.width,
            height: sprite_data.height,
            x_size: sprite_data.width * 7,
            y_size: sprite_data.height * 7,
            speed: 40,
        }
    }
    return null;
}

function isObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseSetup(map_id, mode, actor_mode) {
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
                rotation: [
                    window.readFloat(setup_file, obj_start + 0x18),
                    window.readFloat(setup_file, obj_start + 0x1C),
                    window.readFloat(setup_file, obj_start + 0x20),
                ],
                is_prop: true,
                mode: mode,
            };
            if (mode == "geo") {
                if (typeof parsed_models[obj_type] === "string") {
                    // Obj file
                    data.obj = parsed_models[obj_type];
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
    if (actor_mode) {
        let parsed_actors = {};
        const mys_count = window.readFile(setup_file, 4 + (prop_count * 0x30), 4);
        const actor_block_start = 8 + (prop_count * 0x30) + (mys_count * 0x24);
        const actor_count = window.readFile(setup_file, actor_block_start, 4);
        for (let a = 0; a < actor_count; a++) {
            const actor_header = actor_block_start + 4 + (a * 0x38);
            const actor_type = window.readFile(setup_file, actor_header + 0x32, 2) + window.actor_spawner_offset;
            if (window.actor_models[actor_type] || window.actor_sprites[actor_type]) {
                let model_type = window.actor_models[actor_type];
                let sprite = window.actor_sprites[actor_type];
                if (!parsed_actors[actor_type]) {
                    parsed_actors[actor_type] = handleActor(model_type, map_id, mode, sprite);
                }
                let data = {
                    coords: [
                        window.readFloat(setup_file, actor_header + 0),
                        window.readFloat(setup_file, actor_header + 4),
                        window.readFloat(setup_file, actor_header + 8),
                    ],
                    scale: 0.15 * window.readFloat(setup_file, actor_header + 0xC),
                    rotation: [0, (window.readFile(setup_file, actor_header + 0x30, 2) / 4096) * 360, 0],
                    is_prop: false,
                    mode: "geo",
                };
                if (typeof parsed_actors[actor_type] === "string") {
                    // Obj file
                    data.obj = parsed_actors[actor_type];
                } else {
                    // Assume object
                    data.cobj = parsed_actors[actor_type];
                }
                objects.push(data);
            } else {
                console.log("No model or sprite for actor", actor_type)
            }
        }
        // Parse character spawner file
        const spawner_file = window.getFile(window.rom_bytes, window.rom_dv, 0x10, map_id, true);
        const fence_count = window.readFile(spawner_file, 0, 2);
        let read_l = 2;
        for (let i = 0; i < fence_count; i++) {
            const point_0_count = window.readFile(spawner_file, read_l, 2);
            read_l += 2 + (6 * point_0_count);
            const point_1_count = window.readFile(spawner_file, read_l, 2);
            read_l += 6 + (10 * point_1_count);
        }
        const spawner_count = window.readFile(spawner_file, read_l, 2);
        read_l += 2;
        for (let i = 0; i < spawner_count; i++) {
            const enemy_id = window.readFile(spawner_file, read_l, 1);
            const extra_count = window.readFile(spawner_file, read_l + 0x11, 1);
            const cutscene_model = window.readFile(spawner_file, read_l + 0xA, 1);
            const scale = window.readFile(spawner_file, read_l + 0xF, 1);
            const actor_data = window.char_models[enemy_id];
            let ref_data = actor_data;
            if (enemy_id == 0x50) {
                ref_data = {
                    actor: 0xFE,
                    model: window.cutscene_models[cutscene_model],
                }
            }
            if (ref_data !== null) {
                let model_type = ref_data.model;
                if (!parsed_actors[ref_data.actor]) {
                    parsed_actors[ref_data.actor] = handleActor(model_type, map_id, mode, null);
                }
                let data = {
                    coords: [
                        window.readFile(spawner_file, read_l + 4, 2, true),
                        window.readFile(spawner_file, read_l + 6, 2, true),
                        window.readFile(spawner_file, read_l + 8, 2, true),
                    ],
                    scale: 0.15 * 5 * (scale / 255),
                    rotation: [0, (window.readFile(spawner_file, read_l + 2, 2, true) / 4096) * 360, 0],
                    is_prop: false,
                    mode: "geo",
                };
                if (typeof parsed_actors[ref_data.actor] === "string") {
                    // Obj file
                    data.obj = parsed_actors[ref_data.actor];
                } else {
                    // Assume object
                    data.cobj = parsed_actors[ref_data.actor];
                }
                objects.push(data);
            } else {
                console.log("No model for actor", enemy_id)
            }
            read_l += 0x16 + (extra_count * 2);
        }
    }
    return objects;
}

window.parseSetup = parseSetup;