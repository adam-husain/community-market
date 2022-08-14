let user = false
const oReq = new XMLHttpRequest()
oReq.onload = function () {
    const response = this.responseText
    if (response.toLowerCase().startsWith('false')) {
        window.location.href = 'accounts.html';
    } else {
        user = JSON.parse(response)
    }
};
session = getCookie('session')
oReq.open("get", "http://myresidence.shop/smr/server/checkSession.php?session=" + session, false)
oReq.send()

window.addEventListener('load', async () => {
    await waitFor(_ => user !== false)
    onLogin(user)
})