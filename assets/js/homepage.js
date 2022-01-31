apiKey = "";
apiURL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey;

fetch(apiURL)
    .then(function(response){
        console.log(response.json());
        // return response.json();
    })
    .then(function(data){

    })