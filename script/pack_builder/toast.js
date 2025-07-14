// TOAST GENERATOR
const toastTrigger = document.getElementById('liveToastBtn')
const toastContainer = document.getElementById("toasts")

let toast_counter = 0;

function generateToast(message, error=false) {
    toastContainer.getElementsByClassName("toast-container")[0].innerHTML += `
    <div id="liveToast${toast_counter}" class="toast align-items-center ${error ? 'text-bg-danger' : 'text-bg-primary'} border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>                    
    </div>`
    const toastEl = document.getElementById(`liveToast${toast_counter}`)
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastEl)
    toastBootstrap.show()
    toast_counter += 1;
}
window.generateToast = generateToast;