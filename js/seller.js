let products = []
function onLogin(user) {
    setTimeout(function () {
        document.getElementById("fadein")?.remove()
    }, 1000)

    displayUser(user)
    getProducts(user['user_id'])
}

function getProducts(userId) {
    const oReq = new XMLHttpRequest()
    oReq.onload = function () {
        const response = this.responseText
        if (response.toLowerCase().startsWith('false')) {
            window.location.href = 'accounts.html?action=login&code=5';
        } else {
            products = JSON.parse(response)
            displayProducts()
        }
    };
    oReq.open("get", "http://myresidence.shop/server/product.php?action=user&userId=" + userId, true)
    oReq.send()
}

function displayProducts() {
    const body = document.getElementById('product-list')

    if (products.length === 0) {
        document.getElementById('emptyPrompt').style.display = 'block';
    }
    else {
        products.map((p, i) => {
            const imageUrl = 'http://myresidence.shop/img/products/' + p['image_url'];
            const price = '' + (parseFloat(p['price']) / 100)
            body.innerHTML += getCardLayout(i, p['title'], p['description'], imageUrl, price, true)
        })
    }
}