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

    // check if an element is visible on screen
    function isOnScreen(element) {
        const isOnScreen = element.getBoundingClientRect();
        return (
            isOnScreen.top >= 0 &&
            isOnScreen.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }
    
    // if emoji is visible add animation
    const emojis = document.getElementsByClassName('testimonial__memoji');
    if (emojis) {
        window.addEventListener('scroll', () => {
            Array.from(emojis).forEach(emoji => {
                let animationClass = 'turn-right';
                if (emoji.classList.contains('memoji__left')) animationClass = 'turn-left';

                if (isOnScreen(emoji)) emoji.classList.add(animationClass);
                else emoji.classList.remove(animationClass);
            });
        });
    }

    // add animation to hero section on mouseover
    const heroSection = document.querySelector('.header-home__hero-section');
    heroSection.addEventListener('mouseover', () => { heroSection.classList.add("hero-animation") });
    heroSection.addEventListener('mouseleave', () => { heroSection.classList.remove("hero-animation") });
});