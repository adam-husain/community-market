function onLogin(user) {
    document.getElementById('userId').value = user['id'];

    const urlParams = new URLSearchParams(window.location.search)
    let code = urlParams.get('code')
    if (code == null) return

    switch (code) {
        case 0:
            showAlert('Login Successful', 'You will be redirected to Seller Portal')
            setTimeout(()=>window.location.href='seller.html', 1000)
            break
        case 1:
            showAlert('Invalid Product', 'Enter the correct product details')
            break
        default:
            showAlert('Server Error', 'Server has encountered an error. Try again later')
            break
    }
}

function showAlert(title, body) {
    document.getElementById('alert-title').innerText = title
    document.getElementById('alert-body').innerText = body
    $('#alert-modal').modal('show')
}