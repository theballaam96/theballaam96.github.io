const collision_info = {
    2: {
        name: "Walls",
        counts: [0x10, 0x12],
        compressed_bit: 1,
        divisor: 1,
    },
    3: {
        name: "Floors",
        counts: [0x18, 0x1A],
        compressed_bit: 2,
        divisor: 6,
    },
}

window.files_to_load = {
    "collision": [2, 3],
    "gaps": [2, 3],
    "walls": [2],
    "floors": [3],
    "slip": [3],
    "enum_floors": [3],
    "voids": [3],
    "phase": [2],
};

function getCollisionTris(map_id, mode) {
    files = {};
    const map_geo = window.getFile(window.rom_bytes, window.rom_dv, 1, map_id, true);
    if (map_geo.length === 0) {
        return [];
    }
    let tris = [];
    window.files_to_load[mode].forEach(file => {
        const counts = collision_info[file].counts.map(count => {
            return window.readFile(map_geo, count, 2)
        })
        const compressed = (window.readFile(map_geo, 9, 1) & collision_info[file].compressed_bit) != 0;
        files[file] = window.getFile(window.rom_bytes, window.rom_dv, file, map_id, compressed);
        if (files[file].length === 0) {
            return [];
        }
        tris = tris.concat(dumpTris(files[file], counts[0] * counts[1], file, mode, map_id))
    })
    return tris;
}
window.getCollisionTris = getCollisionTris;

function triangleNormalFacing(coordSet) {
    // Unpack the coordinates: coordSet is expected to be an array of three arrays, e.g., [[x1, y1, z1], [x2, y2, z2], [x3, y3, z3]]
    const [[x1, y1, z1], [x2, y2, z2], [x3, y3, z3]] = coordSet;

    // Compute the vectors V1 = P2 - P1 and V2 = P3 - P1
    const vector1 = [x2 - x1, y2 - y1, z2 - z1];
    const vector2 = [x3 - x1, y3 - y1, z3 - z1];

    // Compute the cross product (Normal Vector N = V1 x V2)
    // N.x = V1.y * V2.z - V1.z * V2.y
    const crossX = vector1[1] * vector2[2] - vector1[2] * vector2[1];
    // N.y = V1.z * V2.x - V1.x * V2.z
    const crossY = vector1[2] * vector2[0] - vector1[0] * vector2[2];
    // N.z = V1.x * V2.y - V1.y * V2.x
    const crossZ = vector1[0] * vector2[1] - vector1[1] * vector2[0];
    
    // The full cross product is [crossX, crossY, crossZ]
    // The original Python checks the y-component (index 1) of the cross product.

    // Check the y-component of the cross product
    if (crossY > 0) {
        // Corresponds to TriangleNorms.Up
        return 'Up'; 
    } else if (crossY < 0) {
        // Corresponds to TriangleNorms.Down
        return 'Down'; 
    } else {
        // Corresponds to TriangleNorms.XZParallel
        return 'XZParallel'; 
    }
}

const angle_data = [
    [
        0x8000,   0x7EBA,   0x7D74,   0x7C2D,
        0x7AE7,   0x79A0,   0x7859,   0x7711,
        0x75C9,   0x7480,   0x7337,   0x71EC,
        0x70A1,   0x6F55,   0x6E07,   0x6CB8,
        0x6B68,   0x6A17,   0x68C4,   0x6770,
        0x661A,   0x64C1,   0x6367,   0x620B,
        0x60AD,   0x5F4C,   0x5DE9,   0x5C83,
        0x5B1A,   0x59AE,   0x583E,   0x56CB,
        0x5555,   0x53DB,   0x525C,   0x50D9,
        0x4F51,   0x4DC5,   0x4C32,   0x4A9A,
        0x48FC,   0x4757,   0x45AB,   0x43F7,
        0x423A,   0x4075,   0x3EA5,   0x3CCB,
        0x3AE5,   0x38F1,   0x36EF,   0x34DC,
        0x32B7,   0x307D,   0x2E2B,   0x2BBD,
        0x292E,   0x2678,   0x2391,   0x206C,
        0x1CF6,   0x0000,
    ],
    [
        0x1CF6,   0x1CBB,   0x1C80,   0x1C45,
        0x1C08,   0x1BCC,   0x1B8F,   0x1B51,
        0x1B13,   0x1AD4,   0x1A95,   0x1A55,
        0x1A14,   0x19D3,   0x1992,   0x194F,
        0x190C,   0x18C9,   0x1884,   0x183F,
        0x17F9,   0x17B3,   0x176B,   0x1723,
        0x16DA,   0x1690,   0x1645,   0x15F9,
        0x15AC,   0x155E,   0x150F,   0x14BE,
        0x146D,   0x141A,   0x13C6,   0x1370,
        0x1319,   0x12C1,   0x1267,   0x120B,
        0x11AD,   0x114E,   0x10EC,   0x1088,
        0x1022,   0x0FB9,   0x0F4D,   0x0EDE,
        0x0E6C,   0x0DF7,   0x0D7D,   0x0D00,
        0x0C7D,   0x0BF4,   0x0B66,   0x0AD0,
        0x0A31,   0x0989,   0x08D3,   0x080E,
        0x0734,   0x063D,   0x0518,   0x039A,
    ],
    [
        0x039A,   0x031E,   0x028C,   0x01CD,
        0x0000,   0x0000,   0x0000,   0x0000,
        0x0000,   0x0000,   0x0000,   0x0000,
        0xFF00,   0x0000,   0x0000,   0x0000,
        0x0000,   0x0000,   0x0000,   0x0000,
        0x0000,   0x0000,   0x0000,   0x0000,
        0x0000,   0x0000
    ],
]

