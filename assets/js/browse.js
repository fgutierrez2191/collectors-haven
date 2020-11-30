var searchInput = document.getElementById('search');

//add searched values to local storage
var searchHistory = JSON.parse(localStorage.getItem('search-history')) || [];
gamebutton.addEventListener('click', function (event) {
   // event.preventDefault();
var searchTerm = searchInput.value;
    searchHistory.push(searchTerm);
  localStorage.setItem('search', JSON.stringify(searchHistory));
  console.log(searchHistory);
});

//function to make fetch request to rawg api 
function getRawgData() {
    var userInput = document.getElementById("search").value; 
    var gameStats = document.getElementById("search-results");
    console.log(userInput)
    fetch('https://api.rawg.io/api/games?key=e847de5a9548492c99c3bc645cdafa81&search=' + userInput)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        //add desired data to card
        for (var i=0; i<data.results.length; i++){
            var main = document.querySelector("main");
            //ROW
            var row = document.createElement("div");
            row.className = "row";
            main.appendChild(row);

            //create column
            var column = document.createElement("div");
            column.className = "col l12";
            row.appendChild(column);

            //create card
            var card = document.createElement("div");
            card.className = "card";
            column.appendChild(card);

                //CARD Action
                var cardAction = document.createElement("div");
                cardAction.className = "card-action";
                card.appendChild(cardAction);
                    // Title
                    var gameName = document.createElement("h4");
                    gameName.className = "center-align";
                    gameName.textContent = userInput;
                    cardAction.appendChild(gameName);

                //CARD Image
                var cardImage = document.createElement("div");
                cardImage.className = "card-image";
                card.appendChild(cardImage);
                    //IMAGE
                    var gameImg = document.createElement("img");
                    gameImg.setAttribute("src", data.results[0].background_image);
                    cardImage.appendChild(gameImg);
                    //ADD BTN
                    var addBtn = document.createElement("span");
                    addBtn.className = "btn btn-floating halfway-fab waves-effect waves-light red";
                    cardImage.appendChild(addBtn);
                            // PLUS ICON
                        var icon = document.createElement("i");
                        icon.className = "material-icons";
                        icon.setAttribute("id", "addButton");
                        icon.textContent = "add";
                        addBtn.appendChild(icon);

                //CARD Content
                var cardContent = document.createElement("div");
                cardContent.className = "card-content";
                card.appendChild(cardContent);
                    //Content Text
                        // Unordered List
                    var cardInfo = document.createElement("ul");
                    cardInfo.className = "center-align";
                    cardContent.appendChild(cardInfo);
                            // List elements
                                // 1
                            var releaseDate = document.createElement("li");
                            releaseDate.textContent = "Released on: " + data.results[0].released;
                            cardContent.appendChild(releaseDate);
                                // 2
                            var rating = document.createElement("li");
                            rating.textContent = "Rating out of 5: " + data.results[0].rating;
                            cardContent.appendChild(rating);
        }
        gameStats.appendChild(card)
    })
}
//click function for getRawgData
document.getElementById("gamebutton").addEventListener("click", (event) => {
    event.preventDefault();
    getRawgData();
});
var collection = [];
document.body.addEventListener
("click", (event) => {
    if( event.target.id == 'addButton' ) {
    var searchTerm = searchInput.value;
    collection.push(searchTerm);
    console.log(collection);
    localStorage.setItem('collection', JSON.stringify(collection));
    }
});