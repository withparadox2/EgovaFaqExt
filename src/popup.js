var KEY = 'key-android-redirect'
window.onload = function () {
    var enableRedirect = localStorage.getItem(KEY) != 'disable'
    var cb = document.querySelector('#cb-redirect')
    cb.checked = enableRedirect
    cb.addEventListener('change', function () {
        if (cb.checked) {
            localStorage.setItem(KEY, 'enable')
        } else {
            localStorage.setItem(KEY, 'disable')
        }
    })

}