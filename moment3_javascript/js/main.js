/*
Här lägger du din JavaScript-kod
*/

//Globala variabler
let input;
let addBtn;
let clearBtn;
let toDos;
let toDoList;


function init() {
    //Kopplar variabler till element
    input = document.getElementById("newtodo");
    addBtn = document.getElementById("newtodobutton");
    clearBtn = document.getElementById("clearbutton");
    toDos = document.getElementsByClassName("todo");
    toDoList = document.getElementById("todolist");

    //Kopplar element till eventhanterare
    input.addEventListener("keyup", checkLength, false);
    addBtn.addEventListener("click", addEl, false);
    clearBtn.addEventListener("click", clearList, false);

    //Laddar sparad data
    loadToDoList();

    //Rensar input-fält
    input.value = "";

    //Inaktiverar lägg till-knapp
    addBtn.disabled = true;
}
window.addEventListener("load", init);

//Kontrollerar att längden på input är längre än 5 tecken
function checkLength() {
    let warning = document.getElementById("message");
    if (input.value.length <= 5) {
        //Skriver ut varning och inaktiverar knapp
        warning.innerHTML = "Texten behöver vara längre än 5 tecken.";
        addBtn.disabled = true;
    }
    else {
        //Tar bort varning och aktiverar knapp
        warning.innerHTML = "";
        addBtn.disabled = false;
    }
}

// Lägger till ett nytt article element som todo
function addEl() {
    let newToDo = document.createElement("article");
    newToDo.innerHTML = input.value;

    newToDo.className = "todo";
    toDoList.appendChild(newToDo);

    //Gör element klickbart och koppla till raderafunktion
    newToDo.addEventListener("click", removeToDo, false);

    //Rensar i input-fältet
    input.value = "";

    //Spara data i local storage
    saveToDo();
}

//Gör om todo-listan till sträng och sparar i local storage
function saveToDo() {
    let tempArray = [];
    for (i = 0; i < toDos.length; i++) {
        tempArray.push(toDos[i].innerHTML);
    }

    //Konverterar till JSON-sträng
    let toDoContent = JSON.stringify(tempArray);

    //Sparar i local storage
    localStorage.setItem("todos", toDoContent);
}

//Rensar hela listan på todo's
function clearList() {
    let parentEl = toDos[0].parentNode;
    while (toDos.length > 0) {//Så länge det finns artiklar kvar tas de bort
        parentEl.removeChild(toDos[0]);
    }

    //Sparar den tomma listan i local storage
    saveToDo();
}

//Tar bort enskild todo ur listan
function removeToDo(e) {
    e.target.remove();

    //Sparar aktuell lista i local storage
    saveToDo();
}


//Ladda lista från local Storage
function loadToDoList() {
    //Hämtar data
    let toDoContent = JSON.parse(localStorage.getItem("todos"));
    for (i = 0; i < toDoContent.length; i++) {
        //Skapar upp nya element
        let newToDo = document.createElement("article");
        newToDo.innerHTML = toDoContent[i];
        newToDo.className = "todo";
        toDoList.appendChild(newToDo);

        //Gör de nya elementen klickbara
        newToDo.addEventListener("click", removeToDo, false)
    }
}