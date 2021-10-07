
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

//Get data from student.json through AJAX 
function loadData() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) { //If succesful load
            //Create new object from json-file
            let obj = JSON.parse(this.responseText);
            //run functions
            showInfo(obj.student.information);
            showSites(obj.student.websites);
        }
    };
    xhttp.open('GET', 'https://modest-bose-aa97d3.netlify.app/js1_prog/Moment%204.2/student.json', true);
    xhttp.send();
}

// Get information from object, modify DOM and present data in info slot
function showInfo(info) {
    // Create and print name element
    let strongNameEl = document.createElement("strong");
    let strongName = document.createTextNode("Namn: ");
    strongNameEl.appendChild(strongName);
    infoEl.appendChild(strongNameEl);
    infoEl.innerHTML += info.name; //Print name from info

    //Create and print br element
    let brEl = document.createElement("br");
    infoEl.appendChild(brEl);

    //Create and print email element
    let strongEmailEl = document.createElement("strong");
    let strongEmail = document.createTextNode("E-post: ");
    strongEmailEl.appendChild(strongEmail);
    infoEl.appendChild(strongEmailEl);

    //Create and print link element to email
    let emailLinkEl = document.createElement("a");
    emailLinkEl.href = "mailto:" + info.email;
    emailLinkEl.innerHTML = info.email; //Print email from info
    infoEl.appendChild(emailLinkEl);

    //Create and print 2:nd br element
    let brEl2 = document.createElement("br");
    infoEl.appendChild(brEl2);

    //Create and print website element
    let strongWebEl = document.createElement("strong");
    let strongWebText = document.createTextNode("Webbsida: ");
    strongWebEl.appendChild(strongWebText);
    infoEl.appendChild(strongWebEl);

    //Create and print website link
    let webLinkEl = document.createElement("a");
    webLinkEl.href = info.website;
    webLinkEl.target = "_blank";
    webLinkEl.innerHTML = info.website + "<br>"; //Print website from info
    infoEl.appendChild(webLinkEl);
}

//Print list of websites from object and modify DOM
function showSites(sites) {
    //Run through list and add list element with link to website
    for (let i = 0; i < sites.length; i++) {
        let liEl = document.createElement("li");
        let linkEl = document.createElement("a");
        linkEl.href = sites[i].siteurl; //Print siteurl from sites
        linkEl.target = "_blank";
        linkEl.title = sites[i].description; //Add site description to link title
        linkEl.innerHTML = sites[i].sitename; //Print sitename 

        //append new elemet to sites element
        liEl.appendChild(linkEl);
        sitesEl.appendChild(liEl);
    }
}