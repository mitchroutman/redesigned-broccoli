//afe8f8ce140548eaaabaa3febe07b051

<<<<<<< HEAD
spoonacularKey = "62e06ed2bdb843f98dcd0f5d825b6103";
=======
spoonacularKey = "23d3f98f86ee4a9f96d79a08b3d29065";
>>>>>>> 458bb344d6bb36312658be2226edc49d6364d7e2
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
            $("#currentDish").append("<ul id=\"ingredients\"></ul><ol id=\"steps\"></ol>");
            $("#ingredients").append("<h2>" + dishName + "</h2>");
            $("#steps").append("<h2>Steps</h2>");

            //make li element for ingredients
            for(let i = 0; i < ingredientList.length; i++){
                $("#ingredients").append("<li>" + ingredientList[i].name + "</li>")
            }

<<<<<<< HEAD
            //make li elements for the steps
=======
>>>>>>> 33abb4343f56455fd039176318b7756fa953eb0d
            for(let j = 0; j < instructions.length; j++){
                var currentStep = j + 1;
                var instructionsString = instructions[j].step;
                $("#steps").append("<li>"+ currentStep + ". " + instructionsString + "</li>")
                currentStep++;
            }
        })
}

<<<<<<< HEAD
function removeCurrentRecipe(){
    $("#ingredients").remove();
    $("#steps").remove();
}

$("#generateRandomRecipe").click(function(event){
    removeCurrentRecipe();
    randomRecipe();
})

=======

function renderByIngredient() {
    console.log("Clicked Search")
    fetch(generateRandomRecipeURL)
    .then(function (response) {
        //console.log(response)
        return response.json();
    })
    .then(function (data) {
        var dishName = data.recipes[0].title;
        var ingredientList = data.recipe[0].extendedIngredients;
        var instructions = data.recipe[0].analyzedInstructions[0].steps;
    })
}

searchButton.addEventListener('click', renderByIngredient);
renderRecipe();
>>>>>>> 458bb344d6bb36312658be2226edc49d6364d7e2
// searchIngredientURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + ingredient + "&numbers=5&apiKey=" + spoonacularKey