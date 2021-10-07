
"use strict";

let infoEl;
let sitesEl;

function init() {
    infoEl = document.getElementById("info");
    sitesEl = document.getElementById("sites");
    loadInfo();
}

window.addEventListener("load", init);

function loadInfo() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let infoObj = JSON.parse(this.responseText);
            showInfo(infoObj);
            showSites(infoObj);

        }
    };
    xhttp.open('GET', 'https://modest-bose-aa97d3.netlify.app/js1_prog/Moment%204.2/student.json', true);
    xhttp.send();
}

function showInfo(infoObj) {
    let strongNameEl = document.createElement("strong");
    let strongName = document.createTextNode("Namn: ");
    strongNameEl.appendChild(strongName);
    infoEl.appendChild(strongNameEl);

    infoEl.innerHTML += infoObj.student.information.name;

    let brEl = document.createElement("br");
    infoEl.appendChild(brEl);

    let strongEmailEl = document.createElement("strong");
    let strongEmail = document.createTextNode("E-post: ");
    strongEmailEl.appendChild(strongEmail);
    infoEl.appendChild(strongEmailEl);

    let emailLinkEl = document.createElement("a");
    emailLinkEl.href = "mailto:" + infoObj.student.information.email;
    emailLinkEl.innerHTML = infoObj.student.information.email;
    infoEl.appendChild(emailLinkEl);

    let brEl2 = document.createElement("br");
    infoEl.appendChild(brEl2);

    let strongWebEl = document.createElement("strong");
    let strongWebText = document.createTextNode("Webbsida:");
    strongWebEl.appendChild(strongWebText);
    infoEl.appendChild(strongWebEl);

    let webLinkEl = document.createElement("a");
    webLinkEl.href = infoObj.student.information.website;
    webLinkEl.target = "_blank";
    webLinkEl.innerHTML = infoObj.student.information.website + "<br>";
    infoEl.appendChild(webLinkEl);
}

function showSites(sitesObj) {
    let websites = sitesObj.student.websites;

    for (let i = 0; i < websites.length; i++) {
        let liEl = document.createElement("li");
        let linkEl = document.createElement("a");
        linkEl.href = websites[i].siteurl;
        linkEl.target = "_blank";
        linkEl.title = websites[i].description;
        linkEl.innerHTML = websites[i].sitename;

        liEl.appendChild(linkEl);
        sitesEl.appendChild(liEl);
    }
}