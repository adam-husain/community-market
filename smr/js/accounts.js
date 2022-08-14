let loginForm
let registerForm
window.addEventListener('load', () => {
    loginForm = document.getElementById('login-form')
    registerForm = document.getElementById('register-form')

    const urlParams = new URLSearchParams(window.location.search)
    const action = urlParams.get('action')
    let code = urlParams.get('code')
    if (code == null) code = 10

    if (action == null) {
        showSignIn()
        return
    }

    if (action === 'login') {
        showSignIn()
        switch (parseInt(code)) {
            case 0:
                showAlert('Login Successful', 'You will be redirected to Seller Portal')
                setTimeout(()=>window.location.href='seller.html', 1000)
                break
            case 1:
                showAlert('Cannot Login', 'Invalid Username or Password')
                break
            default:
                showAlert('Cannot Login', 'Server authentication error')
                break
        }
    }

    if (action === 'register') {
        showRegister()
        switch (parseInt(code)) {
            case 0:
                // Cannot reach here since server will log in when success register
                break
            case 1:
                showAlert('Invalid Username', 'Username must be between 5 to 20 characters and only include letters, dots (.) and underscore (_)')
                break
            case 2:
                showAlert('Invalid Password', 'Password must be longer than 6 characters')
                break
            case 3:
                showAlert('Invalid Whatsapp number', 'Whatsapp number must start with a \'+\' and longer than 5 digits')
                break
            case 4:
                showAlert('Username is taken', 'This username is already taken. Choose another one')
                break
            default:
                showAlert('Cannot Register', 'Server authentication error')
                break
        }
    }

})

function showAlert(title, body) {
    document.getElementById('alert-title').innerText = title
    document.getElementById('alert-body').innerText = body
    $('#alert-modal').modal('show')
}

function showSignIn() {
    loginForm.style.display = 'block'
    registerForm.style.display = 'none'
}

function showRegister() {
    loginForm.style.display = 'none'
    registerForm.style.display = 'block'
}