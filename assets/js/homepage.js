//afe8f8ce140548eaaabaa3febe07b051
//0d6b19fe0c2b4f04a50900e6cfded5f0/Yujen
spoonacularKey = "62e06ed2bdb843f98dcd0f5d825b6103";
cocktailsKey = "74f2d339b2msh8cf0e09097065dep10d3f8jsne564c60a5f87";
searchDrink = "https://cocktails3.p.rapidapi.com/random" + cocktailsKey;

var searchButton = document.getElementById('search-button');

function randomRecipe() {
    generateRandomRecipeURL = "https://api.spoonacular.com/recipes/random?number=1&apiKey=" + spoonacularKey;

    fetch(generateRandomRecipeURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var dishName = data.recipes[0].title;                                                   //name of dish
            var ingredientList = data.recipes[0].extendedIngredients;                               //array ingredients
            var instructions = data.recipes[0].analyzedInstructions[0].steps;                       //array of ingredients
            var dishImage = data.recipes[0].image

            //changes header of dish name and steps
            $("#currentDish").append("<h2>" + dishName + "</h2 id=\"dishName\"><img id=\"dishImage\" src=\"" + dishImage + "\"><ul id=\"ingredients\"></ul><ol id=\"steps\"></ol>");
            $("#ingredients").append("<h3>Ingredients</h3>");
            $("#steps").append("<h3>Steps</h3>");

            //make li element for ingredients
            for (let i = 0; i < ingredientList.length; i++) {$("#ingredients").append("<li>" + ingredientList[i].name + "</li>")}

            //make li elements for the steps
            for (var i = 0; i < instructions.length; i++) {
                var currentStep = i + 1;
                var instructionsString = instructions[i].step;
                $("#steps").append("<li>" + currentStep + ". " + instructionsString + "</li>")
                currentStep++;
            }
        })
}

//function randomDrink() {
    // fetch("https://cocktails3.p.rapidapi.com/random", {
    //     "method": "GET",
    //     "headers": {
    //         "x-rapidapi-host": "cocktails3.p.rapidapi.com",
    //         "x-rapidapi-key": "74f2d339b2msh8cf0e09097065dep10d3f8jsne564c60a5f87"
    //     }
    // })
    // .then(response => {
    //     console.log(response);
    //     return response.json();
    // })
    // .then(function (data) {
    //     console.log(data.body[0]);
    //     var drinkName = data.body[0].name;
    //     var drinkIngredients = data.body[0].ingredients;
        
    //     //Change drink name and creates sections like ingredients
    //     $("#currentDrink").append("<h2>" + drinkName + "</h2> <ul id=\"drinkIngredients\"></ul>");
    //     //$("#drinkIngredients").append("<h3>Ingredients</h3>");
    //     //$("#drinkSteps").append("<h3>Steps</h3>");

    //     //li elements for drinks
    //     for(let i = 0; i < drinkIngredients.length; i++){
    //         $("#ingredients").append("<li>" + drinkIngredients[i].ingredientList + "</li>")
    //     }
    // });
//};

// function removeCurrentDrink(){
//     $("#drinkIngredients").remove();
//     $("#drinkSteps").remove();
// }

// $("#generateRandomDrink").click(function(event){
//     removeCurrentDrink();
//     randomDrink();
// })

//removes current content of recipe
function removeCurrentRecipe() {
    $("#dishName").remove();
    $("#dishImage").remove();
    $("#ingredients").remove();
    $("#steps").remove();
}

function searchByIngredient() {
    var userInput = $("#searchBar").val();

    searchByIngredientURL = "https://api.spoonacular.com/recipes/autocomplete?query=" + userInput + "&numbers=5&apiKey=" + spoonacularKey;

    fetch(searchByIngredientURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var searchData = [];
            for(var i = 0; i < data.length; i++){
                searchData[i] = data[i].title
            }
            console.log(searchData);
            $("#searchBar").autocomplete({
                source: searchData
            })
        })
}

$("#searchBtn").click(function () {
    searchByIngredient();
})

$("#generateRandomRecipe").click(function (event) {
    removeCurrentRecipe();
    randomRecipe();
})

searchByIngredient();