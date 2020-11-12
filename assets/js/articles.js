document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.carousel');
    var options = {
        fullWidth: true,
        indicators: true,
    };
    var instances = M.Carousel.init(elems, options);
});


