"use strict";


function init() {

    //Mobile menue bar
    let menuBtn = document.getElementById("menu-btn");
    menuBtn.addEventListener("click", () => {
        document.body.classList.toggle("nav-open");
    })
    runFuncs();

}

window.addEventListener("load", init);

function runFuncs() {
    let page = document.body.id;
    switch (page) {
        case "index":
            prodFunc();
            break;
        case "prodpage":
            addProdInfo();
            slideFunc();
            break;
        case "catpage":
            prodFunc();
            break;
    }
}

function addProdInfo() {
    let prod = decodeURIComponent(location.search.substring(1)); //Get param from url excluding "?"
    let prodInfoArr = prod.split("&");
    if (prodInfoArr.length > 0) {
        document.getElementById("prod-name").innerHTML = prodInfoArr[3];
        document.getElementById("price").innerHTML = prodInfoArr[2];
        document.getElementById("description").innerHTML = prodInfoArr[1];
        addPics(prodInfoArr[4], prodInfoArr[0]);
    }
}

function addPics(numPics, prodName) {
    let slideArea = document.querySelector(".slide-area");
    for (let i = 1; i <= parseInt(numPics); i++) {
        let liElem = document.createElement("li");
        let picture = document.createElement("picture");
        let source = document.createElement("source");
        source.srcset="img/prod_" + prodName + "0" + i + "_big.webp";
        source.type="image/webp";
        let img = document.createElement("img");
        img.src = "img/prod_" + prodName + "0" + i + "_big.png";
        img.classList.add("prod-card__img--full");
        img.alt = "Produktbild";
        picture.appendChild(source);
        picture.appendChild(img);
        liElem.appendChild(picture);
        slideArea.appendChild(liElem);
    }
}

function slideFunc() {
    $(".prod-slide").jdSlider({
        wrap: '.slide-inner',
        isAuto: true,
        isLoop: true
    })
}

function prodFunc() {
    let products = document.getElementsByClassName("prod-card");
    for (let i = 0; i < products.length; i++) {
        products[i].addEventListener("click", openProdPage);
    }
}


function openProdPage(e) {
    let productInfo = this.id + "&" + this.getAttribute("data-special");
    console.log(productInfo);
    let data = encodeURIComponent(productInfo);
    location.href = "prodpage.html?" + data;
}

