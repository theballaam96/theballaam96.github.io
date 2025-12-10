const worker = new Worker('worker.js');

worker.onmessage = (e) => {
  if (e.data.progress !== undefined) {
    window.regenProcess = e.data.progress;
  } else if (e.data.done) {
    renderHandlerInternalDone(e.data.result);
  }
};

function _vec(p) {
  return (p instanceof THREE.Vector3) ? p.clone() : new THREE.Vector3(p[0], p[1], p[2]);
}

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
        } else if (view.shape == "cube") {
            const a = _vec(view.bounds[0]);
            const b = _vec(view.bounds[1]);

            const min = new THREE.Vector3(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
            const max = new THREE.Vector3(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));

            const size = new THREE.Vector3().subVectors(max, min); // width, height, depth
            const center = new THREE.Vector3().addVectors(min, max).multiplyScalar(0.5);

            const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
            const material = new THREE.MeshStandardMaterial({
                color: view.color,
                transparent: true,
                opacity: 0.5,
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.copy(center);
            mesh.extra = {
                name: view.name,
            }
            output.push(mesh);
        } else if (view.shape == "tprism") {
            // Create bottom/top versions of each vertex
            const p0b = new THREE.Vector3(view.tri[0][0], view.y[0], view.tri[0][2]);
            const p1b = new THREE.Vector3(view.tri[1][0], view.y[0], view.tri[1][2]);
            const p2b = new THREE.Vector3(view.tri[2][0], view.y[0], view.tri[2][2]);

            const p0t = new THREE.Vector3(view.tri[0][0], view.y[1], view.tri[0][2]);
            const p1t = new THREE.Vector3(view.tri[1][0], view.y[1], view.tri[1][2]);
            const p2t = new THREE.Vector3(view.tri[2][0], view.y[1], view.tri[2][2]);

            const pos = new Float32Array([
                // bottom triangle
                p0b.x, p0b.y, p0b.z,
                p1b.x, p1b.y, p1b.z,
                p2b.x, p2b.y, p2b.z,

                // top triangle (flipped for correct normal)
                p0t.x, p0t.y, p0t.z,
                p2t.x, p2t.y, p2t.z,
                p1t.x, p1t.y, p1t.z,

                // side 1
                p0b.x, p0b.y, p0b.z,
                p0t.x, p0t.y, p0t.z,
                p1t.x, p1t.y, p1t.z,

                p0b.x, p0b.y, p0b.z,
                p1t.x, p1t.y, p1t.z,
                p1b.x, p1b.y, p1b.z,

                // side 2
                p1b.x, p1b.y, p1b.z,
                p1t.x, p1t.y, p1t.z,
                p2t.x, p2t.y, p2t.z,

                p1b.x, p1b.y, p1b.z,
                p2t.x, p2t.y, p2t.z,
                p2b.x, p2b.y, p2b.z,

                // side 3
                p2b.x, p2b.y, p2b.z,
                p2t.x, p2t.y, p2t.z,
                p0t.x, p0t.y, p0t.z,

                p2b.x, p2b.y, p2b.z,
                p0t.x, p0t.y, p0t.z,
                p0b.x, p0b.y, p0b.z,
            ]);

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
            geometry.computeVertexNormals();

            const mat = new THREE.MeshStandardMaterial({
                color: view.color,
                transparent: true,
                opacity: 0.5,
                side: THREE.DoubleSide,
            });
            output.push(new THREE.Mesh(geometry, mat));
        } else if (view.shape == "plane") {
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array([
                // Triangle 1
                view.bounds[0][0], view.bounds[0][1], view.bounds[0][2],
                view.bounds[1][0], view.bounds[1][1], view.bounds[1][2],
                view.bounds[2][0], view.bounds[2][1], view.bounds[2][2],

                // Triangle 2
                view.bounds[2][0], view.bounds[2][1], view.bounds[2][2],
                view.bounds[3][0], view.bounds[3][1], view.bounds[3][2],
                view.bounds[0][0], view.bounds[0][1], view.bounds[0][2],
            ]);

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const material = new THREE.MeshBasicMaterial({
                transparent: true,
                color: view.color,
                opacity: 0.5,
                side: THREE.DoubleSide,
            });
            output.push(new THREE.Mesh(geometry, material));
        }
    })
    return output;
}

