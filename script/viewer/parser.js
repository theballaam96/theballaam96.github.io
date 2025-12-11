const trigger_colors = {
    "Loading Zone": 0xFF0000,
    "Cutscene": 0x00FF00,
    "Autowalk": 0x0000FF,
    "State": 0xFF00FF,
    "Slide": 0x91C238,
    "Detransform": 0xFB2B63,
    "Weather": 0x00FFFF,
    "Object Control": 0xFFFF00,
    "Cheat": 0xFFFFFF,
    "Unknown": 0x000000,
}

const trigger_data = [
    { index: 0,  type: "Object Control", name: "Spawn Trigger" }, // 0x00: Spawn Trigger (0x12 - Character Spawner "Spawn Trigger")
    { index: 1,  type: "Unknown", name: "Unknown 0x1" }, // 0x01
    { index: 2,  type: "Object Control", name: "Despawn Trigger" }, // 0x02: Despawn Trigger (0x12 - Character Spawner "Spawn Trigger")
    { index: 3,  type: "Object Control", name: "Boss Door Trigger" }, // 0x03: Boss Door Trigger
    { index: 4,  type: "Object Control", name: "Update Actor Trigger" }, // 0x04: Update Actor Trigger (0x14 - Actor Spawner ID. Makes Rock fall in Fungi Minecart)
    { index: 5,  type: "Cutscene", name: "Cutscene Trigger 0x5" }, // 0x05: Cutscene Trigger
    { index: 6,  type: "Weather", name: "Weather Overlay Force Trigger" }, // 0x06: Weather Overlay Force Trigger (Spawns DK in treehouse?)
    { index: 7,  type: "Weather", name: "Weather Overlay Set Trigger" }, // 0x07: Weather Overlay Set Trigger
    { index: 8,  type: "Weather", name: "Weather Overlay Remove Trigger" }, // 0x08: Weather Overlay Remove Trigger
    { index: 9,  type: "Loading Zone", name: "Loading Zone 0x9" }, // 0x09: Loading Zone
    { index: 10, type: "Cutscene", name: "Cutscene Trigger 0xA" }, // 0x0A: Cutscene Trigger
    { index: 11, type: "Object Control", name: "Init TNT Minecart (Minecart Mayhem)" }, // 0x0B: Init TNT Minecart (Minecart Mayhem)
    { index: 12, type: "Loading Zone", name: "Loading Zone + Objects" }, // 0x0C: Loading Zone + Objects
    { index: 13, type: "Loading Zone", name: "Loading Zone 0xD" }, // 0x0D: Loading Zone
    { index: 14, type: "Unknown", name: "Unknown 0xE" }, // 0x0E
    { index: 15, type: "Loading Zone", name: "Warp Trigger" }, // 0x0F: Warp Trigger
    { index: 16, type: "Loading Zone", name: "Loading Zone 0x10" }, // 0x10: Loading Zone
    { index: 17, type: "Loading Zone", name: "Parent Map Loading Zone" }, // 0x11: Parent Map Loading Zone
    { index: 18, type: "State", name: "Coin Shower Trigger" }, // 0x12: Coin Shower Trigger
    { index: 19, type: "Detransform", name: "Detransform Trigger" }, // 0x13: Detransform Trigger
    { index: 20, type: "Loading Zone", name: "Boss Door LZ" }, // 0x14: Boss Door LZ
    { index: 21, type: "Autowalk", name: "Autowalk Trigger" }, // 0x15: Autowalk Trigger
    { index: 22, type: "State", name: "Sound Trigger" }, // 0x16: Sound Trigger
    { index: 23, type: "Cutscene", name: "Cutscene Trigger 0x17" }, // 0x17: Cutscene Trigger
    { index: 24, type: "Unknown", name: "Unknown 0x18" }, // 0x18: In Fungi Minecart? Unsure on function
    { index: 25, type: "Unknown", name: "Unknown 0x19" }, // 0x19: Everywhere in Seal Race. Unsure on function?
    { index: 26, type: "State", name: "Gravity Trigger" }, // 0x1A: Gravity Trigger
    { index: 27, type: "Slide", name: "Slide Trigger" }, // 0x1B: Slide Trigger
    { index: 28, type: "Slide", name: "Unslide Trigger" }, // 0x1C: Unslide Trigger
    { index: 29, type: "Loading Zone", name: "Zipper Trigger" }, // 0x1D: Zipper Trigger
    { index: 30, type: "State", name: "Song Trigger" }, // 0x1E: Song Trigger
    { index: 31, type: "Unknown", name: "Unknown 0x1F" }, // 0x1F
    { index: 32, type: "Cutscene", name: "Cutscene Trigger 0x20" }, // 0x20: Cutscene Trigger
    { index: 33, type: "Unknown", name: "Unknown 0x21" }, // 0x21
    { index: 34, type: "Unknown", name: "Unknown 0x22" }, // 0x22
    { index: 35, type: "Unknown", name: "Unknown 0x23" }, // 0x23
    { index: 36, type: "Detransform", name: "Detransform Trigger" }, // 0x24: Detransform Trigger
    { index: 37, type: "State", name: "Load Chunk Textures Trigger" }, // 0x25: Load Chunk Textures Trigger
    { index: 38, type: "Cheat", name: "K. Lumsy Cheat Trigger" }, // 0x26: K. Lumsy Cheat Trigger
    { index: 39, type: "State", name: "Destroy Object Trigger" }, // 0x27: Destroy Object Trigger
];

