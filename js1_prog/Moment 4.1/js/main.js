"use strict";


// reference to output field
let output = document.getElementById("output");


// Movie constructor
function Movie(title, category, playtime){
    this.title = title;
    this.category = category;
    this.playtime = playtime;
    //Method return information about movie as string
    this.getInformation = function(){
        return this.title + ", " + this.category + ", " + this.playtime;
    }
}

//Create new Movie objects
let movie1 = new Movie("Rider", "Drama", "105 minuter");
let movie2 = new Movie("Dune", "Sci-fi", "155 minuter");
let movie3 = new Movie("Princess Mononoke", "Fantasy", "133 minuter");
let movie4 = new Movie("American Psycho", "Komedi/krim", "101 minuter");

// Print out movie-information to output field
output.innerHTML += movie1.getInformation() + "\n";
output.innerHTML += movie2.getInformation() + "\n";
output.innerHTML += movie3.getInformation() + "\n";
output.innerHTML += movie4.getInformation() + "\n";