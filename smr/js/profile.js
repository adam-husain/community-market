function onLogin(user) {
    displayUser(user)

    $('#name').value = user['name']
    $('#pronouns').value = parseInt(user['pronouns'])
    $('#whatsapp').value = user['whatsapp']
}