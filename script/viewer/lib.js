const misc_scales = {
    0: 1,  // Test Map
    45: 1,  // Mermaid Palace
};
function getScale(map_id) {
    return misc_scales[map_id] ?? 3;
}
window.getScale = getScale;