function parseTriggers(map_id) {
    const trigger_file = window.getFile(window.rom_bytes, window.rom_dv, 18, map_id, true);
    const trigger_count = window.readFile(trigger_file, 0, 2);
    let triggers = [];
    let enabled_cache = {};
    for (let i = 0; i < trigger_count; i++) {
        let trigger_start = 2 + (0x38 * i);
        let radius = window.readFile(trigger_file, trigger_start + 6, 2, true);
        let height = window.readFile(trigger_file, trigger_start + 8, 2, true);
        let infinite_h = false;
        let infinite_y = false;
        if (radius == 32767) {
            infinite_h = true;
        }
        if (height == -1) {
            height = 300;
            infinite_y = true;
        }
        let trigger_type = window.readFile(trigger_file, trigger_start + 0x10, 2);
        let local_trigger_data = trigger_data[trigger_type];
        const general_type = local_trigger_data.type;
        if (!Object.keys(enabled_cache).includes(general_type)) {
            enabled_cache[general_type] = window.isNodeOrSubSelected(general_type);
        }
        if (enabled_cache[general_type]) {
            triggers.push({
                coords: [
                    window.readFile(trigger_file, trigger_start + 0, 2, true),
                    window.readFile(trigger_file, trigger_start + 2, 2, true),
                    window.readFile(trigger_file, trigger_start + 4, 2, true),
                ],
                infinite_h: infinite_h,
                infinite_y: infinite_y,
                radius: radius,
                height: height,
                color: trigger_colors[general_type],
                name: `Trigger ${i}: ${local_trigger_data.name}`,
                shape: "cylinder"
            })
        }
    }
    return triggers;
}

const unused_cutscenes = {
    0xBD: [2, 3, 4],  // BFI
    0xAD: [6],  // Aztec Lobby
    0xC2: [3, 4, 5, 6, 7, 8],  // Caves Lobby
    0xB2: [2],  // Fungi Lobby
    0xC1: [2],  // Castle Lobby
    0xAB: [1],  // DK's House
    0x07: [1, 12, 21, 23, 24, 30, 31, 32, 33],  // Japes
    0x15: [0],  // Diddy 5DT
    0x1A: [6, 9, 29, 30, 47], // Factory
    0x1E: [16], // Galleon
    0x30: [13], // Fungi
    0x3C: [5], // Spider Boss
    0x48: [17, 26], // Caves
    0xA3: [4], // Dungeon
    0xC7: [47], // KKO
    0xCB: [3], // DK Phase
    0xCD: [2, 3], // Lanky Phase
    0xCE: [0], // Tiny Phase
    0xCF: [3, 12], // Chunky Phase
    0xD0: [1], // Bloopers
    0xAC: [2], // Rock Intro Story
    0x50: [7, 8], // Main Menu
}

