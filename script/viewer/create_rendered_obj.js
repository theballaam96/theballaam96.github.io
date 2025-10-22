function renderHandler(reset_camera) {
    const map_id = parseInt(document.getElementById("map_id_selector").value);
    const bg_id = document.getElementById("bg_selector").value;
    let obj = null;
    if (bg_id == "geo") {
        obj = window.generateGeometry(map_id);
    } else {
        const tris = window.getCollisionTris(map_id, bg_id);
        obj = trisToObj(tris);
    }
    console.log(obj)
    if (obj !== null && obj.length > 0) {
        window.loadOBJ(obj, reset_camera);
    }
}
window.renderHandler = renderHandler;

function trisToObj(tris) {
    coordinate_order = [0, 1, 2]
    obj_file_text = ""
    tris.forEach(tri => {
        for (let x = 0; x < 3; x++) {
            obj_file_text += `v ${tri.coords[x][0]} ${tri.coords[x][1]} ${tri.coords[x][2]} ${window.getColorString(tri)}\n`
        }
    })
    obj_file_text += 'o MyObject\n';
    
    for (let i = 1; i < ((tris.length * 3) + 1); i += 3) {
        obj_file_text += `f ${i} ${i + 1} ${i + 2}\n`
    }
    return obj_file_text;
}