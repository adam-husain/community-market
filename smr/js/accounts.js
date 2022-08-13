let loginForm
let registerForm
window.addEventListener('load', () => {
    loginForm = document.getElementById('login-form')
    registerForm = document.getElementById('register-form')
    registerForm.style.display = 'none'
})

function showSignIn() {
    loginForm.style.display = 'block'
    registerForm.style.display = 'none'
}

function showRegister() {
    loginForm.style.display = 'none'
    registerForm.style.display = 'block'
}

function back() {
    window.location.href = 'products.html'
}