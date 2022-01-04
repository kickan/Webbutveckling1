"use strict";

//Global variables on all pages
let menuebtn = document.getElementById("menuebtn");


function init() {
    runFuncs();

    //Mobile menue bar
    menuebtn.addEventListener("click", () => {
        if(menuebtn.innerHTML == "Meny"){
            menuebtn.innerHTML = "Stäng";
        }
        else{
            menuebtn.innerHTML = "Meny";
        }
        document.body.classList.toggle("nav-open");
    });
}

window.addEventListener("load", init);


function runFuncs() {
    //Based on current page
    let page = document.body.id;
    console.log(page);
    switch (page) {
        case "index":
            console.log("ind");
            indexFunc();
            break;
        case "book":
            console.log("book")
            getLocations();
            bookFunc();
            break;
        case "myprofile":
            console.log("profile")
            myProfileFunc();
            break;
    }

}

function indexFunc() {
    let start_book_btn = document.getElementById("start-book-btn");
    start_book_btn.addEventListener("click", () => {
        let from = document.getElementById("from-start").value;
        let to = document.getElementById("to-start").value;
        let data = "start&" + encodeURIComponent(from) + "&" + encodeURIComponent(to);
        location.href = "book.html?" + data;
    })
}

function getLocations() {
    let locations = location.search.substring(1); //Get param from url excluding "?"
        let fromToArr = locations.split("&");
        if (fromToArr[0] == "start") {
            document.getElementById("from").value = decodeURIComponent(fromToArr[1]);
            document.getElementById("to").value = decodeURIComponent(fromToArr[2]);
        }
}

function bookFunc() {
    let ret = document.getElementById("return");
    let recur = document.getElementById("recur");
    let copass = document.getElementById("copassenger");
    let bookbtn = document.getElementById("book-btn");

    ret.addEventListener("click", () => {
        if (ret.checked == true) {
            document.getElementById("timereturn").disabled = false;
            document.getElementById("datereturn").disabled = false;
        }
        else {
            document.getElementById("timereturn").disabled = true;
            document.getElementById("datereturn").disabled = true;
        }
    })

    recur.addEventListener("click", () => {
        if (recur.checked == true) {
            document.getElementById("recur_options").style.display = "inline";
        }
        else {
            document.getElementById("recur_options").style.display = "none";
        }
    })

    copass.addEventListener("click", () => {
        if (copass.checked == true) {
            document.getElementById("numcopassenger").disabled = false;
        }
        else {
            document.getElementById("numcopassenger").disabled = true;
        }
    })
    bookbtn.addEventListener("click", () => {
        alert("Du har nu bokat en resa med Uppsala färdtjänst");
    })

}

function myProfileFunc(){
    let btn = document.getElementById("profilebtn");
    btn.addEventListener("click", ()=>{
        if(btn.innerHTML == "Ändra"){
            btn.innerHTML = "Spara";
            document.getElementById("phone").disabled = false;
            document.getElementById("mobile").disabled = false;
            document.getElementById("email").disabled = false;
            document.getElementById("not_text").disabled = false;
            document.getElementById("not_email").disabled = false;
        }
        else{
            btn.innerHTML = "Ändra";
            document.getElementById("phone").disabled = true;
            document.getElementById("mobile").disabled = true;
            document.getElementById("email").disabled = true;
            document.getElementById("not_text").disabled = true;
            document.getElementById("not_email").disabled = true;
            alert("Dina ändringar har sparats")
        }
    })
}
