//afe8f8ce140548eaaabaa3febe07b051

spoonacularKey = "23d3f98f86ee4a9f96d79a08b3d29065";

generateRandomRecipeURL = "https://api.spoonacular.com/recipes/random?number=1&apiKey=" + spoonacularKey;
searchRecipe = "https://api.spoonacular.com/recipes/autocomplete?number=1&apiKey=" + spoonacularKey;

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

            //changes header of dish name and steps
            $("#currentDish").append("<h2>" + dishName + "</h2><ul id=\"ingredients\"></ul><ol id=\"steps\"></ol>");
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