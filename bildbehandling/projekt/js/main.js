"use strict";


function init(){

    //Mobile menue bar
    let menuebtn = document.getElementById("menue-btn");
    menuebtn.addEventListener("click", ()=>{
        document.body.classList.toggle("nav-open");
    })

}

window.addEventListener("load", init);