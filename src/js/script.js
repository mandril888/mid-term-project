document.addEventListener('DOMContentLoaded', () => {

    // add class to an element if isn't on top
    function addClassToElemNotOnTop(element, className) {
        let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollPosition) element.classList.add(className);
        else element.classList.remove(className);
    }

    // add 'scrolled' class to navbar on scroll
    const navbar = document.querySelector('.navbar');
    addClassToElemNotOnTop(navbar, 'scrolled');
    window.addEventListener('scroll', () => {
        addClassToElemNotOnTop(navbar, 'scrolled');
    });

    // smooth scroll to an element
    function scrollIntoViewWithOffset(element, offset) {
        if(document.querySelector(element)) {
            window.scrollTo({
                behavior: 'smooth',
                top:
                    document.querySelector(element).getBoundingClientRect().top -
                    document.body.getBoundingClientRect().top -
                    offset,
            });
        }
    }

    // smoth sroll on click # anchor
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const idElement = this.getAttribute('href');
            scrollIntoViewWithOffset(idElement, 0);
        });
    });

});