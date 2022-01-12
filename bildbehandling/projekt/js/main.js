"use strict";


function init(){

    //Mobile menue bar
    let menuBtn = document.getElementById("menu-btn");
    menuBtn.addEventListener("click", ()=>{
        document.body.classList.toggle("nav-open");
    })

}

window.addEventListener("load", init);