function getStickAngle_subd20(a) {
    let u = 7;
    let n;
    let i;
    if (a < 0x7FE0) {
        u = 0x1FF
        if (a < 0x7800) {
            i = 9
            n = 0
        } else {
            u = 0x1F
            i = 5
            n = 1
            a -= 0x7800
        }
    } else {
        i = 3
        n = 2
        a -= 0x7FE0
    }
    const t0 = angle_data[n][a >> i]
    const t1 = angle_data[n][(a >> i) + 1]
    return t0 - (((t0 - t1) * (a & u)) >> i)
}

function getStickAngle_subda0(a) {
    let u = getStickAngle_subd20(Math.abs(a))
    if (a < 0) {
        u = 0xFFFF - u;
    }
    return u & 0xFFFF;
}

function getStickAngle_sub(a) {
    let s;
    if (a >= 1) {
        s = 0x7FFF;
    } else if (a <= -1) {
        s = -0x7FFF;
    } else {
        s = a * 32767;
    }
    u = getStickAngle_subda0(parseInt(s));
    return (u * Math.PI) / 65535;
}

function getStickAngle(y, x) {
    if (y == 0) {
        return x >= 0 ? 0 : Math.PI;
    } else if (x == 0) {
        return y <= 0 ? (Math.PI * 1.5) : (Math.PI / 2);
    }
    let f = Math.sqrt((y * y) + (x * x))
    if (x < y) {
        f = getStickAngle_sub(x / f);
        if (y < 0) {
            f = (2 * Math.PI) - f;
        }
    } else {
        f = getStickAngle_sub(y / f);
        f = (Math.PI / 2) - f;
        if (x < 0) {
            f = Math.PI - f;
        }
        if (f < 0) {
            f += (2 * Math.PI);
        }
    }
    return f;
}

SLOPE_TOLERANCES = [
    0x5A, 0x35, 0x2D, 0x2D,
    0x35, 0x2D, 0x5A, 0x5A,
    0x5A, 0x35, 0x4B, 0x4B,
    0x50, 0x00, 0x00, 0x14,
    0x19, 0x4B, 0x4B,
]

SLOPE_DIVISORS = [
    0x0001, 0x0020, 0x0020, 0x0020,
    0x0020, 0x0020, 0x0400, 0x0400,
    0x0400, 0x0020, 0x0008, 0x0010,
    0x0004, 0x0010, 0x0400, 0x0020,
    0x0020, 0x0008, 0x0008,
]

function willSlip(coord_set, floor_type = 1, is_ostanding = false) {
    const dx1 = coord_set[1][0] - coord_set[0][0];
    const dx2 = coord_set[2][0] - coord_set[0][0];
    const dy1 = coord_set[1][1] - coord_set[0][1];
    const dy2 = coord_set[2][1] - coord_set[0][1];
    const dz1 = coord_set[1][2] - coord_set[0][2];
    const dz2 = coord_set[2][2] - coord_set[0][2];
    const a1 = dy2 * dz1 - dy1 * dz2;
    const a2 = dz2 * dx1 - dz1 * dx2;
    const a3 = dx2 * dy1 - dx1 * dy2;
    const a = Math.sqrt((a1 * a1) + (a3 * a3));
    if (a < 0.01) {
        return "NonSlippery";
    }
    const cap = parseInt((getStickAngle(Math.abs(a2), a) / Math.PI) * 2048);
    if (is_ostanding) {
        floor_type = 16
    }
    const slope_tolerance = SLOPE_TOLERANCES[floor_type];
    const delta = 0x400 - cap;
    const dec_rate = parseInt(delta / SLOPE_DIVISORS[floor_type]);
    if (cap < parseInt((slope_tolerance << 0xC) / 0x168)) {
        if (dec_rate == 0) {
            return "PersistSlip";
        }
        return "Slippery";
    }
    return "NonSlippery";
}