function generateBillboardMesh(obj_data, local_scale) {
    const cobj = obj_data.cobj;
    const width = cobj.width;
    const height = cobj.height;
    const frames = cobj.images.map(data => {
        const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
        texture.needsUpdate = true;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.encoding = THREE.sRGBEncoding;
        return texture;
    });
    const material = new THREE.MeshBasicMaterial({
        map: frames[0],
        transparent: true,
    });
    let scales = [cobj.x_size, cobj.y_size];
    scales[0] *= (obj_data.scale * local_scale);
    scales[1] *= (obj_data.scale * local_scale);
    const geometry = new THREE.PlaneGeometry(scales[0], scales[1]);
    const mesh = new THREE.Mesh(geometry, material);
    const y = (obj_data.coords[1] * local_scale) + (scales[1] / 2);
    mesh.position.set(obj_data.coords[0] * local_scale, y, obj_data.coords[2] * local_scale);
    return {
        currentFrame: 0,
        lastFrameTime: 0,
        frameInterval: cobj.speed,
        animated: frames.length > 1,
        material: material,
        frames: frames,
        mesh: mesh,
    }
}

function generateScreen(screen, local_scale) {
    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array([
        // Triangle 1
        screen[0].coords[0] * local_scale, screen[0].coords[1] * local_scale, screen[0].coords[2] * local_scale,
        screen[1].coords[0] * local_scale, screen[1].coords[1] * local_scale, screen[1].coords[2] * local_scale,
        screen[2].coords[0] * local_scale, screen[2].coords[1] * local_scale, screen[2].coords[2] * local_scale,

        // Triangle 2
        screen[2].coords[0] * local_scale, screen[2].coords[1] * local_scale, screen[2].coords[2] * local_scale,
        screen[3].coords[0] * local_scale, screen[3].coords[1] * local_scale, screen[3].coords[2] * local_scale,
        screen[0].coords[0] * local_scale, screen[0].coords[1] * local_scale, screen[0].coords[2] * local_scale,
    ]);

    // UVs must match quad corners (0–1 texture space)
    const uvs_raw = [
        (screen[0].uv[0] / 32) / 64, 1 - ((screen[0].uv[1] / 32) / 64),
        (screen[1].uv[0] / 32) / 64, 1 - ((screen[1].uv[1] / 32) / 64),
        (screen[2].uv[0] / 32) / 64, 1 - ((screen[2].uv[1] / 32) / 64),

        (screen[2].uv[0] / 32) / 64, 1 - ((screen[2].uv[1] / 32) / 64),
        (screen[3].uv[0] / 32) / 64, 1 - ((screen[3].uv[1] / 32) / 64),
        (screen[0].uv[0] / 32) / 64, 1 - ((screen[0].uv[1] / 32) / 64),
    ];
    const uvs = new Float32Array(uvs_raw);

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('uv',       new THREE.BufferAttribute(uvs, 2));

    const tex_data = window.texParserIA8(window.getFile(window.rom_bytes, window.rom_dv, 7, window.distant_screen_texture, false));
    const texture = new THREE.DataTexture(
        tex_data,
        64,
        64,
        THREE.RGBAFormat,
        THREE.UnsignedByteType
    );
    texture.needsUpdate = true;
    // texture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        color: 0x646464,
        side: THREE.DoubleSide,
    });

    return new THREE.Mesh(geometry, material);
}

