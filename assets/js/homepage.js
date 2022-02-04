//afe8f8ce140548eaaabaa3febe07b051
//0d6b19fe0c2b4f04a50900e6cfded5f0/Yujen
spoonacularKey = "23d3f98f86ee4a9f96d79a08b3d29065";
cocktailsKey = "";
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
            var dishImage = data.recipes[0].image                                                   //array of images
            var ingAndPicDiv = document.createElement("div")
            ingAndPicDiv.setAttribute("id", "ingAndPic")
            var picAndNameDiv = document.createElement("div")
            picAndNameDiv.setAttribute("id", "picAndName")
            var dishNameH2 = document.createElement("h2")
            dishNameH2.setAttribute("id", "dishName")
            var dishImageImg = document.createElement("img")
            dishImageImg.setAttribute("id", "dishImage")
            var ingredientsUl = document.createElement("ul")
            ingredientsUl.setAttribute("id", "ingredients")
            ingredientsUl.setAttribute("class", "list-group")
            var stepsOl = document.createElement("ol")
            stepsOl.setAttribute("id", "steps")
            var currentDishId = document.querySelector("#currentDish")

            // console.log(dishName)
            dishNameH2.textContent = dishName
            dishImageImg.src = dishImage
            picAndNameDiv.append(dishNameH2, dishImageImg)


            //changes header of dish name and steps
            // $("#currentDish").append("<h2>" + dishName + "</h2 id=\"dishName\"><img id=\"dishImage\" src=\"" + dishImage + "\"><ul id=\"ingredients\"></ul><ol id=\"steps\"></ol>");
            // $("#ingredients").append("<h3>Ingredients</h3>");
            // $("#steps").append("<h3>Steps</h3>");

            //make li element for ingredients
            // console.log(ingredientList)

            // ingredientlist
            for (let i = 0; i < ingredientList.length; i++) {
                var ingredientString = ingredientList[i].original
                var ingredientLi = document.createElement("li")

                ingredientsUl.appendChild(ingredientLi).setAttribute("class", "list-group-item")
                ingredientLi.textContent = ingredientString
                ingredientString++;

            }
            //adding name and ingredients to div
            ingAndPicDiv.append(picAndNameDiv, ingredientsUl)

            //make li elements for the steps
            for (var i = 0; i < instructions.length; i++) {
                var currentStep = i + 1;
                // console.log(currentStep)
                var instructionsString = instructions[i].step;
                // console.log(instructionsString)
                var stepLi = document.createElement("li")
                var instructionLi = document.createElement("li")

                stepsOl.appendChild(stepLi)
                stepLi.textContent = currentStep
                stepsOl.appendChild(instructionLi).setAttribute("class", "stepInstruction")
                instructionLi.textContent = instructionsString
                currentStep++;
            }
            currentDishId.appendChild(ingAndPicDiv)
            currentDishId.appendChild(stepsOl)
        })
}

//autocomplete function for search bar
function searchByIngredient() {
    var userInput = $("#search-bar").val();

    searchByIngredientURL = "https://api.spoonacular.com/recipes/autocomplete?query=" + userInput + "&numbers=5&apiKey=" + spoonacularKey;

    fetch(searchByIngredientURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var searchData = [];
            for (var i = 0; i < data.length; i++) {
                searchData[i] = data[i].title
            }
            $("#search-bar").autocomplete({
                source: searchData
            })
                .then(function (data) {
                    var searchData = [];
                    for (var i = 0; i < data.length; i++) {
                        searchData[i] = data[i].title
                    }
                    console.log(searchData);
                    $("#searchBar").autocomplete({
                        source: searchData
                    })
                })
        })
    }

    // Search random Cocktails
    function randomDrink() {
        fetch("https://cocktails3.p.rapidapi.com/random", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "cocktails3.p.rapidapi.com",
                "x-rapidapi-key": ""
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
            });
    };
    // // Search random Cocktails
    // function randomDrink() {
    //     fetch("https://cocktails3.p.rapidapi.com/random", {
    //         "method": "GET",
    //         "headers": {
    //             "x-rapidapi-host": "cocktails3.p.rapidapi.com",
    //             "x-rapidapi-key": ""
    //         }
    //     })

    //     $("#generateRandomRecipe").click(function (event) {
    //         removeCurrentRecipe();
    //         randomRecipe();
    //     })

    //         //li elements for drinks
    //         for(let i = 0; i < drinkIngredients.length; i++){
    //             $("#drinkIngredients").append("<li>" + drinkIngredients[i] + "</li>")
    //         }
    //     };
    // };

    //removes current content of recipe
    function removeCurrentRecipe() {
        $("#dishName").remove();
        $("#dishImage").remove();
        $("#ingredients").remove();
        $("#steps").remove();
    }

    //remove current drink
    function removeCurrentDrink() {
        $("#drinkName").remove();
        $("#drinkIngredients").remove();
    }

    $("#searchBtn").click(function () {
        searchByIngredient();
    })

    $("#generateRandomRecipe").click(function (event) {
        removeCurrentRecipe();
        randomRecipe();
        saveRecipe();
    })

    $("#search-bar").keydown(function () {
        searchByIngredient();
    })


    $("#generateRandomDrink").click(function (event) {
        removeCurrentDrink();
        randomDrink();
    })


//storage
function saveRecipe() {
    if (localStorage) {
        var recipe = document.getElementById('currentDish');
        localStorage.setItem(recipe.innerHTML);
        console.log("Clicked button")
    } else {
        console.log("error");
    }
}
window.localStorage.getItem('user');