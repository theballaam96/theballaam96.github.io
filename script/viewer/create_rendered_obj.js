function parseViews(map_id) {
    const views = window.allViews(map_id);
    let output = [];
    views.forEach(view => {
        if (view.shape == "cylinder") {
            const geometry = new THREE.CylinderGeometry(view.radius, view.radius, view.height, 32);
            const material = new THREE.MeshStandardMaterial({
                color: view.color,
                transparent: true,
                opacity: 0.5,
            })
            const cyl = new THREE.Mesh(geometry, material);
            cyl.position.set(view.coords[0], view.coords[1] + (view.height / 2), view.coords[2]);
            output.push(cyl);
        } else if (view.shape == "sphere") {
            const geometry = new THREE.SphereGeometry(view.radius, 32, 32);
            const material = new THREE.MeshStandardMaterial({
                color: view.color,
                transparent: true,
                opacity: 0.5,
            })
            const sph = new THREE.Mesh(geometry, material);
            sph.position.set(view.coords[0], view.coords[1], view.coords[2]);
            output.push(sph);
        } else if (view.shape == "path") {
            let points = [];
            view.path.forEach(p => {
                points.push(new THREE.Vector3(p.coords[0], p.coords[1], p.coords[2]));
            })
            const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.1); 
            const geometry = new THREE.TubeGeometry(curve, 100, view.thickness, 8, false);
            const material = new THREE.MeshStandardMaterial({
                color: view.color,
            })
            const line = new THREE.Mesh(geometry, material);
            output.push(line);
        }
    })
    return output;
}

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
    if (obj !== null && obj.length > 0) {
        window.loadOBJ(obj, reset_camera);
    }
    const additions = parseViews(map_id);
    window.addToScene(additions);
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