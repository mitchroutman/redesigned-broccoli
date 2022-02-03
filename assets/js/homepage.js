//afe8f8ce140548eaaabaa3febe07b051
//0d6b19fe0c2b4f04a50900e6cfded5f0/Yujen
spoonacularKey = "";
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

//autocomplete function for search bar
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


// Search random Cocktails
function randomDrink() {
    fetch("https://cocktails3.p.rapidapi.com/random", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "cocktails3.p.rapidapi.com",
            "x-rapidapi-key": "74f2d339b2msh8cf0e09097065dep10d3f8jsne564c60a5f87"
        }
    })
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        console.log(data.body[0]);
        var drinkName = data.body[0].name;
        var drinkIngredients = data.body[0].ingredients;
        console.log(data.body[0].ingredients);
        
        //Change drink name and creates sections like ingredients
        $("#currentDrink").append("<h3>" + drinkName + "</h2> <ul id=\"drinkIngredients\"></ul>");
        $("#drinkIngredients").append("<h2>Ingredients</h2>");

        //li elements for drinks
        for(let i = 0; i < drinkIngredients.length; i++){
            $("#drinkIngredients").append("<li>" + drinkIngredients[i] + "</li>")
        }
    });
};

//removes current content of recipe
function removeCurrentRecipe() {
    $("#dishName").remove();
    $("#dishImage").remove();
    $("#ingredients").remove();
    $("#steps").remove();
}

$("#searchBtn").click(function () {
    searchByIngredient();
})

$("#generateRandomRecipe").click(function (event) {
    removeCurrentRecipe();
    randomRecipe();
})

searchByIngredient();

$("#generateRandomDrink").click(function(event){
    randomDrink();
})