function sub(a, b) {
    return [
        a[0] - b[0],
        a[1] - b[1],
        a[2] - b[2],
    ];
}

function cross(a, b) {
    return [
        a[1]*b[2] - a[2]*b[1],
        a[2]*b[0] - a[0]*b[2],
        a[0]*b[1] - a[1]*b[0]
    ];
}

function length(v) {
    return Math.hypot(v[0], v[1], v[2]);
}

function normalize(v) {
    const len = length(v);
    return [v[0]/len, v[1]/len, v[2]/len];
}


function wallYaw(v1, v2, v3) {
    // Compute all three edges
    const e1 = sub(v2, v1);
    const e2 = sub(v3, v1);
    const n = cross(e1, e2);
    const normal = normalize(n);
    const angle = Math.atan2(normal[2], normal[0]) * (180 / Math.PI);
    return 180 - angle; // radians
}

function willPhaseInternal(angle0, angle1, test_angle) {
    if (angle1 < angle0) {
        if ((angle0 < test_angle) || (test_angle <= angle1)) {
            return true;
        }
    } else {
        if ((angle0 < test_angle) && (test_angle <= angle1)) {
            return true;
        }
    }
    return false;
}

function willPhase(wall_angle, test_angle, flip) {
    angle0 = wall_angle - 0x400;
    angle1 = wall_angle + 0x400;
    if (flip) {
        return willPhaseInternal(angle1, angle0, test_angle);
    }
    return willPhaseInternal(angle0, angle1, test_angle);
}

function createTriangle(coord_set_0, coord_set_1, coord_set_2, properties, sfx, brightness, unk17, table, dump_mode, rgba = null, angle=null, is_fake_wall_0=null) {
    let data = {
        coords: [coord_set_0, coord_set_1, coord_set_2],
        properties: properties.toString(16),
        is_wall: table == 2,
        is_floor: table == 3,
        sfx: sfx,
        brightness: brightness,
        unk17: unk17,
        has_unused_floor: false,
        has_unused_wall: false,
        rgba: rgba,
    }
    if (table == 3) { // Is Floor
        data.floor_dump_mode = dump_mode
        if (dump_mode == "floors") {
            data.is_void = (properties & 0x4000) != 0
            data.is_nonsolid = (properties & 0x800) != 0
            data.is_damage = (properties & 0x40) != 0
            data.is_instadeath = (properties & 0x10) != 0
            data.is_water = (properties & 0x1) != 0
        } else if (["slip", "slip_forceostandslip"].includes(dump_mode)) {
            coord_set = (coord_set_0, coord_set_1, coord_set_2)
            data.force_slip = willSlip(data.coords, sfx >> 8, false) == "Slippery";
            data.persist_slip = willSlip(data.coords, sfx >> 8, false) == "PersistSlip";
            data.ostand_slip = willSlip(data.coords, sfx >> 8, dump_mode == "slip") == "Slippery";
        } else if (dump_mode == "enum_floors") {
            data.enumerable_type = sfx >> 8
        } else if (dump_mode == "voids") {
            data.is_void = (properties & 0x4000) != 0
        }
        if ((properties & 0xB7AE) != 0) {
            data.has_unused_floor = true;
        }
    }
    if (table == 2) {
        // if used_version == Version.lodgenet:
        //     # Why was this changed?
        //     self.is_solid = (properties & 0xC0) == 0xC0
        // else:
        data.is_solid = (properties & 0x418) != 0;
        data.wall_dump_mode = dump_mode;
        if (((properties & 0xFFEF) == 0) && [0x418, 0x8].includes(properties)) {
            data.has_unused_wall = true;
        }
        if (dump_mode == "phase") {
            data.h_angle = wallYaw(coord_set_0, coord_set_1, coord_set_2);
            data.phase_strength = 0;
            if (data.h_angle > 0) {
                if (data.h_angle <= 135) {
                    data.phase_strength = 2;
                } else if (data.h_angle < 150) {
                    data.phase_strength = 1;
                }
            }
            /*
            data.phase_strength = 0;
            if (angle !== null) {
                // 0
                ivar1 = coord_set_0[1] - coord_set_1[1];
                ivar2 = coord_set_0[2] - coord_set_2[2];
                ivar4 = coord_set_0[0] - coord_set_2[0];
                ivar6 = coord_set_0[0] - coord_set_1[0];
                ivar7 = coord_set_0[2] - coord_set_1[2];
                ivar3 = coord_set_0[1] - coord_set_2[1];
                unk0 = (ivar1 * ivar2) - (ivar7 * ivar3);
                // 8
                unk8 = (ivar7 * ivar4) - (ivar6 * ivar2);
                // 10
                unk10 = (ivar6 * ivar3) - (ivar1 * ivar4);
                // Final
                uvar9 = unk8 * coord_set_1[1];
                uvar11 = unk0 * coord_set_1[0];
                uvar12 = unk10 * coord_set_1[2];
                uvar5 = uvar12 + uvar11 + uvar9
                unk18 = ~uvar5;
                temp0 = unk0;
                temp8 = unk8;
                temp10 = unk10;
                ivar4 = (unk0 * coord_set_2[0]) + (unk8 * coord_set_2[1]) + (unk10 * coord_set_2[2]) + unk18;
                console.log(angle, is_fake_wall_0, unk18, ivar4)
                let flip = false;
                if (unk18 >= 1) {
                    if (ivar4 <= -1) {
                        flip = true;
                    }
                } else if (ivar4 >= 1) {
                    flip = true;
                }
                if (is_fake_wall_0) {
                    flip = !flip;
                }
                if (flip) {
                    console.log("Treating as flipped")
                }
                for (let i = 0; i < 2047; i++) {
                    if (willPhase(angle, 4096 + i, flip)) {
                        data.phase_strength = 2;
                    }
                }
            }
            */
        }
    }
    return data;
}
window.createTriangle = createTriangle;

