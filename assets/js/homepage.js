//afe8f8ce140548eaaabaa3febe07b051
//0d6b19fe0c2b4f04a50900e6cfded5f0//Yujen

spoonacularKey = "";
cocktailsKey = "";

generateRandomRecipeURL = "https://api.spoonacular.com/recipes/random?number=1&apiKey=" + spoonacularKey;
searchRecipe = "https://api.spoonacular.com/recipes/autocomplete?number=1&apiKey=" + spoonacularKey;

searchDrink = "https://cocktails3.p.rapidapi.com/random" + cocktailsKey;




//jQuery Autocomplete

//

var searchButton = document.getElementById('search-button');

function randomRecipe() {
    fetch(generateRandomRecipeURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var dishName = data.recipes[0].title;                                                   //name of dish
            var ingredientList = data.recipes[0].extendedIngredients;                               //array ingredients
            var instructions = data.recipes[0].analyzedInstructions[0].steps;                       //array of ingredients
            var image = data.recipes[0].image

            //changes header of dish name and steps
            $("#picAndName").append("<h2 id=\"dishName\">" + dishName + "</h2><img id=\"dishImage\" src=\"" + image +"\">");
            $("#progress").append("</ul><ol id=\"steps\"></ol>");
            $("#ingredients").append("<h3>Ingredients</h3>");
            $("#steps").append("<h3>Steps</h3>");

            //make li element for ingredients
            for(let i = 0; i < ingredientList.length; i++){
                $("#ingredients").append("<li>" + ingredientList[i].name + "</li>")
            }

            //make li elements for the steps
            for(let j = 0; j < instructions.length; j++){
                var currentStep = j + 1;
                var instructionsString = instructions[j].step;
                $("#steps").append("<li>"+ currentStep + ". " + instructionsString + "</li>")
                currentStep++;
            }
        })
}

function removeCurrentRecipe(){
    $("#ingredients").remove();
    $("#steps").remove();
}

$("#generateRandomRecipe").click(function(event){
    removeCurrentRecipe();
    randomRecipe();
})


// searchIngredientURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + ingredient + "&numbers=5&apiKey=" + spoonacularKey

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



// function removeCurrentDrink(){
//     $("#drinkIngredients").remove();
// }

$("#generateRandomDrink").click(function(event){
    randomDrink();
})

// $("#generateRandomDrink").click(function(event){
//     removeCurrentDrink();
//     randomDrink();
// })
