
"use strict";

let infoEl;
let sitesEl;

function init() {
    infoEl = document.getElementById("info");
    sitesEl = document.getElementById("sites");
    loadInfo();
}

window.addEventListener("load", init);

function loadInfo(){
    fetch("student.json")
    .then(response => response.json())
    .then(info => {
        showInfo(info.student.information);
        showSites(info.student.websites);
    })
}

function showInfo(info){
    infoEl.innerHTML = "<strong>Namn: </strong>" + info.name + "<br>";
    infoEl.innerHTML += "<strong>E-post: </strong>" + "<a href='mailto:" + info.email + "'>" + info.email + "</a> <br>";
    infoEl.innerHTML += "<strong>Webbplats: </strong>" + "<a href='" + info.website + "' target='_blank'>" + info.website + "<br></a>";
}

function showSites(websites){

    for (let i = 0; i < websites.length; i++){
        sitesEl.innerHTML += "<li><a href='" + websites[i].siteurl + "' target='_blank' title='" + websites[i].description + "'>" + websites[i].sitename + "</a></li>";
    }
}
