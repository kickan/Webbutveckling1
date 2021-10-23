
"use strict";

//Global variables
let channelListEl;
let tableauEl;
let numRowsEl;
let playChannelEL;
let playBtn;
let radPlayEl;
let mainheadEl;
let playedChannels;
//------------------------------------------------------------------

//Function that runs on window load, connect elements to variables and run other functions
function init() {
    //Connect element refrences to elements
    channelListEl = document.getElementById("mainnavlist");
    tableauEl = document.getElementById("info");
    numRowsEl = document.getElementById("numrows");
    playChannelEL = document.getElementById("playchannel");
    playBtn = document.getElementById("playbutton");
    radPlayEl = document.getElementById("radioplayer");
    mainheadEl = document.getElementById("mainheader");

    //get channel data from SR
    loadChannels();

    //Get last played channels from loadData
    playedChannels = loadData();

}
//----------------------------------------------------------------

//Run init on window load
window.onload = init;

//Load channels from SR using AJAX, converts data to object,
//call functions with data and add eventlisteners to elements. 
function loadChannels() {
    //Set data URL for channels and request data
    let url = "https://api.sr.se/api/v2/channels/?format=json&pagination=false&ondemandaudiotemplateid = 1";
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) { //If succesful load
            let channelObj = JSON.parse(this.responseText);//Create new object from json-file

            //run functions
            listChannels(channelObj.channels);
            dropDownChannels(channelObj.channels);

            //Add eventlistener (after channel data is loaded)
            numRowsEl.addEventListener("change", function () { listChannels(channelObj.channels); }, false);
            playBtn.addEventListener("click", function () { playAudio(channelObj.channels); }, false);

            //Load categories from SR
            loadCat();
        }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
}
//-----------------------------------------------------------

//Add list of channels to screen using DOM-manipulation.
//Number of channels is decided by input element
function listChannels(channels) {
    //Remove current children of list element
    removeAllChildNodes(channelListEl);

    let numChannels = numRowsEl.value;//Save input from input element

    for (let i = 0; i < numChannels; i++) { //Print as many channels as numChannels
        //Create list elements and add channel name
        let liEl = document.createElement("li");
        liEl.innerHTML = channels[i].name;
        liEl.title = channels[i].tagline; //add title
        liEl.id = channels[i].id; //save channel id in element id
        channelListEl.appendChild(liEl); //Append element to list

        //Click on list element runs styleInfo
        liEl.addEventListener("click", function () { styleInfo(channels); }, false);
    }

}
//---------------------------------------------------------------

//Remove all child nodes of an element
//Found inspiration to this function on the internet
function removeAllChildNodes(parentEl) {
    //While parent still have at least one child
    while (parentEl.firstChild) {
        //Remove parents first child
        parentEl.removeChild(parentEl.firstChild);
    }
}
//------------------------------------------------------------------

//Style website in channel color and add channel information on top of channeltableau
function styleInfo(channels) {
    //Remove current children of tableauEl
    removeAllChildNodes(tableauEl);

    //Get channelId from event target
    let channelId = event.target.id;
    //Loop through channel list to find correct channel
    for (let i = 0; i < channels.length; i++) {
        if (channels[i].id == channelId) {//Find correct channel by identifying channel id
            //create elements and add style and info
            let imgEl = document.createElement("img");
            imgEl.src = channels[i].image;
            imgEl.style.maxWidth = "100px";
            let titleEl = document.createElement("h1");
            titleEl.innerHTML = channels[i].name;
            let taglineEl = document.createElement("h4");
            taglineEl.innerHTML = channels[i].tagline;
            let linkEl = document.createElement("a");
            linkEl.href = channels[i].siteurl;
            linkEl.innerHTML = "Kanalens webbsida";
            let hrEl = document.createElement("hr");

            //gather all new elements in list
            let elementLst = [imgEl, titleEl, taglineEl, linkEl, hrEl];
            //Loop through list and att each element to tableauEL
            for (let i = 0; i < elementLst.length; i++) {
                tableauEl.appendChild(elementLst[i]);
            }
            //Change color of mainheadEl to channel color
            mainheadEl.style.backgroundColor = "#" + channels[i].color;

            //Break loop after finding correct channel
            break;
        }
    }
    //Load tableau data
    loadTableau(channelId);
}
//------------------------------------------------------------


