//afe8f8ce140548eaaabaa3febe07b051
///Yujen

spoonacularKey = "62e06ed2bdb843f98dcd0f5d825b6103";

generateRandomRecipeURL = "https://api.spoonacular.com/recipes/random?number=1&apiKey=" + spoonacularKey;
searchRecipe = "https://api.spoonacular.com/recipes/autocomplete?number=1&apiKey=" + spoonacularKey;

//jQuery Autocomplete
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
            var dishImage = data.recipes[0].image                                                       //url to image of dish

            //changes header of dish name and steps
            $("#currentDish").append("<h2>" + dishName + "</h2><img src=\"" + image +"\">");
            $("#ing").append("<ul id=\"ingredients\">");
            $("#progress").append("</ul><ol id=\"steps\"></ol>");
            $("#currentDish").append("<h2>" + dishName + "</h2 id=\"dishName\"><img id=\"dishImage\" src=\"" + dishImage + "\"><ul id=\"ingredients\"></ul><ol id=\"steps\"></ol>");
            $("#ingredients").append("<h3>Ingredients</h3>");
            $("#steps").append("<h3>Steps</h3>");

            //make li element for ingredients
            for(let i = 0; i < ingredientList.length; i++){
                $("#ingredients").append(
            // "<img src=\"" + ingredientList[i].image + "\">
            "<li>"  + ingredientList[i].name + "aount:" 
                +ingredientList[i].measures.us.amount + " " 
                + ingredientList[i].measures.us.unitLong +"</li>")
            for (let i = 0; i < ingredientList.length; i++) {
                $("#ingredients").append("<li>" + ingredientList[i].name + "</li>")
            }
            console.log(ingredientList)

            //make li elements for the steps
            for (let j = 0; j < instructions.length; j++) {
                var currentStep = j + 1;
                var instructionsString = instructions[j].step;
                $("#steps").append("<li>" + currentStep + ". " + instructionsString + "</li>")
                currentStep++;
            }
        })
}

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
            $("searchBar").autocomplete({
                source: data
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

