    // GLOBAL VARIABLES
var main = document.querySelector("main");
var row = document.createElement("div");
    // CREATES ROW
row.className = "row";
main.appendChild(row);
    


var priceCall = function() {

    var game = JSON.parse(localStorage.getItem('collection'));
    console.log(typeof game);    

    game.forEach(vGame => { 
        fetch('https://www.pricecharting.com/api/products?t=b6347e4a9a79ac34e52eadd448892dfc961d6569&q=' + vGame)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response)
                    // column
                var column = document.createElement("div");
                column.className = "col l2";
                row.appendChild(column);

                // card
            var card = document.createElement("div");
            card.className = "card medium";
            column.appendChild(card);

                //CARD-ACTION-AREA
            var cardAction = document.createElement("div");
            cardAction.className = "card-action";
            card.appendChild(cardAction);
                // GAME-NAME
                var gameName = document.createElement("h5");
                gameName.className = "center-align";
                gameName.textContent = response.products[0]["product-name"];
                cardAction.appendChild(gameName);
                
                //CARD-IMAGE
            var cardImage = document.createElement("div");
            cardImage.className = "card-image";
            card.appendChild(cardImage);

            var rawgImg = function() {
                fetch('https://api.rawg.io/api/games?key=e847de5a9548492c99c3bc645cdafa81&search=' + vGame)
                .then(function(response) {
                    return response.json();
                })
                .then(function(response) {
                    console.log(response);
                    var image = document.createElement("img");
                    image.setAttribute("src", response.results[0].background_image);
                    cardImage.appendChild(image);

                    //slug
                    var slug = response.results[0].slug;

                    //LINK TO DESCRIPTION
                var descriptionLink = document.createElement("a");
                descriptionLink.textContent = "Game Description";
                descriptionLink.setAttribute("href", "./description.html?game=" + slug);
                cardContent.appendChild(descriptionLink);
                })
            }
            

                //CARD-CONTENT
            var cardContent = document.createElement("div");
            cardContent.className = "card-content";
            card.appendChild(cardContent);
                 //CONSOLE
                var consoleName = document.createElement("p");
                consoleName.textContent = "Console: " + response.products[0]["console-name"];
                cardContent.appendChild(consoleName);
                //CIB-PRICE
                var gameDescription = document.createElement("p");
                gameDescription.textContent = "Cib-price: $" + response.products[0]["cib-price"] / 100;
                cardContent.appendChild(gameDescription);
                rawgImg();
        })
    })
}
    // function();
    priceCall();