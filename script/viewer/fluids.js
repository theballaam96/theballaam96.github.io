function loadFluids(map_id) {
    const map_geo = window.getFile(window.rom_bytes, window.rom_dv, 1, map_id, true);
    if (map_geo.length == 0) {
        return "";
    }
    const fluid_pointer = window.readFile(map_geo, 0x4C - window.geo_offset, 4);
    const fluid_count = window.readFile(map_geo, fluid_pointer, 4);
    let fluids = [];
    for (let i = 0; i < fluid_count; i++) {
        const fluid_header = fluid_pointer + 4 + (i * 0x6C);
        const y_pos = window.readFile(map_geo, fluid_header + 0x4E, 2, true);
        const surface_type = window.readFile(map_geo, fluid_header + 0x66, 1);
        const surface_info = window.fluid_data[surface_type];
        fluids.push({
            name: surface_info.name,
            surface_type: surface_type,
            surface_info: surface_info,
            dist_per_division: window.readFile(map_geo, fluid_header + 0x44, 2),
            coords: [
                [
                    window.readFile(map_geo, fluid_header + 0x46, 2, true),
                    y_pos,
                    window.readFile(map_geo, fluid_header + 0x48, 2, true),
                ],
                [
                    window.readFile(map_geo, fluid_header + 0x4A, 2, true),
                    y_pos,
                    window.readFile(map_geo, fluid_header + 0x4C, 2, true),
                ],
            ],
            opacity: window.readFile(map_geo, fluid_header + 0x64, 1) + window.readFile(map_geo, fluid_header + 0x65, 1),
        })
    }
    console.log(fluids)
    return fluids;
}
window.loadFluids = loadFluids;