function parseCamLocks(map_id) {
    const cutscene_file = window.getFile(window.rom_bytes, window.rom_dv, 8, map_id, true);
    let info_l = 0x30
    let read_l = 0
    for (let x = 0; x < 0x18; x++) {
        const header_info_count = window.readFile(cutscene_file, read_l, 2);
        read_l += 2;
        info_l += (header_info_count * 0x12);
    }
    const base_count = window.readFile(cutscene_file, info_l, 2);
    info_l += 2;
    let lock_zones = [];
    for (let x = 0; x < base_count; x++) {
        const collision_type = window.readFile(cutscene_file, info_l + 0x1B, 1);
        lock_zones.push({
            coords: [
                window.readFile(cutscene_file, info_l + 0x10, 2, true),
                window.readFile(cutscene_file, info_l + 0x12, 2, true),
                window.readFile(cutscene_file, info_l + 0x14, 2, true),
            ],
            radius: window.readFile(cutscene_file, info_l + 0x19, 1) * 4,
            height: 300,
            shape: [1, 2].includes(collision_type) ? "cylinder" : "sphere",
            name: `Camera Lock ${x}`,
            infinite_h: false,
            infinite_y: true,
            color: 0x3895C2,
        })
        info_l += 0x1C;
    }
    return lock_zones;
}

function parseCamPaths(map_id) {
    const cutscene_file = window.getFile(window.rom_bytes, window.rom_dv, 8, map_id, true);
    let info_l = 0x30
    let read_l = 0
    for (let x = 0; x < 0x18; x++) {
        const header_info_count = window.readFile(cutscene_file, read_l, 2);
        read_l += 2;
        info_l += (header_info_count * 0x12);
    }
    const base_count = window.readFile(cutscene_file, info_l, 2);
    info_l += (2 + (base_count * 0x1C));
    const cutscene_count = window.readFile(cutscene_file, info_l, 2);
    info_l += 2;
    let cutscenes = [];
    for (let i = 0; i < cutscene_count; i++) {
        const sub_count = window.readFile(cutscene_file, info_l, 2);
        info_l += 2;
        let point_seq = [];
        let point_dur = [];
        for (let j = 0; j < sub_count; j++) {
            point_seq.push(window.readFile(cutscene_file, info_l + 0, 2));
            point_dur.push(window.readFile(cutscene_file, info_l + 2, 2));
            info_l += 4;
        }
        cutscenes.push({
            count: sub_count,
            point_sequence: point_seq,
            point_durations: point_dur,
        })
    }
    const cutscene_point_count = window.readFile(cutscene_file, info_l, 2);
    let count_copy = cutscene_point_count;
    info_l += 2;
    let actions = [];
    while (count_copy != 0) {
        const command = window.readFile(cutscene_file, info_l + 1, 1);
        let action_data = {
            command: command,
            is_path: false,
            used_cutscenes: [],
        };
        count_copy--;
        switch (command) {
            case 1:
                info_l += 10;
                break;
            case 2:
                info_l += 12;
                break;
            case 3:
            case 13:
                info_l += 16;
                break;
            case 4:
                action_data.is_path = true;
                action_data.point_arr = [];
                const local_count_4 = window.readFile(cutscene_file, info_l + 4, 2);
                info_l += 0x20;
                for (let j = 0; j < local_count_4; j++) {
                    action_data.point_arr.push({
                        coords: [
                            window.readFile(cutscene_file, info_l + 0, 2, true),
                            window.readFile(cutscene_file, info_l + 2, 2, true),
                            window.readFile(cutscene_file, info_l + 4, 2, true),
                        ],
                        rot: [
                            window.readFile(cutscene_file, info_l + 6, 1),
                            window.readFile(cutscene_file, info_l + 8, 1),
                            window.readFile(cutscene_file, info_l + 10, 1),
                        ],
                        zoom: window.readFile(cutscene_file, info_l + 12, 1),
                        roll: window.readFile(cutscene_file, info_l + 13, 1),
                    })
                    info_l += 0xE;
                }
                break;
            case 5:
                action_data.is_path = true;
                action_data.point_arr = [];
                const local_count_5 = window.readFile(cutscene_file, info_l + 4, 2);
                info_l += 0x14;
                for (let j = 0; j < local_count_5; j++) {
                    action_data.point_arr.push({
                        coords: [
                            window.readFile(cutscene_file, info_l + 0, 2, true),
                            window.readFile(cutscene_file, info_l + 2, 2, true),
                            window.readFile(cutscene_file, info_l + 4, 2, true),
                        ],
                        zoom: window.readFile(cutscene_file, info_l + 6, 1),
                        roll: window.readFile(cutscene_file, info_l + 7, 1),
                    })
                    info_l += 0x8;
                }
                break;
            case 10:
            case 15:
            case 16:
                info_l += 18;
                break;
            case 12:
                info_l += 6;
                break;
            default:
                count_copy++;
                info_l += 4;
        }
        actions.push(action_data);
    }
    cutscenes.forEach((cutscene, cutscene_index) => {
        cutscene.point_sequence.forEach(point => {
            if (point < actions.length) {
                if (!actions[point].used_cutscenes.includes(cutscene_index)) {
                    actions[point].used_cutscenes.push(cutscene_index);
                }
            }
        })
    })
    const show_used = window.isNodeOrSubSelected("Used");
    const show_unused = window.isNodeOrSubSelected("Unused");
    const show_v_unused = window.isNodeOrSubSelected("Unassociated");
    return actions.filter(k => k.is_path).map((action, action_index) => {
        const used = action.used_cutscenes.length > 0;
        let show = false;
        let color = 0;
        if (used) {
            let is_unused = false;
            if (unused_cutscenes[map_id]) {
                is_unused = true;
                action.used_cutscenes.forEach(cs => {
                    if (!unused_cutscenes[map_id].includes(cs)) {
                        is_unused = false;
                    }
                })
            }
            if (is_unused) {
                show = show_unused;
                color = 0x00526F;
            } else {
                show = show_used;
                color = 0x60B100;
            }
        } else {
            color = 0xB75400;
            show = show_v_unused;
        }
        if (show) {
            return getPathObject(action.point_arr, {
                color: color,
                thickness: 10,
                name: `Cam Path ${action_index}${used ? ` (${action.used_cutscenes.join(', ')})` : ' (Unused)'}`,
            })
        }
        return null;
    }).filter(k => k !== null);
}

