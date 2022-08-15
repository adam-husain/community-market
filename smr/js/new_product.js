function onLogin(user) {
    document.getElementById('userId').value = user['id'];

    const urlParams = new URLSearchParams(window.location.search)
    let code = urlParams.get('code')
    if (code == null) return

    switch (parseInt(code)) {
        case 0:
            showAlert('Product Added', 'Your product will be listed for everyone to view')
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
