
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
            let obj = JSON.parse(this.responseText);
            showInfo(obj.student.information);
            showSites(obj.student.websites);
        }
    };
    xhttp.open('GET', 'https://modest-bose-aa97d3.netlify.app/js1_prog/Moment%204.2/student.json', true);
    xhttp.send();
}

function showInfo(info) {
    let strongNameEl = document.createElement("strong");
    let strongName = document.createTextNode("Namn: ");
    strongNameEl.appendChild(strongName);
    infoEl.appendChild(strongNameEl);

    infoEl.innerHTML += info.name;

    let brEl = document.createElement("br");
    infoEl.appendChild(brEl);

    let strongEmailEl = document.createElement("strong");
    let strongEmail = document.createTextNode("E-post: ");
    strongEmailEl.appendChild(strongEmail);
    infoEl.appendChild(strongEmailEl);

    let emailLinkEl = document.createElement("a");
    emailLinkEl.href = "mailto:" + info.email;
    emailLinkEl.innerHTML = info.email;
    infoEl.appendChild(emailLinkEl);

    let brEl2 = document.createElement("br");
    infoEl.appendChild(brEl2);

    let strongWebEl = document.createElement("strong");
    let strongWebText = document.createTextNode("Webbsida: ");
    strongWebEl.appendChild(strongWebText);
    infoEl.appendChild(strongWebEl);

    let webLinkEl = document.createElement("a");
    webLinkEl.href = info.website;
    webLinkEl.target = "_blank";
    webLinkEl.innerHTML = info.website + "<br>";
    infoEl.appendChild(webLinkEl);
}

function showSites(sites) {
    let websites = sites.websites;

    for (let i = 0; i < sites.length; i++) {
        let liEl = document.createElement("li");
        let linkEl = document.createElement("a");
        linkEl.href = sites[i].siteurl;
        linkEl.target = "_blank";
        linkEl.title = sites[i].description;
        linkEl.innerHTML = sites[i].sitename;

        liEl.appendChild(linkEl);
        sitesEl.appendChild(liEl);
    }
}