function getPathObject(path, config) {
    const unique_count = new Set(path.map(k => JSON.stringify(k.coords))).size;
    if (unique_count == 1) {
        config.radius = config.thickness;
        config.coords = path[0].coords;
        config.shape = "sphere"
        return config;
    } else if (unique_count > 1) {
        config.path = path;
        config.shape = "path";
        return config;
    }
    return {}
}

function getPolyObject(verts, config) {
    if (verts.length > 2) {
        config.verts = verts;
        config.shape = "poly";
        return config;
    }
    return getPathObject(verts, config);
}

function parsePaths(map_id) {
    const path_file = window.getFile(window.rom_bytes, window.rom_dv, 15, map_id, false);
    const path_count = window.readFile(path_file, 0, 2);
    let paths = [];
    let read_l = 2;
    for (let i = 0; i < path_count; i++) {
        let local_path = [];
        const path_id = window.readFile(path_file, read_l, 2);
        const point_count = window.readFile(path_file, read_l + 2, 2);
        read_l += 6;
        for (let p = 0; p < point_count; p++) {
            local_path.push({
                coords: [
                    window.readFile(path_file, read_l + 2, 2, true),
                    window.readFile(path_file, read_l + 4, 2, true),
                    window.readFile(path_file, read_l + 6, 2, true),
                ]
            })
            read_l += 10;
        }
        paths.push(getPathObject(local_path, {
            color: 0xFF0000,
            thickness: 10,
            name: `Path ${path_id}`,
        }));
    }
    return paths;
}

function parseAutowalks(map_id) {
    const autowalk_file = window.getFile(window.rom_bytes, window.rom_dv, 21, map_id, false);
    let autowalks = [];
    const count = window.readFile(autowalk_file, 0, 2);
    let read_l = 2;
    for (let x = 0; x < count; x++) {
        const sub_count = window.readFile(autowalk_file, read_l, 2);
        let path_points = [];
        read_l += 2;
        for (let y = 0; y < sub_count; y++) {
            path_points.push({
                coords: [
                    window.readFile(autowalk_file, read_l + 0, 2, true),
                    window.readFile(autowalk_file, read_l + 2, 2, true),
                    window.readFile(autowalk_file, read_l + 4, 2, true),
                ]
            })
            read_l += 0x12
        }
        autowalks.push(getPathObject(path_points, {
            color: 0x42A5B2,
            thickness: 10,
            name: `Autowalk Path ${x}`,
        }))
    }
    return autowalks;
}

