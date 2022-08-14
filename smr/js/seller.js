function onLogin(user) {
    setTimeout(function () {
        document.getElementById("fadein")?.remove()
    }, 1000)

    displayUser(user)
}
