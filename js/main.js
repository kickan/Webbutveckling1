


let lstbtns;


function init() {
    lstbtns = document.getElementsByClassName("listbtn");
    for (let i = 0; i < lstbtns.length; i++){
        lstbtns[i].addEventListener("click",showList);
    }
}
window.addEventListener("load", init);




function showList() {
    let parent = this.parentNode;
    let list = parent.nextElementSibling;
    if (list.style.display == "block") {
        list.style.display = "none";
        this.innerHTML = "V";
    }
    else { 
        list.style.display = "block";
        this.innerHTML = "^";
     }
}