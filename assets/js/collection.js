var priceCall = function() {
    
var game = "spiderman";

    fetch('https://www.pricecharting.com/api/products?t=b6347e4a9a79ac34e52eadd448892dfc961d6569&q=' + game)
    .then(function(response) {
        return response.json();
    })

    .then(function(response) {
        console.log(response);
    })
}
priceCall();