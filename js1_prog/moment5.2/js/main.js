
"use strict";

//Global variables
let infoEl;
let sitesEl;

//Function onlad window
function init() {
    //Element refrences
    infoEl = document.getElementById("info");
    sitesEl = document.getElementById("sites");

    //Run loadData
    loadData();
}

//When window load run init
window.addEventListener("load", init);

//Load data to site with fetch
function loadData() {
    fetch("https://modest-bose-aa97d3.netlify.app/js1_prog/Moment%204.2/student.json")
        .then(response => response.json()) //Create object from json
        .then(info => {
            //run functions with object data
            showInfo(info.student.information);
            showSites(info.student.websites);
        })
}

//Add elements and information to DOM from object
function showInfo(info) {
    //Print name element and name from info
    infoEl.innerHTML = "<strong>Namn: </strong>" + info.name + "<br>";

    //Print email element and email from info
    infoEl.innerHTML += "<strong>E-post: </strong>" + "<a href='mailto:" + info.email + "'>" + info.email + "</a> <br>";

    //Print website element and website from info
    infoEl.innerHTML += "<strong>Webbplats: </strong>" + "<a href='" + info.website + "' target='_blank'>" + info.website + "<br></a>";
}

//Add list of sites to DOM from object
function showSites(websites) {
    //Run through list of websites and create a new list element
    for (let i = 0; i < websites.length; i++) {
        sitesEl.innerHTML += "<li><a href='" + websites[i].siteurl + "' target='_blank' title='" + websites[i].description + "'>" + websites[i].sitename + "</a></li>";
    }
}
