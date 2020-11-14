/*document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.carousel');
    var options = {
        fullWidth: true,
        indicators: true,
    };
    var instances = M.Carousel.init(elems, options);
});*/
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.slider');
    var options = {
        indicators: true,
        height: 700
    };
    var instances = M.Slider.init(elems, options);
});



