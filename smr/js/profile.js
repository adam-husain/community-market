function onLogin(user) {
    displayUser(user)

    document.getElementById('name').value = user['name']
    document.getElementById('pronouns').value = parseInt(user['pronouns'])
    document.getElementById('whatsapp').value = user['whatsapp']

    document.getElementById('profile-form').action = 'server/profile.php?session=' + session;
}