function parseExits(map_id) {
    const exit_file = window.getFile(window.rom_bytes, window.rom_dv, 23, map_id, false);
    let exits = [];
    const exit_count = parseInt(exit_file.length / 10);
    const show_exit_nodes = window.isNodeOrSubSelected("Exit Nodes");
    const show_exit_awalk = window.isNodeOrSubSelected("Autowalk Destinations");
    for (let x = 0; x < exit_count; x++) {
        const exit_start = x * 10;
        const angle = window.readFile(exit_file, exit_start + 6, 1);
        const local_data = {
            coords: [
                window.readFile(exit_file, exit_start + 0, 2, true),
                window.readFile(exit_file, exit_start + 2, 2, true),
                window.readFile(exit_file, exit_start + 4, 2, true),
            ],
            radius: 20,
            color: 0x00FF00,
            name: `Exit ${x}`,
            shape: "sphere",
        }
        if (show_exit_nodes) {
            exits.push(local_data);
        }
        if (show_exit_awalk) {
            const has_autowalk = window.readFile(exit_file, exit_start + 8, 1) != 0;
            if (has_autowalk) {
                const angle_radians = (angle / 255) * Math.PI * 2;
                exits.push({
                    coords: [
                        local_data.coords[0] + (Math.sin(angle_radians) * 50),
                        local_data.coords[1],
                        local_data.coords[2] + (Math.cos(angle_radians) * 50),
                    ],
                    radius: Math.sqrt(100),
                    shape: "cylinder",
                    height: 300,
                    infinite_h: false,
                    infinite_y: true,
                    color: 0x42A5B2,
                    name: `Autowalk target for exit ${x}`
                })
            }
        }
    }
    return exits;
}

function parseCharSpawnerFile(map_id) {
    const spawner_file = window.getFile(window.rom_bytes, window.rom_dv, 0x10, map_id, true);
    let fences = [];
    let paths = [];
    const enemy_extra_data = window.readFile(spawner_file, 0, 2);
    let read_l = 2;
    for (let i = 0; i < enemy_extra_data; i++) {
        let fence = [];
        const fence_vert_count = window.readFile(spawner_file, read_l, 2);
        read_l += 2;
        for (let j = 0; j < fence_vert_count; j++) {
            fence.push({
                coords: [
                    window.readFile(spawner_file, read_l + 0, 2, true),
                    window.readFile(spawner_file, read_l + 2, 2, true),
                    window.readFile(spawner_file, read_l + 4, 2, true),
                ]
            });
            read_l += 6;
        }
        let path = [];
        const path_vert_count = window.readFile(spawner_file, read_l, 2);
        read_l += 2;
        for (let j = 0; j < path_vert_count; j++) {
            path.push({
                coords: [
                    window.readFile(spawner_file, read_l + 0, 2, true),
                    window.readFile(spawner_file, read_l + 2, 2, true),
                    window.readFile(spawner_file, read_l + 4, 2, true),
                ]
            });
            read_l += 10;
        }
        read_l += 4;
        if (fence_vert_count > 0) {
            fence_arr = fence.slice();
            if (fence.length > 3) {
                fence_arr = fence.filter((_, i) => i > 0);
            }
            fences.push(getPolyObject(fence_arr, {
                color: 0x0000FF,
                name: `Fence ${i}`,
            }));
        }
        if (path_vert_count > 0) {
            paths.push(getPathObject(path, {
                color: 0x0000FF,
                thickness: 10,
                name: `Enemy Path ${i}`,
            }));
        }
    }
    return {
        "fences": fences,
        "paths": paths,
    }
}

