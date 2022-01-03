"use strict";

let menuebtn = document.getElementById("menuebtn");
let start_book_btn =document.getElementById("start-book-btn");
let from_start_input = document.getElementById("from-start");
let to_start_input = document.getElementById("to-start");


menuebtn.addEventListener("click", () =>{
    document.body.classList.toggle("nav-open");
} );

start_book_btn.addEventListener("click", () =>{
    let to = to_start_input.value; 
    let from = from_start_input.value;
    location.href="book.html";
    let from_input = document.getElementById("from");
    from_input.value = from;
})