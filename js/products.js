let products = []
window.addEventListener('load', () => {
    setTimeout(function () {
        document.getElementById("fadein")?.remove()
    }, 1000)

    const oReq = new XMLHttpRequest()
    oReq.onload = function () {
        const response = this.responseText
        //console.log(response)
        if (response.toLowerCase().startsWith('false')) {
            window.location.href = 'accounts.html?action=login&code=5';
        } else {
            products = JSON.parse(response)
            filterProducts()
        }
    };
    oReq.open("get", "http://myresidence.shop/server/product.php?action=all", true)
    oReq.send()

})

function filterProducts() {
    let filteredProds = []
    const urlParams = new URLSearchParams(window.location.search)

    // Filter residences if necessary
    let residenceSmr = getCookie('smr') === '1'
    let residenceNadayu = getCookie('nadayu') === '1'


    if (residenceSmr) {
        //document.getElementById('smrCheck').checked = true
        const prodSmr = products.filter(p => p['residence'] == RESIDENCE.SMR)
        filteredProds = filteredProds.concat(prodSmr)
    }
    if (residenceNadayu) {
        //document.getElementById('nadayuCheck').checked = true
        const prodNadayu = products.filter(p => p['residence'] == RESIDENCE.Nadayu)
        filteredProds = filteredProds.concat(prodNadayu)
    }

    // Sort products
    const sortBy = urlParams.get('sort')
    sortProducts(filteredProds, sortBy)


    // Show pagination if necessary
    const length = filteredProds.length
    const paginationLimit = 12
    if (length > paginationLimit) {
        let page = parseInt(urlParams.get('page'))
        if (isNaN(page)
            || page > parseInt(length / paginationLimit) + 1
            || page <= 0)
            page = 1
        showPagination(filteredProds, (page - 1) * paginationLimit, page * paginationLimit, length / paginationLimit)
    }

    displayProducts(filteredProds)
}

function sortProducts(prodArr, sortBy) {

    switch (sortBy) {
        case 'lprice':
            sortByLPrice(prodArr)
            break
        case 'hprice':
            sortByHPrice(prodArr)
            break
        case 'new':
            sortByNew(prodArr)
            break
        case 'old':
            sortByOld(prodArr)
            break
        default:
            sortByNew(prodArr)
    }
}

function displayProducts(products) {
    const body = document.getElementById('product-list')
    body.innerHTML = "";

    if (products.length === 0) {
        document.getElementById('emptyPrompt').style.display = 'block';
    }
    else {
        document.getElementById('emptyPrompt').style.display = 'none';
        products.map((p, i) => {
            const imageUrl = 'http://myresidence.shop/img/products/' + p['image_url'];
            body.innerHTML += getCardLayout(p['product_id'], p['title'], p['description'], imageUrl, p['price'], false)
        })
    }
}

function sortByLPrice(products) {
    document.getElementById('sort-text').innerText = "Lowest Price 📈"
    products.sort((a, b) =>
        (
            parseInt(a['price']) > parseInt(b['price']) ? 1 : -1
        )
    )
}

function sortByHPrice(products) {
    document.getElementById('sort-text').innerText = "Highest Price 📉"
    products.sort((a, b) =>
        (
            parseInt(a['price']) < parseInt(b['price']) ? 1 : -1
        )
    )
}

function sortByNew(products) {
    document.getElementById('sort-text').innerText = "Newest ⏳"
    products.sort((a, b) =>
        (
            a['submission_date'] < b['submission_date'] ? 1 : -1
        )
    )
}

function sortByOld(products) {
    document.getElementById('sort-text').innerText = "Oldest ⌛"
    products.sort((a, b) =>
        (
            a['submission_date'] > b['submission_date'] ? 1 : -1
        )
    )
}

function showPagination(products, start, end, total) {
    this.products = products.slice(start, end)
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

function selectResidence(residence) {
    const smr = document.getElementById('smrCheck').checked
    const nadayu = document.getElementById('nadayuCheck').checked

    switch (residence) {
        case 1:
            setCookie('smr', smr?'1':'0', 1000)
            break
        case 2:
            setCookie('nadayu', nadayu?'1':'0', 1000)
            break
        default:
            break
    }

    filterProducts()
}
