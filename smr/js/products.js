let products = []
window.addEventListener('load', () => {
    setTimeout(function () {
        document.getElementById("fadein")?.remove()
    }, 1000)

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
    oReq.open("get", "http://myresidence.shop/smr/server/product.php?action=all", true)
    oReq.send()
})

function displayProducts() {
    const body = document.getElementById('product-list')

    if (products.length === 0) {
        document.getElementById('emptyPrompt').style.display = 'block';
    }
    else {
        products.map((p, i) => {
            const imageUrl = 'http://myresidence.shop/smr/img/products/' + p['image_url'];
            const price = '' + (parseFloat(p['price']) / 100)
            body.innerHTML += getCardLayout(i, p['name'], p['description'], imageUrl, price, false)
        })
    }
}