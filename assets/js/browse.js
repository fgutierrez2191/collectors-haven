//create row and append it to main
var main = document.querySelector("main")
var row = document.createElement("div");
row.setAttribute("class", "row")
main.appendChild(row);
//create column and append it to the row
var column = document.createElement("div");
column.setAttribute = ("class", "column")
row.appendChild(column);
//create card and append it to the column
var card = document.createElement("div");
card.setAttribute = ("class", "card")
column.appendChild(card);

var apiKey = "e847de5a9548492c99c3bc645cdafa81"


//function to take the input from the search bar
function getUserInput() {
    var userInput = document.getElementById("search").value;
    return userInput
}
//function to make fetch request to rawg api 
function getRawgData() {
    var userInput = document.getElementById("search").value; 
    fetch('https://rawg.io/api/games/id?'+ userInput + '?key=' + apiKey + '')
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
    })
}
//on click this will call getRawgData to get data from rawg api 
document.getElementById("gamebutton").addEventListener("click", (event) => {
    event.preventDefault();
    getRawgData();
});


