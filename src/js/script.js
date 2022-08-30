document.addEventListener('DOMContentLoaded', () => {

    // add class to an element if isn't on top
    function addActiveClassNavbar(element, className) {
        let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollPosition) element.classList.add(className);
        else element.classList.remove(className);
    }

    const navbar = document.querySelector('.navbar');
    addActiveClassNavbar(navbar, 'active');
    window.addEventListener('scroll', () => {
        addActiveClassNavbar(navbar, 'active');
    });

});