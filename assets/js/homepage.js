//afe8f8ce140548eaaabaa3febe07b051

spoonacularKey = "62e06ed2bdb843f98dcd0f5d825b6103";
generateRandomRecipeURL = "https://api.spoonacular.com/recipes/random?number=1&apiKey=" + spoonacularKey;



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
            $("#currentDish").append("<ul id=\"ingredients\"></ul><ol id=\"steps\"></ol>");
            $("#ingredients").append("<h2>" + dishName + "</h2>");
            $("#steps").append("<h2>Steps</h2>");

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