function parseChunks(map_id) {
    const map_geo = window.getFile(window.rom_bytes, window.rom_dv, 1, map_id, true);
    const chunk_header = window.readFile(map_geo, 0x64 - window.geo_offset, 4);
    const chunk_count = window.readFile(map_geo, chunk_header, 4);
    let data = [];
    for (let i = 0; i < chunk_count; i++) {
        const local_header = chunk_header + 4 + (0xC * i);
        const location = chunk_header + window.readFile(map_geo, local_header, 4);
        let x = [];
        let z = [];
        x[0] = window.readFile(map_geo, local_header + 0x04, 2, true) / 6;
        z[0] = window.readFile(map_geo, local_header + 0x06, 2, true) / 6;
        x[1] = window.readFile(map_geo, local_header + 0x08, 2, true) / 6;
        z[1] = window.readFile(map_geo, local_header + 0x0A, 2, true) / 6;
        const location0 = chunk_header + window.readFile(map_geo, local_header + 0xC, 4);
        const count = (location0 - location) / 0x14;
        x = x.sort()
        z = z.sort()
        for (let j = 0; j < count; j++) {
            const local_header_0 = location + (j * 0x14);
            const factor_y = (window.readFile(map_geo, local_header_0 + 0x12, 1) & 1) == 0;
            const y_bound = window.readFile(map_geo, local_header_0 + 0x6, 2, true) / 6;
            let x_bounds = [
                window.readFile(map_geo, local_header_0 + 0x00, 2, true) / 6,
                window.readFile(map_geo, local_header_0 + 0x02, 2, true) / 6,
                window.readFile(map_geo, local_header_0 + 0x04, 2, true) / 6,
            ];
            let z_bounds = [
                window.readFile(map_geo, local_header_0 + 0x0C, 2, true) / 6,
                window.readFile(map_geo, local_header_0 + 0x0E, 2, true) / 6,
                window.readFile(map_geo, local_header_0 + 0x10, 2, true) / 6,
            ];
            let y = [-1000, 1000];
            if (factor_y) {
                y[0] = y_bound - 10;
                y[1] = y[0] + 1000;
            }
            /*
            bvar1 = (last_y_bound - 6y) < 60
            bvar2 = (curr_y_bound - 6y) < 60
            p2 < 60 + 6y
            6y > p2 - 60

            a = abs(last_y_bound - 6y)
            b = abs(curr_y_bound - 6y)

            in_chunk = bvar2 && (!bvar1 || (b >= a))
            */
            const xmin = Math.max(x[0], Math.min(...x_bounds));
            const zmin = Math.max(z[0], Math.min(...z_bounds));
            const xmax = Math.min(x[1], Math.max(...x_bounds));
            const zmax = Math.min(z[1], Math.max(...z_bounds));
            data.push({
                bounds: [
                    [xmin, y[0], zmin],
                    [xmax, y[1], zmax],
                ],
                shape: "cube",
                color: 0xFF0000,
                name: `Subchunk ${i} - ${j}`
            })
        }
        
    }
    return data;
}

function parseVoids(map_id) {
    let data = [];
    const map_geo = window.getFile(window.rom_bytes, window.rom_dv, 1, map_id, true);
    if (map_geo.length === 0) {
        return [];
    }
    const ymin = 0;
    const ymax = 1000;
    if (window.has_box_void) {
        const xmin = window.readFile(map_geo, 0x26, 2, true);
        const zmin = window.readFile(map_geo, 0x28, 2, true);
        const xmax = window.readFile(map_geo, 0x2A, 2, true);
        const zmax = window.readFile(map_geo, 0x2C, 2, true);
        const hbuffer = 1000;
        data.push({
            bounds: [
                [xmin - hbuffer, ymin, zmin],
                [xmin, ymax, zmax],
            ],
            shape: "cube",
            color: 0x000000
        });
        data.push({
            bounds: [
                [xmin - hbuffer, ymin, zmin - hbuffer],
                [xmax + hbuffer, ymax, zmin],
            ],
            shape: "cube",
            color: 0x000000
        });
        data.push({
            bounds: [
                [xmax, ymin, zmin],
                [xmax + hbuffer, ymax, zmax],
            ],
            shape: "cube",
            color: 0x000000
        });
        data.push({
            bounds: [
                [xmin - hbuffer, ymin, zmax],
                [xmax + hbuffer, ymax, zmax + hbuffer],
            ],
            shape: "cube",
            color: 0x000000
        });
    }
    const void_tris = window.getCollisionTris(map_id, "voids");
    void_tris.forEach(tri => {
        data.push({
            tri: tri.coords,
            y: [
                ymin * window.getScale(map_id),
                ymax * window.getScale(map_id),
            ],
            color: 0x000000,
            shape: "tprism",
        })
    })
    return data;
}

