var apiKey = "6437d7b67fed4c86b31916a8970016a6";
var gameID = "valorant";


var getGameInfo = function() {
    //format the rawg
    var apiUrl = `https://api.rawg.io/api/games/${gameID}?key=${apiKey}`;

    //make a request to the url
    fetch (apiUrl)
    .then(description => {
        return description.json();
    }).then(displayGameInfo);
};

var displayGameInfo = function(description) {
    var gameTitle = document.getElementById("game-title");
    gameTitle.innerText=`${description.name}`;
    
    
    var developer = document.getElementById("game-developer");
    developer.innerText=`${description.developers[0].name}`;

    var gameScreenshot = document.getElementById("game-img");
    gameScreenshot.src = description.background_image;

    var esrbRating = document.getElementById("game-rating");
    if (description.esrb_rating != null){
        esrbRating.innerText=`${description.esrb_rating.name}`;
    } else {
        esrbRating.innerText="N/A";
    }

    var metascore = document.getElementById("game-meta");
    if (description.metacritic != null) {
        metascore.innerText=`${description.metacritic}`;
    } else {
        metascore.innerText="N/A"
    }
    metascore.classList.remove("meta-good", "meta-better", "meta-best")
    if (description.metacritic <= 49) {
        metascore.classList.add("meta-good");
    } else if (description.metacritic >= 50 && description.metacritic <=74) {
        metascore.classList.add("meta-better");
    } else {
        metascore.classList.add("meta-best");
    };

    var gameDescription = document.getElementById("game-description");
    gameDescription.innerText = `${description.description_raw}`;

};

var similarGames = function() {
    var apiUrl = `https://api.rawg.io/api/games/${gameID}/suggested?apikey=${apiKey}`;

    fetch(apiUrl)
    .then(similar => {
        return similar.json();
    }).then(displaySimilarGames);
}

var displaySimilarGames = function(similar) {
    similar.results.forEach( (element, index) => {
        if (index >= 4) {
            return;
        } else {
            var containerEl = document.getElementById("similar-games-container");

            //create div for each similar games
            var similarCardEl = document.createElement("div")
            similarCardEl.classList.add("card", "col", "s6");
            containerEl.appendChild(similarCardEl);

            //create div for img
            var similarImageEl = document.createElement("div")
            similarImageEl.classList.add("card-image");
            similarCardEl.appendChild(similarImageEl);
            var similarImage = document.createElement("img");
            similarImage.src = element.background_image;
            similarImageEl.appendChild(similarImage);

            //create div for similar games' title and desc
            var similarGamesContentEl = document.createElement("div");
            similarGamesContentEl.classList.add("card-content");
            similarCardEl.appendChild(similarGamesContentEl);

            //similar game title
            var similarGameTitle = document.createElement("span");
            similarGameTitle.classList.add("card-title");
            similarGameTitle.innerText = element.name;
            similarGamesContentEl.appendChild(similarGameTitle);

            var similarGameDesc = document.createElement("p");
            similarGameDesc.innerText = element.short_description;
            similarGamesContentEl.appendChild(similarGameDesc);

        };
    });
};

similarGames();
getGameInfo();