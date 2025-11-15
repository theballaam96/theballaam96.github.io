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
            fluid_vars: {
                ripple_byte: surface_info.ripple,
                var_04: window.readFloat(map_geo, fluid_header + 0x4),
                var_08: window.readFloat(map_geo, fluid_header + 0x8),
                var_0C: window.readFloat(map_geo, fluid_header + 0xC),
                var_10: window.readFloat(map_geo, fluid_header + 0x10),
                diff_0: window.readFile(map_geo, fluid_header + 0x14, 4),
                diff_1: window.readFile(map_geo, fluid_header + 0x18, 4),
                var_1C: window.readFloat(map_geo, fluid_header + 0x1C),
                var_20: window.readFloat(map_geo, fluid_header + 0x20),
                var_24: window.readFloat(map_geo, fluid_header + 0x24),
                var_28: window.readFloat(map_geo, fluid_header + 0x28),
                counter_diff_x: window.readFile(map_geo, fluid_header + 0x2C, 4),
                counter_diff_z: window.readFile(map_geo, fluid_header + 0x30, 4),
                texture_delta_x: window.readFloat(map_geo, fluid_header + 0x34),
                texture_delta_z: window.readFloat(map_geo, fluid_header + 0x38),
                timer_0: 0,
                timer_1: 0,
                counter_38: 0,
                counter_3c: 0,
                initialized: false,
            },
            color: window.readFile(map_geo, fluid_header + 0x61, 3),
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
            texture_coords: [
                window.readFloat(map_geo, fluid_header + 0x3C),
                window.readFloat(map_geo, fluid_header + 0x40),
            ],
            opacity: window.readFile(map_geo, fluid_header + 0x64, 1) + window.readFile(map_geo, fluid_header + 0x65, 1),
        })
    }
    return fluids;
}
window.loadFluids = loadFluids;

function sinDK64U(v) {
    return Math.sin((v / 4096) * 2 * Math.PI);
}

function animateFluidPoint(x, y, z, userData) {
    const fluidVars = userData.fluid_vars;
    const currentHeight = 0; // TODO: How is this calculated
    x /= userData.local_scale;
    y /= userData.local_scale;
    z /= userData.local_scale;
    switch (fluidVars.ripple_byte) {
        // see getWaterPointY
        case 0:
            const fvar12 = sinDK64U((fluidVars.timer_0 + (fluidVars.var_04 * x)) & 0xFFF);
            const fvar11 = sinDK64U((fluidVars.timer_1 + (fluidVars.var_08 * z)) & 0xFFF);
            y += ((fvar11 * fluidVars.var_10) + currentHeight + (fluidVars.var_0C * fvar12));
            // console.log(y)
            break;
        case 1:
        case 2:
            break;
        default:
            y = 0;
            break;
    }
    if (!userData.initialized) {
        // See 80660d38
        x += (sinDK64U(((fluidVars.counter_38 + fluidVars.var_1C * x)) & 0xFFF) * fluidVars.var_24);
        z += (sinDK64U(((fluidVars.counter_3c + fluidVars.var_20 * z)) & 0xFFF) * fluidVars.var_28);
        // userData.initialized = true;
    }
    x *= userData.local_scale;
    y *= userData.local_scale;
    z *= userData.local_scale;
    return [x, y, z];
}
window.animateFluidPoint = animateFluidPoint;