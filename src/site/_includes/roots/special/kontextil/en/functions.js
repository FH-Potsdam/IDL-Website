var hoverablesElements = document.querySelectorAll('.hoverable');
var hoveredElements;

hoverablesElements.forEach(function (element) {
    element.addEventListener('mouseenter', function () {
        let exhibitIndex = element.getAttribute('data-exhibit');

        hoveredElements = document.querySelectorAll('[data-exhibit="' + exhibitIndex + '"]');
        hoveredElements.forEach(function (element) {
            element.classList.add('hover');
        });
    });

    element.addEventListener('mouseleave', function () {
        hoveredElements.forEach(function (element) {
            element.classList.remove('hover');
        });
    });
});