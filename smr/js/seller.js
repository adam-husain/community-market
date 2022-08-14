let products = []
function onLogin(user) {
    setTimeout(function () {
        document.getElementById("fadein")?.remove()
    }, 1000)

    displayUser(user)
    getProducts(user['id'])
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
    oReq.open("get", "http://myresidence.shop/smr/server/product.php?action=user&id=" + userId, true)
    oReq.send()
}

function displayProducts() {
    const body = document.getElementById('product-list')
    products.map((p) => {
        const imageUrl = 'http://myresidence.shop/smr/img/products/' + p['image_url'];
        const price = toString(parseFloat(p['price']) / 100)
        body.innerHTML += getCardLayout(p['id'], p['name'], p['description'], imageUrl, price)
    })
}