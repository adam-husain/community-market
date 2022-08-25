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

            // Sort products
            const urlParams = new URLSearchParams(window.location.search)
            const sortBy = urlParams.get('sort')
            console.log(sortBy)
            switch (sortBy) {
                case 'lprice':
                    sortByLPrice()
                    break
                case 'hprice':
                    sortByHPrice()
                    break
                case 'new':
                    sortByNew()
                    break
                case 'old':
                    sortByOld()
                    break
                default:
                    sortByNew()
            }

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
            body.innerHTML += getCardLayout(i, p['title'], p['description'], imageUrl, price, false)
        })
    }
}

function sortByLPrice() {
    document.getElementById('sort-text').innerText = "Lowest Price 📈"
    products.sort((a, b) =>
        (
            parseInt(a['price']) > parseInt(b['price']) ? 1 : -1
        )
    )
}

function sortByHPrice() {
    document.getElementById('sort-text').innerText = "Highest Price 📉"
    products.sort((a, b) =>
        (
            parseInt(a['price']) < parseInt(b['price']) ? 1 : -1
        )
    )
}

function sortByNew() {
    document.getElementById('sort-text').innerText = "Newest ⏳"
    products.sort((a, b) =>
        (
            a['submission_date'] < b['submission_date'] ? 1 : -1
        )
    )
}

function sortByOld() {
    document.getElementById('sort-text').innerText = "Oldest ⌛"
    products.sort((a, b) =>
        (
            a['submission_date'] > b['submission_date'] ? 1 : -1
        )
    )
}

