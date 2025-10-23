const trigger_colors = {
    "LoadingZone": 0xFF0000,
    "Cutscene": 0x00FF00,
    "Autowalk": 0x0000FF,
    "State": 0xFF00FF,
    "Weather": 0x00FFFF,
    "ObjectControl": 0xFFFF00,
    "Cheat": 0xFFFFFF,
    "Undefined": 0x000000,
}

const trigger_data = [
    { index: 0,  type: "ObjectControl", name: "Spawn Trigger" }, // 0x00: Spawn Trigger (0x12 - Character Spawner "Spawn Trigger")
    { index: 1,  type: "Undefined", name: "Unknown 0x1" }, // 0x01
    { index: 2,  type: "ObjectControl", name: "Despawn Trigger" }, // 0x02: Despawn Trigger (0x12 - Character Spawner "Spawn Trigger")
    { index: 3,  type: "ObjectControl", name: "Boss Door Trigger" }, // 0x03: Boss Door Trigger
    { index: 4,  type: "ObjectControl", name: "Update Actor Trigger" }, // 0x04: Update Actor Trigger (0x14 - Actor Spawner ID. Makes Rock fall in Fungi Minecart)
    { index: 5,  type: "Cutscene", name: "Cutscene Trigger 0x5" }, // 0x05: Cutscene Trigger
    { index: 6,  type: "Weather", name: "Weather Overlay Force Trigger" }, // 0x06: Weather Overlay Force Trigger (Spawns DK in treehouse?)
    { index: 7,  type: "Weather", name: "Weather Overlay Set Trigger" }, // 0x07: Weather Overlay Set Trigger
    { index: 8,  type: "Weather", name: "Weather Overlay Remove Trigger" }, // 0x08: Weather Overlay Remove Trigger
    { index: 9,  type: "LoadingZone", name: "Loading Zone 0x9" }, // 0x09: Loading Zone
    { index: 10, type: "Cutscene", name: "Cutscene Trigger 0xA" }, // 0x0A: Cutscene Trigger
    { index: 11, type: "ObjectControl", name: "Init TNT Minecart (Minecart Mayhem)" }, // 0x0B: Init TNT Minecart (Minecart Mayhem)
    { index: 12, type: "LoadingZone", name: "Loading Zone + Objects" }, // 0x0C: Loading Zone + Objects
    { index: 13, type: "LoadingZone", name: "Loading Zone 0xD" }, // 0x0D: Loading Zone
    { index: 14, type: "Undefined", name: "Unknown 0xE" }, // 0x0E
    { index: 15, type: "LoadingZone", name: "Warp Trigger" }, // 0x0F: Warp Trigger
    { index: 16, type: "LoadingZone", name: "Loading Zone 0x10" }, // 0x10: Loading Zone
    { index: 17, type: "LoadingZone", name: "Parent Map Loading Zone" }, // 0x11: Parent Map Loading Zone
    { index: 18, type: "State", name: "Coin Shower Trigger" }, // 0x12: Coin Shower Trigger
    { index: 19, type: "State", name: "Detransform Trigger" }, // 0x13: Detransform Trigger
    { index: 20, type: "LoadingZone", name: "Boss Door LZ" }, // 0x14: Boss Door LZ
    { index: 21, type: "Autowalk", name: "Autowalk Trigger" }, // 0x15: Autowalk Trigger
    { index: 22, type: "State", name: "Sound Trigger" }, // 0x16: Sound Trigger
    { index: 23, type: "Cutscene", name: "Cutscene Trigger 0x17" }, // 0x17: Cutscene Trigger
    { index: 24, type: "Undefined", name: "Unknown 0x18" }, // 0x18: In Fungi Minecart? Unsure on function
    { index: 25, type: "Undefined", name: "Unknown 0x19" }, // 0x19: Everywhere in Seal Race. Unsure on function?
    { index: 26, type: "State", name: "Gravity Trigger" }, // 0x1A: Gravity Trigger
    { index: 27, type: "State", name: "Slide Trigger" }, // 0x1B: Slide Trigger
    { index: 28, type: "State", name: "Unslide Trigger" }, // 0x1C: Unslide Trigger
    { index: 29, type: "LoadingZone", name: "Zipper Trigger" }, // 0x1D: Zipper Trigger
    { index: 30, type: "State", name: "Song Trigger" }, // 0x1E: Song Trigger
    { index: 31, type: "Undefined", name: "Unknown 0x1F" }, // 0x1F
    { index: 32, type: "Cutscene", name: "Cutscene Trigger 0x20" }, // 0x20: Cutscene Trigger
    { index: 33, type: "Undefined", name: "Unknown 0x21" }, // 0x21
    { index: 34, type: "Undefined", name: "Unknown 0x22" }, // 0x22
    { index: 35, type: "Undefined", name: "Unknown 0x23" }, // 0x23
    { index: 36, type: "State", name: "Detransform Trigger" }, // 0x24: Detransform Trigger
    { index: 37, type: "State", name: "Load Chunk Textures Trigger" }, // 0x25: Load Chunk Textures Trigger
    { index: 38, type: "Cheat", name: "K. Lumsy Cheat Trigger" }, // 0x26: K. Lumsy Cheat Trigger
    { index: 39, type: "State", name: "Destroy Object Trigger" }, // 0x27: Destroy Object Trigger
];

function parseTriggers(map_id) {
    const trigger_file = window.getFile(window.rom_bytes, window.rom_dv, 18, map_id, true);
    const trigger_count = window.readFile(trigger_file, 0, 2);
    let triggers = [];
    for (let i = 0; i < trigger_count; i++) {
        let trigger_start = 2 + (0x38 * i);
        let radius = window.readFile(trigger_file, trigger_start + 6, 2, true);
        let height = window.readFile(trigger_file, trigger_start + 8, 2, true);
        let infinite_h = false;
        let infinite_y = false;
        if (radius == -1) {
            radius = 10;
            infinite_h = true;
        }
        if (height == -1) {
            height = 300;
            infinite_y = true;
        }
        let trigger_type = window.readFile(trigger_file, trigger_start + 0x10, 2);
        let local_trigger_data = trigger_data[trigger_type];

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
            color: trigger_colors[local_trigger_data.type],
            name: `Trigger ${i}: ${local_trigger_data.name}`,
            shape: "cylinder"
        })
    }
    return triggers;
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
            color: 0xFF00FF,
        })
        info_l += 0x1C;
    }
    console.log(lock_zones)
    return lock_zones;
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
        if (local_path.length == 1) {
            paths.push({
                coords: local_path[0].coords,
                color: 0xFF0000,
                radius: 10,
                shape: "sphere",
                name: `Path ${path_id}`,
            })
            console.log(local_path[0].coords)
        } else if (local_path.length > 1) {
            paths.push({
                path: local_path,
                color: 0xFF0000,
                thickness: 10,
                shape: "path",
                name: `Path ${path_id}`,
            })
        }
    }
    return paths;
}

function allViews(map_id) {
    let collective = [];
    if (document.getElementById("trigger_selector").checked) {
        collective = collective.concat(parseTriggers(map_id));
    }
    if (document.getElementById("lock_selector").checked) {
        collective = collective.concat(parseCamLocks(map_id));
    }
    if (document.getElementById("path_selector").checked) {
        collective = collective.concat(parsePaths(map_id));
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