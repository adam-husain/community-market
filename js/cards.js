const MaxImagesAllowed = 5

function carouselChange(cardIndex, increment) {
    let currentImage = 0
    let maxImages = 0
    for (let i = 0; i < MaxImagesAllowed; i++) {
        const image = document.getElementById("image" + cardIndex + "." + i)
        if (image) {
            maxImages = i
            if (!image.classList.contains("hidden")) {
                currentImage = i
            }
        } else {
            break
        }
    }

    document.getElementById("image" + cardIndex + "." + currentImage).classList.add("hidden")
    document.getElementById("indicator" + cardIndex + "." + currentImage).classList.remove("selected")
    currentImage += increment
    if (currentImage > maxImages) {
        currentImage = 0
    }
    if (currentImage < 0) {
        currentImage = maxImages
    }


    document.getElementById("image" + cardIndex + "." + currentImage).classList.remove("hidden")
    document.getElementById("indicator" + cardIndex + "." + currentImage).classList.add("selected")
}

function getProduct(productId) {
    return products.find((p) => p['product_id'] == productId)
}

function like(cardIndex) {
    document.getElementById("like" + cardIndex).classList.add("hidden")
    document.getElementById("unlike" + cardIndex).classList.remove("hidden")
}

function unlike(cardIndex) {
    document.getElementById("like" + cardIndex).classList.remove("hidden")
    document.getElementById("unlike" + cardIndex).classList.add("hidden")
}

function toggleDesc(cardId) {
    const card = document.getElementsByClassName("product-" + cardId)[0]
    if (card.classList.contains("product-card-expanded")) {
        card.classList.remove("product-card-expanded")
    } else {
        card.classList.add("product-card-expanded")
    }
}

function promptDelete(cardId) {
    const product = getProduct(cardId)
    document.getElementById('deleteModalLabel').innerHTML = 'Delete <b>' + product['title'] + '</b>';
    document.getElementById('deleteButton').onclick = () => confirmDelete(product['product_id']);
}

function promptReport(cardIndex) {
    const product = getProduct(cardIndex)
    const id = product['product_id'];
    const title = product['title'];
    document.getElementById('reportModalBody').innerHTML = `You have reported <b>${title}</b>. Please don't spam reports. ` +
        "Reporting does not guarantee being taken down. That decision will be left to my discretion."
    document.getElementById('reportButton').onclick = () => confirmReport(id)
}

function confirmDelete(prodId) {
    const oReq = new XMLHttpRequest()
    oReq.onload = function () {
        window.location.reload()
    };
    oReq.open("get", "http://myresidence.shop/server/product.php?action=delete&session=" + session + "&product=" + prodId, true)
    oReq.send()
}

function confirmReport(prodId) {
    const oReq = new XMLHttpRequest()
    oReq.onload = function () {
        const reportToast = document.getElementById('reportToast')
        const toast = new bootstrap.Toast(reportToast)
        toast.show()
    };
    oReq.open("get", "http://myresidence.shop/server/product.php?action=report&product=" + prodId, true)
    oReq.send()
}

function contact(cardId) {
    const info = getProduct(cardId)
    const name = info['name']
    const title = info['title']
    const pronouns = ['', '', 'He/Him', 'She/Her', 'They/Them'][info['pronouns']]
    const number = info['whatsapp'].replace('+', '')
    const message = `Hello ${name}, I am interested in purchasing the item ${title} you have listed on the Residence Marketplace site.`
    const wa_url = encodeURI('http://wa.me/' + number + '?text=' + message)
    const image_url = 'http://myresidence.shop/img/profile/' + info['profile_url']
    document.getElementById('title').innerHTML = name + '<small>' + pronouns + '</small>'
    document.getElementById('contact').innerHTML = 'Contact: <a class="btn btn-primary" href="' + wa_url + '" target="_blank"><i class="fa fa-whatsapp"> ' + 'WhatsApp' + '</i></a>'
    document.getElementById('profile-pic').src = image_url;
}


function getCardLayout(id, title, desc, imageUrl, price, deletable = false) {
    let priceRM = 'RM ' + (parseFloat(price) / 100).toFixed(2)
    if (price === '0')
        priceRM = 'FREE'
    const imageId = 'image0.' + id;
    let cardHtml = `<div class="product-card product-${id}">` +
        `<div class="product-title">${title}</div><` +
        'div class="product-carousel">' +
        //'<button onclick="carouselChange(0, -1)" class="btn"><i class="fa fa-arrow-left"></i></button>' +
        `<img id="${imageId}" src="${imageUrl}" class="product-image" alt="Product">` +
        //'<button onclick="carouselChange(0, 1)" class="btn"><i class="fa fa-arrow-right"></i></button>' +
        '</div>' +
        '<div class="carousel-indicator">' +
        //'<div id="indicator0.0" class="indicator selected"></div>' +
        //'<div id="indicator0.1" class="indicator"></div>' +
        //'<div id="indicator0.2" class="indicator"></div>' +
        '</div>' +
        //`<button onclick="like(${id})" class="product-button"><i class="fa fa-heart-o"></i></button>` +
        //`<button onclick="unlike(${id})" class="product-button hidden"><i class="fa fa-heart"></i></button>` +
        `<button onclick="toggleDesc(${id})" class="product-button"><i class="fa fa-navicon icon"></i></button>` +
        //`<button id="link0" onclick="openLink(${id})" class="product-button"><i class="fa fa-external-link"></i></button>` +
        '';

    if (deletable) {
        cardHtml += `<button onclick="promptDelete(${id})" class="product-button" data-bs-toggle="modal" data-bs-target="#deleteModal"><i class="fa fa-trash icon"></i></button>`;
    }
    else {
        cardHtml += `<button onclick="promptReport(${id})" class="product-button" data-bs-toggle="modal" data-bs-target="#reportModal"><i class="fa fa-exclamation-circle icon"></i></button>`;
    }

    cardHtml += `<div class="product-price">${priceRM}</div>` +
        `<div class="product-description">${desc}</div>`;

    if (!deletable) {
        cardHtml += `<button onclick="contact(${id})" type="button" class="product-button-long" data-bs-toggle="modal" data-bs-target="#contactModal">Contact</button>`;
    }
    cardHtml += '</div>'

    return cardHtml
}