function dumpTris(buffer, count, table_index, mode, map_id) {
    let start = 8;
    let meshes = [];
    for (let i = 0; i < count; i++) {
        if (start >= buffer.length) {
            continue;
        }
        let mesh = [];
        let ref = start - 4;
        let block_end = window.readFile(buffer, ref, 4);
        ref += 4;
        let block_count = parseInt((block_end - start) / 0x18);
        for (let tri_index = 0; tri_index < block_count; tri_index++) {
            let coord_set = [
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ]
            for (let cs = 0; cs < 3; cs++) {
                let points = [];
                for (let p = 0; p < 3; p++) {
                    let val = window.readFile(buffer, ref, 2);
                    ref += 2;
                    if (val > 0x7FFF) {
                        val -= 0x10000;
                    }
                    val /= collision_info[table_index].divisor;
                    points.push(val);
                }
                for (let y = 0; y < 3; y++) {
                    if (table_index == 3) {
                        coord_set[y][cs] = points[y]
                    } else if (table_index == 2) {
                        coord_set[cs][y] = points[y]
                    }
                }
            }
            angle = null;
            is_fake_wall_0 = null;
            if (table_index == 3) {
                properties = window.readFile(buffer, ref, 2);
                ref += 2;
                sfx = window.readFile(buffer, ref, 2);
                ref += 2;
                brightness = window.readFile(buffer, ref, 1);
                ref += 1;
                unk17 = window.readFile(buffer, ref, 1);
                ref += 1;
            } else if (table_index == 2) {
                angle = window.readFile(buffer, ref, 2);
                ref += 2;
                is_fake_wall_0 = window.readFile(buffer, ref, 1);
                ref += 1;
                is_fake_wall_1 = window.readFile(buffer, ref, 1);
                ref += 1;
                properties = window.readFile(buffer, ref, 2);
                ref += 2;
                sfx = 0
                brightness = 0
                unk17 = 0
            }
            let allow_mesh_population = false;
            if (!["slip", "enum_floors"].includes(mode)) {
                allow_mesh_population = true;
            }
            if (triangleNormalFacing(coord_set) == "Up" && (properties & 0x4811) == 0) {
                allow_mesh_population = true
            }
            let applied_mode = mode
            if (mode == "slip" && [0xB7, 0x97].includes(map_id)) {
                applied_mode = "slip_forceostandslip"
            }
            if (allow_mesh_population) {
                for (let ci = 0; ci < 3; ci++) {
                    for (let cj = 0; cj < 3; cj++) {
                        coord_set[ci][cj] *= window.getScale(map_id);
                    }
                }
                const tri = createTriangle(coord_set[0], coord_set[1], coord_set[2], properties, sfx, brightness, unk17, table_index, applied_mode, null, angle, is_fake_wall_0);
                if ((mode !== "voids") || (tri.is_void)) {
                    mesh.push(tri);
                }
            }
        }
        meshes.push(mesh)
        start = block_end + 4;
    }
    let global_mesh = [];
    meshes.forEach(mesh => {
        global_mesh = global_mesh.concat(mesh);
    })
    return global_mesh;
}