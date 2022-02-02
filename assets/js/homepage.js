//afe8f8ce140548eaaabaa3febe07b051
//0d6b19fe0c2b4f04a50900e6cfded5f0//Yujen

spoonacularKey = "";

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
            var image = data.recipes[0].image

            //changes header of dish name and steps
            $("#currentDish").append("<h2>" + dishName + "</h2 id=\"dishName\"><img id=\"dishImage\" src=\"" + image +"\"><ul id=\"ingredients\"></ul><ol id=\"steps\"></ol>");
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
    $("#dishName").remove();
    $("#dishImage").remove();
    $("#ingredients").remove();
    $("#steps").remove();
}

$("#generateRandomRecipe").click(function(event){
    removeCurrentRecipe();
    randomRecipe();
})

// searchIngredientURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + ingredient + "&numbers=5&apiKey=" + spoonacularKey