function loadMusicTriggers(vdata) {
    return vdata.map(map_data => {
        let data = [];
        for (let i = 0; i < map_data.count; i++) {
            const head = map_data.addr + (i * 0xE);
            data.push({
                coords: [
                    window.readOverlay(1, head + 0x0, 2, true),
                    window.readOverlay(1, head + 0x2, 2, true),
                    window.readOverlay(1, head + 0x4, 2, true),
                ],
                radius: window.readOverlay(1, head + 0x8, 2, true),
            })
        }
        return {
            map_id: map_data.map_id,
            triggers: data
        };
    })
}
window.loadMusicTriggers = loadMusicTriggers;

function parseMusicTriggers(map_id) {
    let trigger_set = null;
    window.music_triggers.forEach(map_data => {
        if (map_data.map_id === map_id) {
            trigger_set = map_data.triggers;
        }
    })
    if (!trigger_set) {
        return [];
    }
    return trigger_set.map(trig => {
        const local_data = [
            { height: 300, inset: 0, color: 0x00DFFF, y_offset: 0 },
            { height: 310, inset: 20, color: 0xB28700, y_offset: -5 },
        ]
        return local_data.map(k => {
            return {
                coords: trig.coords.map((c, i) => i == 1 ? c + k.y_offset : c),
                infinite_h: false,
                infinite_y: true,
                radius: trig.radius - k.inset,
                height: k.height,
                color: k.color,
                name: "Music Trigger",
                shape: "cylinder"
            };
        }).slice();
    }).flat().slice();
}

function parseTracks(map_id) {
    const map_geo = window.getFile(window.rom_bytes, window.rom_dv, 1, map_id, true);
    if (map_geo.length === 0) {
        return [];
    }
    const points_start = window.readFile(map_geo, 0x40 - window.geo_offset, 4);
    const block_count = window.readFile(map_geo, points_start, 4, true) + 1;
    let segments = [];
    for (let i = 0; i < block_count; i++) {
        const block_start = window.readFile(map_geo, points_start + 0x4 + (4 * i), 4);
        const block_end = window.readFile(map_geo, points_start + 0x8 + (4 * i), 4);
        let points = [];
        const point_count = parseInt((block_end - block_start) / 0xC);
        for (let j = 0; j < point_count; j++) {
            const head = points_start + block_start + (0xC * j);
            points.push({
                coords: [
                    window.readFloat(map_geo, head + 0x0),
                    window.readFloat(map_geo, head + 0x4),
                    window.readFloat(map_geo, head + 0x8),
                ]
            })
        }
        segments.push(getPathObject(points, {
            color: 0xFB542B,
            thickness: 10,
            name: `Track ${i}`,
        }))
    }
    return segments;
}

function parseKongMirrorBoxes(map_id) {
    const map_geo = window.getFile(window.rom_bytes, window.rom_dv, 1, map_id, true);
    if (map_geo.length === 0) {
        return [];
    }
    const box_start = window.readFile(map_geo, 0x54 - window.geo_offset, 4);
    const box_count = window.readFile(map_geo, box_start, 4);
    let boxes = [];
    for (let i = 0; i < box_count; i++) {
        const plane_head = box_start + 4 + (0x10 * i);
        boxes.push({
            bounds: [
                [
                    window.readFile(map_geo, plane_head + 0x0, 2, true),
                    window.readFile(map_geo, plane_head + 0x2, 2, true),
                    window.readFile(map_geo, plane_head + 0x4, 2, true),
                ],
                [
                    window.readFile(map_geo, plane_head + 0x6, 2, true),
                    window.readFile(map_geo, plane_head + 0x8, 2, true),
                    window.readFile(map_geo, plane_head + 0xA, 2, true),
                ],
            ],
            color: 0x9BFB2B,
            shape: "cube",
            name: `Mirror Plane ${i}`
        });
    }
    return boxes;
}

function parseAmbientSFX(map_id) {
    const map_geo = window.getFile(window.rom_bytes, window.rom_dv, 1, map_id, true);
    if (map_geo.length === 0) {
        return [];
    }
    const sfx_start = window.readFile(map_geo, 0x44 - window.geo_offset, 4);
    const sfx_count = window.readFile(map_geo, sfx_start, 4);
    let points = [];
    for (let i = 0; i < sfx_count; i++) {
        const sfx_head = sfx_start + 4 + (i * 8);
        const rom_data = window.ambient_sfx_data[window.readFile(map_geo, sfx_head + 0x7, 1) - 1];
        points.push({
            coords: [
                window.readFile(map_geo, sfx_head + 0x0, 2, true),
                window.readFile(map_geo, sfx_head + 0x2, 2, true),
                window.readFile(map_geo, sfx_head + 0x4, 2, true),
            ],
            shape: "sphere",
            radius: (rom_data.mult * window.readFile(map_geo, sfx_head + 0x6, 1)) / 255,
            color: 0x2BFBB7,
            name: `Ambient SFX ${i}: ${rom_data.sfx}`,
        });
    }
    return points;
}

