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
            const urlParams = new URLSearchParams(window.location.search)


            // Filter residences if necessary
            const residenceSmr = urlParams.get('smr') != null
            const residenceNadayu = urlParams.get('nadayu') != null
            let finalArray = []
            if (residenceSmr) {
                document.getElementById('smrCheck').checked = true
                const prodSmr = products.filter(p => p['residence'] == RESIDENCE.SMR)
                finalArray.concat(prodSmr)
            }
            if (residenceNadayu) {
                document.getElementById('nadayuCheck').checked = true
                const prodNadayu = products.filter(p => p['residence'] == RESIDENCE.Nadayu)
                finalArray.concat(prodNadayu)
            }
            if (finalArray.length !== 0) products = finalArray


            // Sort products
            const sortBy = urlParams.get('sort')
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


            // Show pagination if necessary
            const length = products.length
            const paginationLimit = 12
            if (length > paginationLimit) {
                let page = parseInt(urlParams.get('page'))
                if (isNaN(page)
                    || page > parseInt(length / paginationLimit) + 1
                    || page <= 0)
                    page = 1
                showPagination((page - 1) * paginationLimit, page * paginationLimit, length / paginationLimit)
            }


            displayProducts()
        }
    };
    oReq.open("get", "http://myresidence.shop/server/product.php?action=all", true)
    oReq.send()

})

function displayProducts() {
    const body = document.getElementById('product-list')

    if (products.length === 0) {
        document.getElementById('emptyPrompt').style.display = 'block';
    }
    else {
        products.map((p, i) => {
            const imageUrl = 'http://myresidence.shop/img/products/' + p['image_url'];
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

function showPagination(start, end, total) {
    products = products.slice(start, end)
    document.getElementById('page-nav').style.display = 'block'
    const pagination = document.getElementById('page-nav-buttons')
    pagination.innerHTML += `<li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>`
    for (let i = 1; i <= total + 1; i++) {
        pagination.innerHTML += `<li class="page-item"><a class="page-link" href="javascript:addUrlParam('page', ${i})">${i}</a></li>`
    }
    pagination.innerHTML += `<li class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>`
}
