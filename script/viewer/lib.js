const misc_scales = {
    0: 1,  // Test Map
    29: 1,  // Power Shed
    31: 1,  // K Rool's ship
    37: 1,  // Japes Blast
    41: 1,  // Aztec Blast
    44: 1,  // Treasure Chest
    45: 1,  // Mermaid Palace
    54: 1,  // Galleon Blast
    89: 1,  // Rotating Room
    171: 1,  // DK's House
    188: 1,  // Fungi Blast
};
function getScale(map_id) {
    return misc_scales[map_id] ?? 3;
}
window.getScale = getScale;

function degToRad(deg) {
  return deg * Math.PI / 180;
}

function rotateAroundX([x, y, z], degrees) {
  const r = degToRad(degrees);
  const cos = Math.cos(r), sin = Math.sin(r);
  return [
    x,
    y * cos - z * sin,
    y * sin + z * cos
  ];
}

function rotateAroundY([x, y, z], degrees) {
  const r = degToRad(degrees);
  const cos = Math.cos(r), sin = Math.sin(r);
  return [
    x * cos + z * sin,
    y,
    -x * sin + z * cos
  ];
}

function rotateAroundZ([x, y, z], degrees) {
  const r = degToRad(degrees);
  const cos = Math.cos(r), sin = Math.sin(r);
  return [
    x * cos - y * sin,
    x * sin + y * cos,
    z
  ];
}

function rotateAxis(coords, degrees, axis) {
    switch (axis) {
        case 0:
            return rotateAroundX(coords, degrees);
        case 1:
            return rotateAroundY(coords, degrees);
        case 1:
            return rotateAroundZ(coords, degrees);
    }
    return coords;
}

function rotateObject(coords, rotation) {
    rotation.forEach((r, i) => {
        if (r != 0) {
            coords = rotateAxis(coords, r, i);
        }
    })
    return coords;
}
window.rotateObject = rotateObject;