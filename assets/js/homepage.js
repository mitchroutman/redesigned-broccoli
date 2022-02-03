//afe8f8ce140548eaaabaa3febe07b051
//0d6b19fe0c2b4f04a50900e6cfded5f0/Yujen
//74f2d339b2msh8cf0e09097065dep10d3f8jsne564c60a5f87
spoonacularKey = "62e06ed2bdb843f98dcd0f5d825b6103";

var searchButton = document.getElementById('search-button');

//goes to api to find random recipe
function randomRecipe() {
    generateRandomRecipeURL = "https://api.spoonacular.com/recipes/random?number=1&apiKey=" + spoonacularKey;

    fetch(generateRandomRecipeURL)
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (info) {
            console.log(info)
            insertRecipe(info);
        })
}

//inserts recipe found into html page
function insertRecipe(data) {
    var dishName = data.recipes[0].title;                                                   //name of dish
    var ingredientList = data.recipes[0].extendedIngredients;                               //array ingredients
    var instructions = data.recipes[0].analyzedInstructions[0].steps;                       //array of ingredients
    var dishImage = data.recipes[0].image                                                   //URL for image

    //changes header of dish name ingredients and steps
    $("#dish-name").text(dishName);
    $("#dish-image").attr("src", dishImage);
    $("#current-dish").append("<ul id=\"ingredients\"></ul><ol id=\"steps\"></ol>");
    $("#ingredients").append("<h3>Ingredients</h3>");
    $("#steps").append("<h3>Steps</h3>");

    //make li element for ingredients
    for (let i = 0; i < ingredientList.length; i++) { $("#ingredients").append("<li>" + ingredientList[i].name + "</li>") }

    //make li elements for the steps
    for (var i = 0; i < instructions.length; i++) {
        var currentStep = i + 1;
        var instructionsString = instructions[i].step;
        $("#steps").append("<li>" + currentStep + ". " + instructionsString + "</li>")
        currentStep++;
    }
}

//autocomplete function for search bar
function searchByIngredient() {
    var userInput = $("#search-bar").val();

    searchByIngredientURL = "https://api.spoonacular.com/recipes/autocomplete?query=" + userInput + "&numbers=5&apiKey=" + spoonacularKey;

    fetch(searchByIngredientURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var searchData = [];
            for (var i = 0; i < data.length; i++) {
                searchData[i] = data[i].title
            }
            $("#search-bar").autocomplete({
                source: searchData
            })
        })
}

function searchedRecipe(event){
    var userInput = event.target.innerText;
    console.log(userInput);
}

// Search random Cocktails
function randomDrink() {
    fetch("https://cocktails3.p.rapidapi.com/random", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "cocktails3.p.rapidapi.com",
            "x-rapidapi-key": "74f2d339b2msh8cf0e09097065dep10d3f8jsne564c60a5f87"
        }
    })
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            var drinkName = data.body[0].name;                  //drink name
            var drinkIngredients = data.body[0].ingredients;    //ingredients to drink

            //Change drink name and creates sections like ingredients
            $("#drink-name").text(drinkName);
            $("#currentDrink").append("<ul id=\"drink-ingredients\"></ul>");
            $("#drink-ingredients").append("<h3>Ingredients</h3>");

            //li elements for drinks
            for (let i = 0; i < drinkIngredients.length; i++) {
                $("#drink-ingredients").append("<li>" + drinkIngredients[i] + "</li>")
            }
        });
};

//removes current content of recipe
function removeCurrentRecipe() {
    $("#ingredients").remove();
    $("#steps").remove();
}

//remove current drink
function removeCurrentDrink() {
    $("#drink-ingredients").remove();
}

$("#searchBtn").click(function () {
    searchByIngredient();
})

$("#generateRandomRecipe").click(function (event) {
    removeCurrentRecipe();
    randomRecipe();
})

$("#search-bar").keydown(function () {
    searchByIngredient();
})

$("ul").click(function(event){
    console.log(event.target.innerText);
    var userInput = event.target.innerText;
    console.log(userInput);
    searchedRecipe();
})

$("#generateRandomDrink").click(function(event){
    removeCurrentDrink();
    randomDrink();

})

// $("body").click(function(event){
//     console.log(event.target);
//     console.log(event.target.innerText);
// })