//Load channel Tableau from SR using AJAX, then run function with data
function loadTableau(channelId) {
    //get channel id from "this" element id to get proper URL
    let url = "https://api.sr.se/v2/scheduledepisodes?channelid=" + channelId + "&format=json&pagination=false";
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) { //If succesful load
            //Create new object from json-file
            let tableauObj = JSON.parse(this.responseText);
            //List tableau data
            listTableau(tableauObj.schedule);
        }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
}
//-------------------------------------------------------------

//List tableau of clicked channel. Print currend and coming programs to screen using DOM-manipulation
function listTableau(tabLst) {
    //Create header to tableau
    let tabTitleEl = document.createElement("h1");
    tabTitleEl.innerHTML = "Kanalens tablå: "
    tableauEl.appendChild(tabTitleEl);

    //Loop through all programs in tabLst
    for (let i = 0; i < tabLst.length; i++) {
        //Extract start and end time and create date objects
        let startTime = extractTime(tabLst[i].starttimeutc);
        let endTime = extractTime(tabLst[i].endtimeutc);

        // Create a new Date object for current time
        let time = new Date();

        //Compare endtime with current time to exclude programs that have ended for the day
        if (time.getTime() < (endTime.getTime())) {
            //Create elements to DOM and add text to innerHTML
            let articleEl = document.createElement("article");
            //Add title
            let titleEl = document.createElement("h3");
            titleEl.innerHTML = tabLst[i].title;
            //Add time element
            let timeEl = document.createElement("h5");
            //Get correct time format using checkTime
            let startTimes = checkTime(startTime);
            let endTimes = checkTime(endTime);
            //Add start and end time to timeEl
            timeEl.innerHTML = "starttid: " + startTimes.hour + ":" + startTimes.min + " Sluttid: " + endTimes.hour + ":" + endTimes.min;

            //Add description
            let desEl = document.createElement("p");
            desEl.innerHTML = tabLst[i].description;

            let tabelements = []; //New list for tableau elements

            //If program has a subtitle add an element for it
            if ("subtitle" in tabLst[i]) {
                //Create element and add subtitle
                let subtitleEl = document.createElement("h4");
                subtitleEl.innerHTML = tabLst[i].subtitle;
                //Update list of tableau elements
                tabelements = [titleEl, subtitleEl, timeEl, desEl];
            }
            else { tabelements = [titleEl, timeEl, desEl]; }//Update list of tableau elements without subtitle

            //Append elements in tableau list to articleEL
            for (let n = 0; n < tabelements.length; n++) {
                articleEl.appendChild(tabelements[n]);
            };
            //Append articleEl to tableauEl
            tableauEl.appendChild(articleEl);
        }
    }
}
//------------------------------------------------------------------

//Extract numbers from time string and objectify
function extractTime(timeStr) {
    //Extract numbers from string
    let timeUTC = timeStr.match(/\d+/g);
    //Create new date object
    let timeObj = new Date(parseInt(timeUTC[0], 10));
    return timeObj;
}
//-------------------------------------------------------------

//Check if hours and min of date objects are smallet than 10, 
//in that case returns hours and min as two numbers, ex. 2 -> 02
function checkTime(dateObj) {
    //Save hours and min from object in variable
    let hour = dateObj.getHours();
    let min = dateObj.getMinutes();
    //Check if hour is singular
    if (hour < 10) {
        //Add "0"
        hour = "0" + hour;
    };
    //Check if min is singular
    if (min < 10) {
        //Add "0"
        min = "0" + min;
    }
    return {
        hour,
        min
    }
}
//------------------------------------------------------------------

