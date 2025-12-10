function getRatioString(red, green, blue, alpha = 0xFF) {
    if (red > 255) {
        red = 255;
    }
    if (green > 255) {
        green = 255;
    }
    if (blue > 255) {
        blue = 255;
    }
    if (alpha > 255) {
        alpha = 255;
    }
    channels = [red, green, blue, alpha]
    return channels.map(c => {
        const res = (parseInt(c / 25.5) / 10).toString();
        if (c === "0") {
            return "0.0";
        } else if (c === "1") {
            return "1.0";
        } else {
            return res;
        }
    }).join(" ");
}

function getColorString(triangle) {
    if (triangle.is_gap) {
        return getRatioString(255, 0, 0);
    }
    if (triangle.is_floor) {
        if (triangle.floor_dump_mode == "floors") {
            if (triangle.is_void) {
                return getRatioString(0, 0, 0);
            }
            if (triangle.is_damage) {
                return getRatioString(122, 16, 19);
            }
            if (triangle.is_water) {
                return getRatioString(52, 168, 235);
            }
            if (triangle.is_instadeath) {
                return getRatioString(112, 16, 122);
            }
        } else if (["slip", "slip_forceostandslip"].includes(triangle.floor_dump_mode)) {
            if (triangle.force_slip) {
                if (!triangle.ostand_slip) {
                    return getRatioString(0x21, 0xB5, 0xB8)
                }
                return getRatioString(255, 0, 0)
            } else if (triangle.persist_slip) {
                return getRatioString(0x89, 0x32, 0xA8)
            }
        } else if (triangle.floor_dump_mode == "enum_floors") {
            if (triangle.enumerable_type == 2) {  // Dungeon/Tree floor detection. Also used in other maps????
                return getRatioString(240, 128, 128)
            } else if (triangle.enumerable_type == 3) {  // ?? - In painting/underground???
                return getRatioString(34, 139, 34)
            } else if (triangle.enumerable_type == 6) {  // Sloped surfaces?
                return getRatioString(50, 205, 50)
            } else if (triangle.enumerable_type == 10) {  // Kong floor reflection
                return getRatioString(240, 230, 140)
            } else if (triangle.enumerable_type == 17) {  // Bananas (for the meme slip)
                return getRatioString(127, 255, 212)
            } else if (triangle.enumerable_type == 18) {  // is at the start of caves beetle race
                return getRatioString(255, 140, 0)
            } else if (triangle.enumerable_type != 1) {  // Unknown format
                return getRatioString(255, 0, 0)
            }
        }
    }
    if (triangle.is_wall) {
        if (triangle.wall_dump_mode == "phase") {
            // return getRatioString(parseInt((triangle.h_angle / 360) * 255), 0, 0);
            if (triangle.phase_strength == 2) {
                return getRatioString(0, 255, 0);
            } else if (triangle.phase_strength == 1) {
                return getRatioString(0, 30, 0);
            } else {
                return getRatioString(255, 0, 0);
            }
        }
        if (triangle.is_solid) {
            return getRatioString(52, 235, 174);
        }
    }
    return getRatioString(255, 255, 255);
}

window.getColorString = getColorString;
window.getRatioString = getRatioString;