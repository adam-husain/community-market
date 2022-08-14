function onLogin(user) {
    displayUser(user)

    document.getElementById('name').value = user['name']
    document.getElementById('pronouns').value = parseInt(user['pronouns'])
    document.getElementById('whatsapp').value = user['whatsapp']

    document.getElementById('profile-form').action = 'server/profile.php?session=' + session;

    const urlParams = new URLSearchParams(window.location.search)
    let code = urlParams.get('code')
    if (code == null) return

    switch (parseInt(code)) {
        case 0:
            showAlert('Profile Updated', 'Your profile has been updated')
            break
        case 1:
            showAlert('Invalid Name', 'Please enter a proper name')
            break
        case 2:
            showAlert('Invalid Whatsapp number', 'Please enter a valid Whatsapp number')
            break
        default:
            showAlert('Database Error', 'Could not connect to database. Try again later')
    }
}