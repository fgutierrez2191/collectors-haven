document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.carousel');
    var options = {
        fullWidth: true,
        indicators: true,
        duration: 3000,
    };
    var instances = M.Carousel.init(elems, options);
});


