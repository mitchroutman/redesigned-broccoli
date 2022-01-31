apiKey = "";
apiURL = "" + apiKey;

fetch(apiURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){

    })