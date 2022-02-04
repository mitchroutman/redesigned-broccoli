//afe8f8ce140548eaaabaa3febe07b051
//0d6b19fe0c2b4f04a50900e6cfded5f0/Yujen
//74f2d339b2msh8cf0e09097065dep10d3f8jsne564c60a5f87
spoonacularKey = "62e06ed2bdb843f98dcd0f5d825b6103";
rapidapiKey = "74f2d339b2msh8cf0e09097065dep10d3f8jsne564c60a5f87"

var searchButton = document.getElementById('search-button');

//goes to api to find random recipe
function randomRecipe() {
    generateRandomRecipeURL = "https://api.spoonacular.com/recipes/random?number=1&apiKey=" + spoonacularKey;

    fetch(generateRandomRecipeURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (info) {
            insertRecipe(info.recipes[0]);
        })
}

function findRecipe(recipe){
    var userInput = recipe;

    var searchRecipeURL = "https://api.spoonacular.com/recipes/" + userInput + "/information?apiKey=" + spoonacularKey;
    fetch(searchRecipeURL)
        .then(function(response){
            return response.json();
        })
        .then(function(info){
            removeCurrentRecipe();
            insertRecipe(info);
        })
}

//inserts recipe found into html page
function insertRecipe(data) {
    var dishName = data.title;                                                   //name of dish
    var ingredientList = data.extendedIngredients;                               //array ingredients
    var instructions = data.analyzedInstructions[0].steps;                       //array of ingredients
    var dishImage = data.image                                                   //URL for image

    //changes header of dish name ingredients and steps
    $("#dish-name").text(dishName);
    $("#dish-image").attr("src", dishImage);
    $("#current-dish").append("<ol id=\"steps\"></ol>");
    $("#pic-and-ing").append("<ul id=\"ingredients\"></ul>")
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

    var searchByIngredientURL = "https://api.spoonacular.com/recipes/autocomplete?query=" + userInput + "&numbers=5&apiKey=" + spoonacularKey;

    fetch(searchByIngredientURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var searchData = [];
            var recipeData = data;
            console.log(recipeData);
            for (var i = 0; i < data.length; i++) {
                searchData[i] = data[i].title
            }
            $("#search-bar").autocomplete({
                source: searchData,
                select: function(evenet, ui){
                    var selection = event.target.innerText;
                    for(var i = 0; i < searchData.length; i++){
                        if(selection == recipeData[i].title){
                            var recipeId = recipeData[i].id;
                            findRecipe(recipeId);
                            break;
                        }
                    }
                }
            })
        })
}

function searchedRecipe(event) {
    var userInput = event.target.innerText;
    console.log(userInput);
}

// Search random Cocktails
function randomDrink() {
    fetch("https://cocktails3.p.rapidapi.com/random", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "cocktails3.p.rapidapi.com",
            "x-rapidapi-key": rapidapiKey
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var drinkName = data.body[0].name;                  //drink name
            var drinkIngredients = data.body[0].ingredients;    //ingredients to drink

            //Change drink name and creates sections like ingredients
            $("#drink-name").text(drinkName);
            $("#current-drink").append("<ul id=\"drink-ingredients\"></ul>");
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

//On the click of this article it will call these two functions
$("#generateRandomRecipe").click(function (event) {
    removeCurrentRecipe();
    randomRecipe();
})

//Every keyboard input will call the search function
$("#search-bar").keydown(function () {
    searchByIngredient();
})

//On the click of this article it will call these two functions
$("#generateRandomDrink").click(function (event) {
    removeCurrentDrink();
    randomDrink();
})
