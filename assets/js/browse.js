var apiKey = "e847de5a9548492c99c3bc645cdafa81"
var searchInput = document.getElementById('search');
//function to take the input from the search bar
function getUserInput() {
    var userInput = document.getElementById("search").value;
    return userInput
}
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
    var gamePrice = document.getElementById("cib-price");
    console.log(userInput)
    fetch('https://api.rawg.io/api/games?key=e847de5a9548492c99c3bc645cdafa81&search=' + userInput)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        gameStats.textContent = "";
        //add desired data to card
        for (var i=0; i<data.results.length; i++){
        var main = document.querySelector("main")
        var row = document.createElement("div");
        row.setAttribute("class", "row")
        main.appendChild(row);
        //create column and append it to the row
        var column = document.createElement("div");
        column.setAttribute("class", "column")
        row.appendChild(column);
        //create card and append it to the column
        var card = document.createElement("div");
        card.setAttribute("class", "card white-text card-panel red lighten-2" );
        column.appendChild(card);

        }
        card.textContent = "Your game is available on the following consoles: " + data.results[0].platforms[0].platform.name;
        gameStats.appendChild(card)
    })
}
//click function for getRawgData
document.getElementById("gamebutton").addEventListener("click", (event) => {
    event.preventDefault();
    getRawgData();
});




