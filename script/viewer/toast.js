const icon_mappings = {
    "success": "circle-check",
    "success-subtle": "circle-check",
    "info": "circle-info",
    "info-subtle": "circle-info",
    "danger": "circle-xmark",
    "danger-subtle": "circle-xmark",
    "warning": "circle-exclamation",
    "warning-subtle": "circle-exclamation",
};
let intervals = {};
let moveIntervals = {};
let popovers = {};

function generateUUID() {
    // UUIDv4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> (c / 4)).toString(16)
    );
}

function createToast(message, color_scheme, button = null, strip = false, progress = true, toastDuration=5000) {
    const hook = document.getElementById("toastContainer");
    if (!strip) {
        if (icon_mappings[color_scheme]) {
            // Add icon at start of message
            message = `<span class="me-2"><i class="fa-solid fa-${icon_mappings[color_scheme]} fa-xl"></i></span>${message}`
        }
    }
    const converse_style = color_scheme.includes("-subtle") ? color_scheme.replace("-subtle", "") : `${color_scheme}-subtle`;
    const uuid = generateUUID();
    hook.insertAdjacentHTML('beforeend', `<div class="toast align-items-center bg-${color_scheme} text-light border-0" role="alert" aria-live="assertive" aria-atomic="true" uuid="${uuid}" data-bs-delay="${toastDuration}">
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            ${button ? `
                <button class="btn btn-${button.cls} btn-sm my-2" id="btn-${uuid}" data-bs-toggle="popover" data-bs-title="${button.text}" data-bs-content="${button.popup}">${button.text}</button>    
            ` : ''}
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        ${progress ? `<div class="d-flex prog" style="height: 2px">
            <div class="bg-${converse_style} filled" style="width: 100%">
            </div>
            <div class="bg-${color_scheme} empty" style="width: 0%">
            </div>
        </div>` : ''}
    </div>`);
    if (button) {
        popovers[uuid] = new bootstrap.Popover(document.getElementById(`btn-${uuid}`));
    }
    const toasts = hook.getElementsByClassName("toast");
    const latest_toast = toasts[toasts.length - 1];
    bootstrap.Toast.getOrCreateInstance(latest_toast).show();
    let anim_dur = 150;
    if (progress) {
        let duration = toastDuration + anim_dur;
        intervals[uuid] = setInterval(() => {
            const prog = latest_toast.getElementsByClassName("prog")[0];
            const filled = prog.getElementsByClassName("filled")[0];
            let width = parseInt(filled.style.width.replace("%",""));
            width--;
            filled.style.width = `${width}%`;
            prog.getElementsByClassName("empty")[0].style.width = `${100 - width}%`;
        }, parseInt(duration / 100));
        setTimeout(() => {
            clearInterval(intervals[uuid]);
        }, duration);
    }
    let shift_y = 37;
    let shift_y_prog = shift_y;
    setTimeout(() => {
        moveIntervals[uuid] = setInterval(() => {
            shift_y_prog--;
            latest_toast.style.transform = `translateY(${shift_y_prog}px)`;
        }, parseInt(anim_dur / shift_y));
        setTimeout(() => {
            latest_toast.style.transform = "translateY(0px)";
            clearInterval(moveIntervals[uuid]);
        }, anim_dur);
    }, anim_dur);
    setTimeout(() => {
        shift_y_prog = 0;
        moveIntervals[uuid] = setInterval(() => {
            shift_y_prog++;
            latest_toast.style.transform = `translateY(${shift_y_prog}px)`;
        }, parseInt(anim_dur / shift_y));
        setTimeout(() => {
            if (button) {
                popovers[uuid].hide();
            }
            clearInterval(moveIntervals[uuid]);
            bootstrap.Toast.getOrCreateInstance(latest_toast).hide();
        }, anim_dur);
    }, toastDuration + anim_dur);
}
window.createToast = createToast;