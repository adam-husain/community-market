const oReq = new XMLHttpRequest()
oReq.onload = function () {
    const response = this.responseText
    if (response.toLowerCase().startsWith('false')) {
        window.location.href = 'accounts.html';
    } else {
        const user = JSON.parse(response)
        onLogin(user)
    }
};
session = getCookie('session')
oReq.open("get",
    "http://myresidence.shop/smr/server/checkSession.php?session=" + session, false)
oReq.send()

window.addEventListener('load', () => {


})

function onLogin(user) {
    setTimeout(function () {
        document.getElementById("fadein")?.remove()
    }, 1000)

    const userFrame = document.getElementById('user-frame')
    const id = user['id']
    userFrame.src = 'user.html?id=' + id
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}