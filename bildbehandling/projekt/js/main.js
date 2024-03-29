"use strict";


//Inital function when window load
function init() {

    //Mobile menue bar
    let menuBtn = document.getElementById("menu-btn");
    menuBtn.addEventListener("click", () => {
        document.body.classList.toggle("nav-open");
    })

    //run functions depending on page
    runFuncs();

}

window.addEventListener("load", init);

//Depending on which page is loaded different functions will be called
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
        case "bag":
            payFunc();
            break;
    }
}

//------------category pages and index------------------

//When click on product card run openProdPage
function prodFunc() {
    let products = document.getElementsByClassName("prod-card");
    for (let i = 0; i < products.length; i++) {
        products[i].addEventListener("click", openProdPage);
    }
}

//Go to product page and add product information to URL
function openProdPage(e) {
    let productInfo = this.id + "&" + this.getAttribute("data-special");
    console.log(productInfo);
    let data = encodeURIComponent(productInfo);
    location.href = "prodpage.html?" + data;
}

//-------------product page-----------------------------

//Get product information from URL and add on product page to elements
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

//Add product pictures to product page
function addPics(numPics, prodName) {
    let slideArea = document.querySelector(".slide-area");
    for (let i = 1; i <= parseInt(numPics); i++) {
        if (prodName == "totoro"){
            let video = document.getElementsByClassName("videodiv");
            video[0].innerHTML = "<iframe width='560' height='315' src='https://www.youtube.com/embed/qMEIQ0BENqU' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";
        }
        else{
            let videoCont = document.getElementsByClassName("videodiv__cont");
            videoCont[0].style.display = "none";
        }
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

//Product image slider on product page
function slideFunc() {
    $(".prod-slide").jdSlider({
        wrap: '.slide-inner',
        isAuto: true,
        isLoop: true
    })
}

//-----------bag.html--------------
//Show form after click on go to payment on
function payFunc(){
    let toPayBtn = document.getElementById("to-pay-btn");
    let form = document. getElementById("pay-form")
    toPayBtn.addEventListener("click", () => {
        toPayBtn.style.display="none";
        form.style.display="block";
    })
}