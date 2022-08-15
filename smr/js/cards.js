const MaxImagesAllowed = 5
let interestedProd = 0

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

function like(cardIndex) {
    document.getElementById("like" + cardIndex).classList.add("hidden")
    document.getElementById("unlike" + cardIndex).classList.remove("hidden")
}

function unlike(cardIndex) {
    document.getElementById("like" + cardIndex).classList.remove("hidden")
    document.getElementById("unlike" + cardIndex).classList.add("hidden")
}

function toggleDesc(cardIndex) {
    const card = document.getElementsByClassName("product-card")[cardIndex]
    if (card.classList.contains("product-card-expanded")) {
        card.classList.remove("product-card-expanded")
    } else {
        card.classList.add("product-card-expanded")
    }
}

function promptDelete(cardIndex) {
    const product = products[cardIndex];
    document.getElementById('deleteModalLabel').innerHTML = 'Delete <b>' + product['name'] + '</b>';
    document.getElementById('deleteButton').onclick = () => confirmDelete(product['id']);
}

function confirmDelete(prodId) {
    const oReq = new XMLHttpRequest()
    oReq.onload = function () {
        window.location.reload()
    };
    oReq.open("get", "http://myresidence.shop/smr/server/product.php?action=delete&session=" + session + "&product=" + prodId, true)
    oReq.send()
}

function contact(cardIndex) {
    displayUser(products[cardIndex])
}


function getCardLayout(id, title, desc, imageUrl, price, deletable = false) {
    const imageId = 'image0.' + id;
    let cardHtml = '<div class="product-card">' +
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
        `<button onclick="toggleDesc(${id})" class="product-button"><i class="fa fa-navicon"></i></button>` +
        //`<button id="link0" onclick="openLink(${id})" class="product-button"><i class="fa fa-external-link"></i></button>` +
        '';

    if (deletable) {
        cardHtml += `<button onclick="promptDelete(${id})" class="product-button" data-bs-toggle="modal" data-bs-target="#deleteModal"><i class="fa fa-trash"></i></button>`;
    }

    cardHtml += `<div class="product-price">RM ${price}</div>` +
        `<div class="product-description">${desc}</div>`;

    if (!deletable) {
        cardHtml += `<button onclick="contact(${id})" type="button" class="product-button-long" data-bs-toggle="modal" data-bs-target="#contactModal">Contact</button>`;
    }
    cardHtml += '</div>'

    return cardHtml
}