//Add all channels from object to drop down list
function dropDownChannels(channels) {
    //Remove all current children
    removeAllChildNodes(playChannelEL);

    //Create group and header to drop-down
    let optgroupEl = document.createElement("optgroup");
    optgroupEl.label = "Alla kanaler";
    //Append element to dropdown element
    playChannelEL.appendChild(optgroupEl);
    //List all channels as options in drop-down
    for (let i = 0; i < channels.length; i++) {
        //Create new option-element and add info
        let optionEl = document.createElement("option");
        optionEl.id = channels[i].id;
        optionEl.value = channels[i].name;
        optionEl.innerHTML = channels[i].name;
        //Append element to dropdown element
        playChannelEL.appendChild(optionEl);
    }
    //List top channels in drop-down
    listPlayedChannels(playedChannels);
}
//------------------------------------------------------------------

//List channels that are saved in localStorage
function listPlayedChannels(topChannels) {
    //Check if there is last played channels in list
    if (topChannels.length > 0) {
        //Check if there is an optgroup for played channels, in that case, remove it
        if (playChannelEL.firstChild.label == "Senast spelade") {
            playChannelEL.removeChild(playChannelEL.firstChild)
        }
        //Create new optgroup for played channels
        let optgroupEl = document.createElement("optgroup");
        optgroupEl.label = "Senast spelade";
        //Append element to dropdown element
        playChannelEL.insertBefore(optgroupEl, playChannelEL.firstChild);

        //Add last played channels to optgroup
        for (let i = 0; i < topChannels.length; i++) {
            //Create new option-element and add info
            let optionEl = document.createElement("option");
            optionEl.id = topChannels[i].id;
            optionEl.value = topChannels[i].name;
            optionEl.innerHTML = topChannels[i].name;
            //Append element to dropdown element
            optgroupEl.appendChild(optionEl);
        }
    }
}
//---------------------------------------------------------------------

//On button click - create audio element using DOM-manipulation 
//and add audio from chosen channel in dropdown list
function playAudio(channels) {
    //Remove current children of radPlayEl
    removeAllChildNodes(radPlayEl);

    //Create new audio element and add attributes
    let audioEl = document.createElement("audio");
    audioEl.setAttribute("controls", "");
    audioEl.setAttribute("autoplay", "");
    //Create new source element
    let sourceEl = document.createElement("source");

    //Take channel id from  selected item in dropdown to get correct channel audio
    let channelId = playChannelEL.options[playChannelEL.selectedIndex].id;
    //Loop through channels to find correct channel object
    for (let i = 0; i < channels.length; i++) {
        if (channels[i].id == channelId) {
            //Add audio source to sourceEl
            sourceEl.src = channels[i].liveaudio.url;
            sourceEl.type = "audio/mpeg";

            //Save played channel
            saveData(channels[i]);

            //Break loop after finding correct channel
            break;
        }
    }

    //Append children
    audioEl.appendChild(sourceEl);
    radPlayEl.appendChild(audioEl);
}
//-----------------------------------------------------------

//Save played channels in localStorage
function saveData(channelObj) {
    //To find correct channel when site is reloaded compare channel ID to played channel ID
    let channelId = channelObj.id;
    let channelExsist = false;
    let index;
    for (let i = 0; i < playedChannels.length; i++) {
        if (playedChannels[i].id == channelId) {
            index = i;//Save index
            channelExsist = true;
            //Break loop when found correct channel
            break;
        }
    }
    //If channel already exist in list move channel first in list
    if (channelExsist == true) {
        playedChannels.splice(index, 1);//Remove channel from list
        playedChannels.splice(0, 0, channelObj);//Add channel first in list
    }
    //If 3 channels are saved, remove last and add new channel first
    else if (playedChannels.length == 3) {
        playedChannels.splice(2, 1);//Remove last item in list
        playedChannels.splice(0, 0, channelObj);//Add new channel first in list
    }
    //If less than 3 channels are saved, add new channel first
    else {
        playedChannels.splice(0, 0, channelObj);
    }
    //Convert list of channels to JSON-string
    let playedChannelsObj = JSON.stringify(playedChannels);
    //Save in local storage
    localStorage.setItem("topChannels", playedChannelsObj);
    //Update played channel list
    listPlayedChannels(playedChannels);
}
//----------------------------------------------------------------

//Load last played channels from local storage
function loadData() {
    //Get item from local storange and parse
    let playedChannelsObj = JSON.parse(localStorage.getItem("topChannels"));
    //Return empty list if no played channels
    if (playedChannelsObj == null) {
        return [];
    }
    return playedChannelsObj;
}
//------------------------------------------------------------------