function generateFluid(fluid, local_scale) {
    const fluid_tex_info = fluid.surface_info;
    const width = fluid_tex_info.texture.width;
    const height = fluid_tex_info.texture.height;
    const tex = window.getFile(window.rom_bytes, window.rom_dv, fluid_tex_info.texture.table, fluid_tex_info.texture.index, fluid_tex_info.texture.table !== 7);
    let palette = null;
    if (fluid_tex_info.palette) {
        const paltex = window.getFile(window.rom_bytes, window.rom_dv, fluid_tex_info.palette.table, fluid_tex_info.palette.index, fluid_tex_info.palette.table !== 7);
        palette = window.texParserRGBA5551(paltex, null);
    }
    const data = fluid_tex_info.loader(tex, palette); // fill this with RGBA values
    // 1. Create a DataTexture from the raw RGBA array
    const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
    texture.needsUpdate = true;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    const dx = Math.abs(fluid.coords[0][0] - fluid.coords[1][0]);
    const dz = Math.abs(fluid.coords[0][2] - fluid.coords[1][2]);
    const base_y = fluid.coords[0][1] * local_scale;
    const repeatX = Math.ceil(dx / width);
    const repeatY = Math.ceil(dz / height);
    texture.repeat.set(repeatX, repeatY);

    // Calculate segments
    const x0 = fluid.coords[0][0] * local_scale;
    const x1 = fluid.coords[1][0] * local_scale;
    const z0 = fluid.coords[0][2] * local_scale;
    const z1 = fluid.coords[1][2] * local_scale;
    const segment_size = fluid.dist_per_division * local_scale;
    const sizeX = Math.abs(x1 - x0);
    const sizeZ = Math.abs(z1 - z0);
    const segmentsX = Math.ceil(sizeX / segment_size);
    const segmentsZ = Math.ceil(sizeZ / segment_size);

    const geometry = new THREE.PlaneGeometry(sizeX, sizeZ, segmentsX, segmentsZ);
    geometry.rotateX(-Math.PI / 2);
    geometry.translate((x0 + x1) / 2, fluid.coords[0][1] * local_scale, (z0 + z1) / 2);

    // 3. Create a material that uses the texture
    const material = new THREE.MeshBasicMaterial({
        color: fluid.color,
        map: texture,
        side: THREE.DoubleSide,
        opacity: fluid.opacity / 255,
        transparent: true,
    });

    // 4. Combine into a mesh
    const quad = new THREE.Mesh(geometry, material);
    quad.userData = {
        geometry: geometry,
        positions: geometry.attributes.position,
        base_y: base_y,
        fluid_vars: fluid.fluid_vars,
        min_x: Math.min(x0, x1),
        min_z: Math.min(z0, z1),
        local_scale: local_scale,
    };
    return quad;
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
    const obj_mode_id = document.getElementById("obj_selector").value;
    const actor_mode_id = document.getElementById("actor_selector").checked;
    if (bg_id == "gaps") {
        document.getElementById("gaps_fyi").classList.remove("d-none");
    } else {
        document.getElementById("gaps_fyi").classList.add("d-none");
    }
    let obj = null;
    let gaps = [];
    let fluids = [];
    let screens = [];
    if (document.getElementById("fluid_selector").checked) {
        fluids = window.loadFluids(map_id);
    }
    if (document.getElementById("screen_selector").checked) {
        screens = window.getDistantScreens(map_id);
    }
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
    // Objects
    const objects = window.parseSetup(map_id, obj_mode_id, actor_mode_id);
    const local_scale = window.getScale(map_id);
    let billboards = [];
    let objects_obj_files = objects.map(o => {
        let local_tris = [];
        if (o.mode == "geo") {
            if (o.cobj) {
                // Billboard
                billboards.push(generateBillboardMesh(o, local_scale));
                return null;
            } else {
                // Standard Object
                let lines = o.obj.split("\n");
                lines.forEach((line, lindex) => {
                    if (line.startsWith("v ")) {
                        let segs = line.split(" ");
                        let coords = [
                            parseFloat(segs[1]),
                            parseFloat(segs[2]),
                            parseFloat(segs[3]),
                        ];
                        coords = window.rotateObject(coords, o.rotation).slice();
                        for (let j = 0; j < 3; j++) {
                            segs[j + 1] = ((coords[j] * o.scale) + o.coords[j]) * local_scale;
                        }
                        lines[lindex] = segs.join(" ");
                    }
                })
                return lines.join("\n");
            }
        }
        o.tris.forEach(tri => {
            for (let i = 0; i < 3; i++) {
                tri.coords[i] = window.rotateObject(tri.coords[i], o.rotation).slice();
                for (let j = 0; j < 3; j++) {
                    tri.coords[i][j] = ((tri.coords[i][j] * o.scale) + o.coords[j]) * local_scale;
                }
            }
            local_tris.push(JSON.parse(JSON.stringify(tri)));
        });
        return trisToObj(local_tris);
    }).filter(k => k !== null);
    if (billboards.length > 0) {
        window.addToSceneBillboards(billboards);
    }
    window.addObjects(objects_obj_files);
    // Markers
    const additions = parseViews(map_id);
    window.addToScene(additions);
    if (fluids.length > 0) {
        window.addToSceneFluids(fluids.map(f => generateFluid(f, local_scale)));
    }
    if (screens.length > 0) {
        window.addToSceneScreens(screens.map(f => generateScreen(f, local_scale)));
    }
    window.regenProcess = 100;
    if (regenInterval) {
        clearInterval(regenInterval);
        updateProgressText(true);
        regenInterval = null;
    }
}

function updateProgressText(force_clear) {
    // document.getElementById("progress_text").innerText = `${window.regenProcess}%`;
    if (window.regenProcess == 100 || force_clear) {
        // document.getElementById("progress_text").classList.add("d-none");
    }
}

function renderHandler(reset_camera) {
    window.regenProcess = 0;
    // document.getElementById("progress_text").classList.remove("d-none");
    updateProgressText();
    let regenInterval = setInterval(() => {
        updateProgressText();
    }, 200);
    setTimeout(() => {
        renderHandlerInternal(reset_camera, regenInterval);
    }, 201);
}
window.renderHandler = renderHandler;

function trisToObj(tris, obj_name="MyObject") {
    coordinate_order = [0, 1, 2]
    obj_file_text = ""
    tris.forEach(tri => {
        for (let x = 0; x < 3; x++) {
            obj_file_text += `v ${tri.coords[x][0]} ${tri.coords[x][1]} ${tri.coords[x][2]} ${window.getColorString(tri)}\n`
        }
    })
    obj_file_text += `o ${obj_name}\n`;
    
    for (let i = 1; i < ((tris.length * 3) + 1); i += 3) {
        obj_file_text += `f ${i} ${i + 1} ${i + 2}\n`
    }
    return obj_file_text;
}