const misc_scales = {
    0: 1,  // Test Map
    29: 1,  // Power Shed
    31: 1,  // K Rool's ship
    37: 1,  // Japes Blast
    41: 1,  // Aztec Blast
    44: 1,  // Treasure Chest
    45: 1,  // Mermaid Palace
    54: 1,  // Galleon Blast
    171: 1,  // DK's House
    188: 1,  // Fungi Blast
};
function getScale(map_id) {
    return misc_scales[map_id] ?? 3;
}
window.getScale = getScale;