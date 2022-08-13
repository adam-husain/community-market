window.addEventListener('load', () => {

    const oReq = new XMLHttpRequest()
    oReq.onload = function () {
        const response = this.responseText
        if (response === 'false') {
            window.location.href = 'accounts.html';
        } else {
            const user = JSON.parse(response)
            onLogin(user)
        }
    };
    oReq.open("get",
        "http://myresidence.shop/smr/server/checkSession.php", false)
    oReq.send()
})

function onLogin(user) {
    setTimeout(function () {
        document.getElementById("fadein")?.remove()
    }, 1000)

    const userFrame = document.getElementById('user-frame')
    const id = user['id']
    userFrame.src = 'user.html?id=' + id
}