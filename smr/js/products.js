const MaxImagesAllowed = 5
let interestedProd = 0
let prevScroll = 0

window.onload = () => {
    setTimeout(function() {
        document.getElementById("fadein").remove()
    },1000)

    const product_titles = document.getElementsByClassName("product-title")
    for (const title of product_titles) {
        if (isElementOverflowing(title)) {
            title.classList.add("marquee")
        }
    }
};

window.onscroll = () => {
    const scrollTop = $(window).scrollTop()
    $('.nav').toggleClass('nav-hidden', scrollTop > prevScroll);

    prevScroll = scrollTop
}

/**
 * Check if an element is overflowing
 * @param element
 * @returns {boolean}
 */
function isElementOverflowing(element) {
    return element.scrollHeight > element.clientHeight
        || element.scrollWidth > element.clientWidth
}

function contactWhatsapp() {

}

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
        }
        else {
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
    }
    else {
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