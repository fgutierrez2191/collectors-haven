var apiKey = "6437d7b67fed4c86b31916a8970016a6";

//get gameID from previous page
var gameID = function() {
    //grab game name from url query string
    var queryString = document.location.search;
    var gameName = queryString.split("=")[1];

    if(gameName) {
        //display game info and similar games
        similarGames(gameName);
        getGameInfo(gameName);
    } else {
        //if no game name was given, redirect to homepage
        document.location.replace("./index.html");
    }
};

//pull selected game's information from rawg api
var getGameInfo = function(selectedGame) {
    //format the rawg api
    var apiUrl = `https://api.rawg.io/api/games/${selectedGame}?key=${apiKey}`;

    //make a request to the url
    fetch (apiUrl)
    .then(description => {
        return description.json();
    }).then(displayGameInfo);
};

//display game's information to page
var displayGameInfo = function(description) {
    //set HTML title
    document.title = `${description.name} :: Collector's Haven`;

    var gameTitle = document.getElementById("game-title");
    gameTitle.innerText=`${description.name}`;
    
    
    var developer = document.getElementById("game-developer");
    developer.innerText=`${description.developers[0].name}`;

    var gameScreenshot = document.getElementById("game-img");
    gameScreenshot.src = description.background_image;

    var esrbRating = document.getElementById("game-rating");

    //some games have "null" as their esrb rating
    if (description.esrb_rating != null){
        esrbRating.innerText=`${description.esrb_rating.name}`;
    } else {
        //to fix that, the page will show N/A for such games
        esrbRating.innerText="N/A";
    }

    var metascore = document.getElementById("game-meta");
    //some games have "null" as their metacritic rating
    if (description.metacritic != null) {
        metascore.innerText=`${description.metacritic}`;
    } else {
        //to fix that, the page will show N/A for such games
        metascore.innerText="N/A"
    };

    //metascore color changes based on the metacritic score of the game
    metascore.classList.remove("meta-good", "meta-better", "meta-best")
    if (description.metacritic <= 49) {
        metascore.classList.add("meta-good");
    } else if (description.metacritic >= 50 && description.metacritic <=74) {
        metascore.classList.add("meta-better");
    } else {
        metascore.classList.add("meta-best");
    };

    var priceUrl = `https://www.pricecharting.com/api/products?t=b6347e4a9a79ac34e52eadd448892dfc961d6569&q=${description.slug}`

    //pull selected game's price from pricecharting.com's api
    fetch (priceUrl)
    .then(price => {
        return price.json();
    }).then(gamePriceEl => {
        var gamePrice = document.getElementById("game-price");

        //if no results in api, display N/A
        if (!gamePriceEl.products[0]) {
            gamePrice.innerText="N/A"
        //check if both api's are showing the same game, if not, display N/A 
        } else if (gamePriceEl.products[0]["product-name"] != description.name) {
            gamePrice.innerText="N/A"
        //if game price is 0, display "free-to-play"
        } else if (gamePriceEl.products[0]["cib-price"] == 0) {
                gamePrice.innerText="Free-to-Play"
        //if successfully pulled data, display to page
        } else {
            gamePrice.innerText = `$${gamePriceEl.products[0]["cib-price"]/100}`
        }
    })
    var gameDescription = document.getElementById("game-description");
    gameDescription.innerText = `${description.description_raw}`;
};

//pull similar games from different rawg api link
var similarGames = function(similarGame) {
    var apiUrl = `https://api.rawg.io/api/games/${similarGame}/suggested?apikey=${apiKey}`;

    fetch(apiUrl)
    .then(similar => {
        return similar.json();
    }).then(displaySimilarGames);
}

//display similar games to page
var displaySimilarGames = function(similar) {
    similar.results.forEach( (element, index) => {
        //display 6 similar games to page
        if (index >= 6) {
            return;
        } else {
            var containerEl = document.getElementById("similar-games-container");

            //create div for each similar games
            var similarCardEl = document.createElement("div")
            similarCardEl.classList.add("card", "col", "s6");
            containerEl.appendChild(similarCardEl);

            //opens description page for similar games
            var createLink = document.createElement("a");
            createLink.setAttribute("href", `description.html?game=${element.slug}`);
            similarCardEl.appendChild(createLink);

            //create div for img
            var similarImageEl = document.createElement("div")
            similarImageEl.classList.add("card-image");
            createLink.appendChild(similarImageEl);
            var similarImage = document.createElement("img");
            similarImage.src = element.background_image;
            similarImageEl.appendChild(similarImage);

            //create div for similar games' title and desc
            var similarGamesContentEl = document.createElement("div");
            similarGamesContentEl.classList.add("card-content");
            createLink.appendChild(similarGamesContentEl);

            //similar game's title
            var similarGameTitle = document.createElement("span");
            similarGameTitle.classList.add("card-title");
            similarGameTitle.innerText = element.name;
            similarGamesContentEl.appendChild(similarGameTitle);

            //similar game's description
            var similarGameDesc = document.createElement("p");
            similarGameDesc.innerText = element.short_description;
            similarGamesContentEl.appendChild(similarGameDesc);
        };
    });
};

//go back 1 page when back button is clicked
document.getElementById("back-button").addEventListener("click", () => {
    history.back()
  });
  
gameID();