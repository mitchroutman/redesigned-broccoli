//afe8f8ce140548eaaabaa3febe07b051

spoonacularKey = "23d3f98f86ee4a9f96d79a08b3d29065";
generateRandomRecipeURL = "https://api.spoonacular.com/recipes/random?number=1&apiKey=" + spoonacularKey;
searchRecipe = "https://api.spoonacular.com/recipes/autocomplete?number=1&apiKey=" + spoonacularKey;

//jQuery Autocomplete
$( function() {
    var foodChoices = [
      "Chicken",
      "Beef",
      "Pork",
      "Fish",
      "Vegetables",
      "Bacon",
    ];
    $( "#tags" ).autocomplete({
      source: foodChoices
    });
  } );
//

var searchButton = document.getElementById('search-button');

function renderRecipe() {
    fetch(generateRandomRecipeURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var dishName = data.recipes[0].title;
            var ingredientList = data.recipes[0].extendedIngredients;
            var instructions = data.recipes[0].analyzedInstructions[0].steps;
            // console.log(dishName);
            // console.log(ingredientList);
            // console.log(instructions);

            $("#nameOfCurrentDish").text(dishName);

            //make li element for ingredients
            for(let i = 0; i < ingredientList.length; i++){
                $("#ingredients").append("<li>" + ingredientList[i].name + "</li>")
            }

            for(let j = 0; j < ingredientList.length; j++){
                var currentStep = j + 1;
                var instructionsString = instructions[j].step;
                $("#steps").append("<li>"+ currentStep + ". " + instructionsString + "</li>")
                currentStep++;
            }

            //     console.log(data);                                          //data pulled                 
            //     console.log(data.recipes[0].title);                         //name of dish
            //     console.log(data.recipes[0].analyzedInstructions[0].steps); //array of steps
            //     console.log(data.recipes[0].extendedIngredients[0].name);   //name of ingredient
        })

}


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
// searchIngredientURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + ingredient + "&numbers=5&apiKey=" + spoonacularKey