function loadAmbSFXData(vdata) {
    let output = [];
    for (let i = 0; i < vdata.count; i++) {
        const head = vdata.offset + (i * vdata.size);
        output.push({
            sfx: window.readOverlay(1, head + 0x0, 2),
            mult: window.readOverlay(1, head + 0x2, 1),
        })
    }
    return output;
}
window.loadAmbSFXData = loadAmbSFXData;

function allViews(map_id) {
    let collective = [];
    if (window.isNodeOrSubSelected("Triggers")) {
        collective = collective.concat(parseTriggers(map_id));
    }
    if (window.isNodeOrSubSelected("Camera Lock Zones")) {
        collective = collective.concat(parseCamLocks(map_id));
    }
    if (window.isNodeOrSubSelected("Object Paths")) {
        collective = collective.concat(parsePaths(map_id));
    }
    if (window.isNodeOrSubSelected("Autowalk Paths")) {
        collective = collective.concat(parseAutowalks(map_id));
    }
    if (window.isNodeOrSubSelected("Exits")) {
        collective = collective.concat(parseExits(map_id));
    }
    if (window.isNodeOrSubSelected("Camera Paths")) {
        collective = collective.concat(parseCamPaths(map_id));
    }
    if (window.isNodeOrSubSelected("Chunks")) {
        collective = collective.concat(parseChunks(map_id));
    }
    if (window.isNodeOrSubSelected("Voids")) {
        collective = collective.concat(parseVoids(map_id));
    }
    if (window.isNodeOrSubSelected("Music Triggers")) {
        collective = collective.concat(parseMusicTriggers(map_id));
    }
    if (window.isNodeOrSubSelected("Tracks")) {
        collective = collective.concat(parseTracks(map_id));
    }
    if (window.isNodeOrSubSelected("Kong Mirror Bounds")) {
        collective = collective.concat(parseKongMirrorBoxes(map_id));
    }
    if (window.isNodeOrSubSelected("Ambient SFX")) {
        collective = collective.concat(parseAmbientSFX(map_id));
    }
    const enemy_fences = window.isNodeOrSubSelected("Enemy Fences");
    const enemy_paths = window.isNodeOrSubSelected("Enemy Paths (WIP)");
    if (enemy_fences || enemy_paths) {
        const data = parseCharSpawnerFile(map_id);
        if (enemy_fences) {
            collective = collective.concat(data["fences"]);
        }
        if (enemy_paths) {
            collective = collective.concat(data["paths"]);
        }
    }
    collective.forEach(entry => {
        if (Object.keys(entry).includes("coords")) {
            entry.coords[0] *= window.getScale(map_id);
            entry.coords[1] *= window.getScale(map_id);
            entry.coords[2] *= window.getScale(map_id);
        }
        if (Object.keys(entry).includes("path")) {
            entry.path.forEach(p => {
                p.coords[0] *= window.getScale(map_id);
                p.coords[1] *= window.getScale(map_id);
                p.coords[2] *= window.getScale(map_id);
            })
        }
        if (Object.keys(entry).includes("verts")) {
            entry.verts.forEach(p => {
                p.coords[0] *= window.getScale(map_id);
                p.coords[1] *= window.getScale(map_id);
                p.coords[2] *= window.getScale(map_id);
            })
        }
        if (Object.keys(entry).includes("bounds")) {
            entry.bounds.forEach(b => {
                b[0] *= window.getScale(map_id);
                b[1] *= window.getScale(map_id);
                b[2] *= window.getScale(map_id);
            })
        }
        if (Object.keys(entry).includes("radius")) {
            entry.radius *= window.getScale(map_id);
        }
        if (Object.keys(entry).includes("height")) {
            entry.height *= window.getScale(map_id);
        }
    })
    return collective;
}
window.allViews = allViews;