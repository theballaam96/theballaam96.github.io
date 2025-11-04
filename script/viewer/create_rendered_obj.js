const worker = new Worker('worker.js');

worker.onmessage = (e) => {
  if (e.data.progress !== undefined) {
    window.regenProcess = e.data.progress;
  } else if (e.data.done) {
    renderHandlerInternalDone(e.data.result);
  }
};

function parseViews(map_id) {
    const views = window.allViews(map_id);
    let output = [];
    const local_scale = window.getScale(map_id);
    views.forEach(view => {
        if (view.shape == "cylinder") {
            let height = view.height;
            let y_offset = height / 2;
            if (view.infinite_y) {
                height = 2 * height;
                y_offset = 0;
            }
            const geometry = new THREE.CylinderGeometry(view.radius, view.radius, height, 32);
            const material = new THREE.MeshStandardMaterial({
                color: view.color,
                transparent: true,
                opacity: 0.5,
            })
            const cyl = new THREE.Mesh(geometry, material);
            cyl.position.set(view.coords[0], view.coords[1] + y_offset, view.coords[2]);
            cyl.extra = {
                name: view.name,
                shape: view.shape,
                coords: [
                    view.coords[0] / local_scale,
                    view.coords[1] / local_scale,
                    view.coords[2] / local_scale,
                ],
                infinite_y: view.infinite_y,
                infinite_h: view.infinite_h,
                radius: view.radius / local_scale,
                height: view.height / local_scale,
            };
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
            sph.extra = {
                name: view.name,
                shape: view.shape,
                coords: [
                    view.coords[0] / local_scale,
                    view.coords[1] / local_scale,
                    view.coords[2] / local_scale,
                ],
                radius: view.radius / local_scale,
            };
            output.push(sph);
        } else if (view.shape == "path") {
            if (view.path.length == 1) {
                // ThreeJS can't handle paths with just 1 point
                return;
            }
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
            line.extra = {
                name: view.name,
                shape: view.shape,
                path: view.path.map(p => {
                    return [p.coords[0] / local_scale, p.coords[1] / local_scale, p.coords[2] / local_scale]
                })
            };
            output.push(line);
        } else if (view.shape == "poly") {
            if (view.verts.length < 3) {
                // ThreeJS can't handle verts with less than 3 points
                return;
            }
            let vertices = view.verts.map(v =>
                v.isVector3 ? v.coords.clone() : new THREE.Vector3(...v.coords)
            );

            // Ensure polygon is closed
            if (!vertices[0].equals(vertices[vertices.length - 1])) {
                vertices.push(vertices[0].clone());
            }

            // Compute plane basis from first three distinct points
            const v0 = vertices[0];
            let i = 1;
            while (i < vertices.length && vertices[i].equals(v0)) i++;
            const v1 = vertices[i];
            let j = i + 1;
            while (j < vertices.length && new THREE.Vector3().subVectors(vertices[j], v0)
                .cross(new THREE.Vector3().subVectors(v1, v0)).lengthSq() < 1e-8) j++;
            const v2 = vertices[j];

            const xAxis = new THREE.Vector3().subVectors(v1, v0).normalize();
            const normal = new THREE.Vector3()
                .subVectors(v2, v0)
                .cross(new THREE.Vector3().subVectors(v1, v0))
                .normalize();
            const yAxis = new THREE.Vector3().crossVectors(normal, xAxis).normalize();

            // Project to 2D coordinates on the polygon's plane
            const local2D = vertices.map(v => {
                const rel = new THREE.Vector3().subVectors(v, v0);
                return new THREE.Vector2(rel.dot(xAxis), rel.dot(yAxis));
            });

            // Build a Shape for triangulation
            const shape = new THREE.Shape();
            shape.moveTo(local2D[0].x, local2D[0].y);
            for (let k = 1; k < local2D.length; k++) shape.lineTo(local2D[k].x, local2D[k].y);
            shape.closePath();

            // Triangulate and create geometry
            const geometry = new THREE.ShapeGeometry(shape);

            // Material and mesh
            const material = new THREE.MeshStandardMaterial({
                color: view.color,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.5,
                polygonOffset: true,
                polygonOffsetFactor: -1,  // push slightly toward camera
                polygonOffsetUnits: -1,
            });
            const mesh = new THREE.Mesh(geometry, material);

            // Transform the mesh from 2D plane space to 3D world space
            const mat = new THREE.Matrix4().makeBasis(xAxis, yAxis, normal);
            mat.setPosition(v0);
            mesh.applyMatrix4(mat);
            output.push(mesh);
        }
    })
    return output;
}

let loaded_gaps = {};

function resetGaps() {
    loaded_gaps = {};
}
window.resetGaps = resetGaps;
window.regenProcess = 0;

function renderHandlerInternal(reset_camera, regenInterval) {
    const map_id = parseInt(document.getElementById("map_id_selector").value);
    const bg_id = document.getElementById("bg_selector").value;
    if (bg_id == "gaps") {
        document.getElementById("gaps_fyi").classList.remove("d-none");
    } else {
        document.getElementById("gaps_fyi").classList.add("d-none");
    }
    let obj = null;
    let gaps = [];
    if (bg_id == "geo") {
        obj = window.generateGeometry(map_id);
    } else {
        let tris = window.getCollisionTris(map_id, bg_id);
        if (bg_id == "gaps") {
            if (loaded_gaps[map_id]) {
                gaps = loaded_gaps[map_id];
            } else {
                gaps = window.dumpGapTris(tris);
                loaded_gaps[map_id] = gaps;
            }
            // tris = gaps;
            tris = tris.concat(gaps);
        }
        obj = trisToObj(tris);
    }
    if (obj !== null && obj.length > 0) {
        window.loadOBJ(obj, reset_camera);
    }
    const additions = parseViews(map_id);
    window.addToScene(additions);
    window.regenProcess = 100;
    if (regenInterval) {
        clearInterval(regenInterval);
        updateProgressText(true);
        regenInterval = null;
    }
}

function updateProgressText(force_clear) {
    document.getElementById("progress_text").innerText = `${window.regenProcess}%`;
    if (window.regenProcess == 100 || force_clear) {
        document.getElementById("progress_text").classList.add("d-none");
    }
}

function renderHandler(reset_camera) {
    window.regenProcess = 0;
    document.getElementById("progress_text").classList.remove("d-none");
    updateProgressText();
    let regenInterval = setInterval(() => {
        updateProgressText();
    }, 200);
    setTimeout(() => {
        renderHandlerInternal(reset_camera, regenInterval);
    }, 201);
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