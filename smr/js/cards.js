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
    const product = getCard(cardIndex);
    if (product.classList.contains("product-card-expanded")) {
        product.classList.remove("product-card-expanded")
    } else {
        product.classList.add("product-card-expanded")
    }
}

function openLink(cardIndex) {

}

function interested(cardIndex) {
    interestedProd = cardIndex
}

function getCard(cardIndex) {
    return document.getElementsByClassName("product-card")[cardIndex]
}

function getCardLayout(id, title, desc, imageUrl, price) {
    const imageId = 'image0.' + id;
    return '<div class="product-card">' +
        `<div class="product-title">${title}</div><` +
        'div class="product-carousel">' +
        //'<button onclick="carouselChange(0, -1)" class="btn"><i class="fa fa-arrow-left"></i></button>' +
        `<img id="${imageId}" src="${imageUrl}" class="product-image" alt="Product">` +
        //'<button onclick="carouselChange(0, 1)" class="btn"><i class="fa fa-arrow-right"></i></button>' +
        '</div>' +
        //'<div class="carousel-indicator">' +
        //'<div id="indicator0.0" class="indicator selected"></div>' +
        //'<div id="indicator0.1" class="indicator"></div>' +
        //'<div id="indicator0.2" class="indicator"></div>' +
        //'</div>' +
        `<button id="like0" onclick="like(${id})" class="product-button"><i class="fa fa-heart-o"></i></button>` +
        `<button id="unlike0" onclick="unlike(${id})" class="product-button hidden"><i class="fa fa-heart"></i></button>` +
        `<button id="desc0" onclick="toggleDesc(${id})" class="product-button"><i class="fa fa-navicon"></i></button>` +
        `<button id="link0" onclick="openLink(${id})" class="product-button"><i class="fa fa-external-link"></i></button>` +
        `<div class="product-price">RM ${price}</div>` +
        `<div class="product-description">${desc}</div>` +
        `<button onclick="interested(${id})" type="button" class="product-button-long" data-bs-toggle="modal" data-bs-target="#contactModal">Contact</button>` +
        '</div>'
}