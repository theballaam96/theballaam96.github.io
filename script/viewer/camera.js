let pitch = 0, yaw = 0;
const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
};
let speed = 5;
const min_speed = 0.1;
const max_speed = 20;

function enableMouseMove(e) {
    if (e.which == 1) {
        document.addEventListener('mousemove', wasdMouse);
    }
}

function disableMouseMove(e) {
    if (e.which == 1) {
        document.removeEventListener('mousemove', wasdMouse);
    }
}

let scroll_fade_timeout = null;

function wasdScroll(e) {
    const delta = e.deltaY / 1000;
    speed -= delta;
    if (speed < min_speed) {
        speed = min_speed;
    } else if (speed > max_speed) {
        speed = max_speed;
    }
    const rate = (speed - min_speed) / (max_speed - min_speed);
    const fill = parseInt(rate * 100);
    const non_fill = 100 - fill;
    document.getElementById("scroll_fill").style.width = `${fill}%`;
    document.getElementById("scroll_empty").style.width = `${non_fill}%`;
    const disp_speed = parseInt(speed * 10) / 10;
    document.getElementById("scroll_text").innerText = `Camera Speed: ${disp_speed}`;
    document.getElementById("scroll_container").style.opacity = 1;
    if (scroll_fade_timeout) {
        clearTimeout(scroll_fade_timeout);
    }
    scroll_fade_timeout = setTimeout(() => {
        document.getElementById("scroll_container").style.opacity = 0;
        scroll_fade_timeout = null;
    }, 5000);
}

function setControls(wasd = false) {
    controls.enabled = !wasd;
    if (wasd) {
        const q = camera.getWorldQuaternion(new THREE.Quaternion());
        const e = new THREE.Euler().setFromQuaternion(q, "YXZ");
        yaw   = e.y;
        pitch = e.x;
        pitch = Math.max(-Math.PI/2, Math.min(Math.PI/2, pitch));
        keys.w = false;
        keys.a = false;
        keys.s = false;
        keys.d = false;
        document.exitPointerLock();
        document.addEventListener("mouseup", disableMouseMove);
        document.addEventListener("mousedown", enableMouseMove);
        document.addEventListener("keydown", wasdKeyDown);
        document.addEventListener("keyup", wasdKeyUp);
        document.addEventListener("wheel", wasdScroll);
    } else {
        camera.rotation.set(pitch, yaw, 0, "YXZ");
        if (renderHandler.domElement) {
            renderHandler.domElement.requestPointerLock();
        }
        document.removeEventListener("mouseup", disableMouseMove);
        document.removeEventListener("mousedown", enableMouseMove);
        document.removeEventListener("keydown", wasdKeyDown);
        document.removeEventListener("keyup", wasdKeyUp);
        document.removeEventListener("wheel", wasdScroll);
        disableMouseMove();
    }
}

window.setControls = setControls;

const clock = new THREE.Clock();

function updateWASD() {
    const delta = clock.getDelta();
    const map_id = document.getElementById("bg_selector").value;
    const moveSpeed = delta * speed * (1000 / 3) * window.getScale(map_id);
    const forwardVector = new THREE.Vector3();
    const leftVector = new THREE.Vector3();
    camera.getWorldDirection(forwardVector);
    forwardVector.normalize();
    leftVector.copy(forwardVector).applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    leftVector.y = 0;
    if (keys.w) camera.position.addScaledVector(forwardVector, moveSpeed);
    if (keys.a) camera.position.addScaledVector(leftVector, moveSpeed);
    if (keys.s) camera.position.addScaledVector(forwardVector, -moveSpeed);
    if (keys.d) camera.position.addScaledVector(leftVector, -moveSpeed);

    // Apply rotation
    const newRotation = new THREE.Euler(
        pitch,       // X (Pitch)
        yaw,         // Y (Yaw)
        0,    // Z (Roll) - Keeping the existing roll
        'YXZ'           // The order in which the rotations are applied
    );

    // Apply this new Euler rotation to the camera object
    camera.setRotationFromEuler(newRotation);
}
window.updateWASD = updateWASD;

function wasdMouse(e) {
    if (!document.getElementById("wasd_controls").checked) {
        return;
    }
    const sensitivity = 0.005;
    yaw   -= e.movementX * sensitivity;
    pitch -= e.movementY * sensitivity;
    pitch = Math.max(-Math.PI/2, Math.min(Math.PI/2, pitch));
}

function wasdKeyDown(e) {
    if (keys[e.key] !== undefined) keys[e.key] = true;
}
function wasdKeyUp(e) {
    if (keys[e.key] !== undefined) keys[e.key] = false;
}


function toggleCamera() {
    const ortho = document.getElementById("ortho_camera").checked;
    // Save position & rotation so switching feels seamless
    const pos = camera.position.clone();
    const rot = camera.rotation.clone();

    // Switch camera reference
    camera = ortho ? orthoCamera : perspectiveCamera;
    camera.position.copy(pos);
    camera.rotation.copy(rot);

    // Update controls to track new camera
    controls.object = camera;
    controls.update();
}
window.toggleCamera = toggleCamera;