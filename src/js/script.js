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
    if (heroSection) {
        heroSection.addEventListener('mouseover', () => { heroSection.classList.add("hero-animation") });
        heroSection.addEventListener('mouseleave', () => { heroSection.classList.remove("hero-animation") });
    }

    // activate Owl carrousel in mobile
    function activateOwlCarrouselMobile() {
        carrouselActive = true;
        const carrouselContainers = document.querySelectorAll('.add-carrousel-mobile');
        [].forEach.call(carrouselContainers, carrouselContainer => {
            carrouselContainer.innerHTML = `<div class="owl-carousel owl-theme">
                                                ${carrouselContainer.innerHTML}
                                            </div>
                                            <div class="remove-carrousel-desktop" style="display:none">
                                                ${carrouselContainer.innerHTML}
                                            </div>`;
            $(document).ready(() => $(".owl-carousel").owlCarousel({
                items:1,
                loop:true,
                margin:20,
                autoplay:true,
                autoplayTimeout:3000,
                autoplayHoverPause:true
            }));
        });
    }

    // remove Owl carrousel in mobile
    function removeOwlCarrouselMobile() {
        carrouselActive = false;
        const carrouselContainers = document.querySelectorAll('.add-carrousel-mobile');
        const carrouselContainersCopy = document.querySelectorAll('.remove-carrousel-desktop');
        for (let i=0; i<carrouselContainers.length; i++) {
            carrouselContainers[i].innerHTML = carrouselContainersCopy[i].innerHTML;
        }
    }

    // activate or remove Owl carrousel
    let carrouselActive = false;
    if (window.innerWidth < 769) activateOwlCarrouselMobile();
    window.addEventListener('resize', () => {
        if (window.innerWidth < 769 && !carrouselActive) activateOwlCarrouselMobile();
        if (window.innerWidth > 768 && carrouselActive) removeOwlCarrouselMobile();
    });
});