//Request categories from SR API
function loadCat() {
    //Set url to request categories
    let url = "https://api.sr.se/api/v2/programcategories?format=json&pagination=false";
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) { //If succesful load
            //Create new object from json-file
            let catObj = JSON.parse(this.responseText);
            //List categories
            listCat(catObj.programcategories);
        }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
}
//------------------------------------------------------------------

//Create elements and list categories
function listCat(catObj) {
    //Create new section for list
    let parent = channelListEl.parentElement;
    let sectionEl = document.createElement("section");
    sectionEl.class = "clist";
    //Create new list header
    let headerEl = document.createElement("h3");
    headerEl.innerHTML = "Bläddra via kategori";
    let listEl = document.createElement("ul");
    //Style list
    listEl.style.fontSize = "0.825em";
    listEl.style.paddingLeft = "1.5em"
    //Append children
    sectionEl.appendChild(headerEl);
    sectionEl.appendChild(listEl);

    //Create new li-element for each category and add information and style
    for (let i = 0; i < catObj.length; i++) {
        //Create element
        let liEl = document.createElement("li");
        liEl.id = catObj[i].id;
        liEl.innerHTML = catObj[i].name;
        //Style element
        liEl.style.cursor = "pointer";
        liEl.style.color = "#337ab7";
        //Append child
        listEl.appendChild(liEl);

        //Add hover effekt style
        liEl.addEventListener("mouseenter", function () {
            liEl.style.textDecoration = "underline";
        }, false);
        liEl.addEventListener("mouseleave", function () {
            liEl.style.textDecoration = "none";
        }, false);

        //Make category "clickable"
        liEl.addEventListener("click", loadCatProg, false);
    }
    //Insert new list section after first list section
    parent.insertAdjacentElement("afterend", sectionEl);
}
//----------------------------------------------------------

//Request programs from specific category from SR
function loadCatProg() {
    let url = "https://api.sr.se/api/v2/programs/index?programcategoryid=" + this.id + "&format=json&pagination=false";
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) { //If succesful load
            //Create new object from json-file
            let catProgObj = JSON.parse(this.responseText);
            //run functions
            listCatProg(catProgObj.programs);
        }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
}
//-------------------------------------------------------

//Create new elements and list category programs
function listCatProg(catProgObj) {
    //Remove current children of tableauEl
    removeAllChildNodes(tableauEl);

    //Set color of header to default
    mainheadEl.style.backgroundColor = "#d04900";

    //Create header
    let titleEl = document.createElement("h1");
    let subEl = document.createElement("h4");
    titleEl.innerHTML = catProgObj[0].programcategory.name;
    subEl.innerHTML = "Nedan listas alla program inom kategorin " + catProgObj[0].programcategory.name;
    let hrEl = document.createElement("hr");
    //Append children
    tableauEl.appendChild(titleEl);
    tableauEl.appendChild(subEl);
    tableauEl.appendChild(hrEl);
    //Loop through all programs in category
    for (let i = 0; i < catProgObj.length; i++) {
        //Create new elements and add info
        let articleEl = document.createElement("article");
        let imgEl = document.createElement("img");
        imgEl.src = catProgObj[i].programimage;
        imgEl.style.maxWidth = "100px";
        let titleEl = document.createElement("h2");
        titleEl.innerHTML = catProgObj[i].name;
        let desEl = document.createElement("p");
        desEl.innerHTML = catProgObj[i].description;

        let elements; //New list for new elements
        //Only pring broadcastinfo if in object
        if ("broadcastinfo" in catProgObj[i]) {
            let infoEl = document.createElement("h5");
            infoEl.innerHTML = catProgObj[i].broadcastinfo;
            //Update elementlist
            elements = [imgEl, titleEl, infoEl, desEl];
        }
        else { elements = [imgEl, titleEl, desEl]; }
        //Append children
        for (let i = 0; i < elements.length; i++) {
            articleEl.appendChild(elements[i]);
        }
        tableauEl.appendChild(articleEl);
    }
}