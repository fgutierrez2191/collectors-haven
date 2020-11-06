var priceCall = function() {
    
    var game = ['deathstranding', 'borderlands'];
    
    game.forEach(vGame => { 
        fetch('https://www.pricecharting.com/api/product?t=b6347e4a9a79ac34e52eadd448892dfc961d6569&q=' + vGame)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response)
        })
    })
    }
    priceCall();