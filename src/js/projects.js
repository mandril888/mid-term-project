document.addEventListener('DOMContentLoaded', () => {

    // randoms numbers arr
    function getRandomNumsArr(num) {
        let arrNums = [];
        for (let i=1; i <= num; i++) arrNums.push(i);
        return arrNums.sort((a, b) => 0.5 - Math.random());
    }

    // create project card HTML
    function createProjectCardHtml(project) {
        const srcImgCard = "/src/assets/projects-section/" + project.image;
        const titleCard = project.name;
        const catCard = project.categories.join(' & ');
        const linkCard = "/projects.html?project=" + project.key;
        return `<div class="project-card">
            <img class="project-card__img" src="${srcImgCard}" alt="${titleCard}">
            <div class="project-card__container">
                <div class="project-card__container-top">    
                    <h3 class="project-card__title">${titleCard}</h3>
                    <p class="project-card__text">${catCard}</p>
                </div>
                <a href="${linkCard}" class="project-card__link">Learn more</a>
            </div>
        </div>`;
    }

    // set projects related data from a category project
    function setProjectsRelated(data, projectId) {
        const categoryProject = data.items.filter(el => el.key === projectId)[0].categories;
        const relatedProjects = data.items.filter(el => el.categories.join('').includes(categoryProject[0]) && (el.key !== projectId));
        const projectsToShow = getRandomNumsArr(relatedProjects.length).slice(0,3);
        let htmlProjectContainer = '';
        
        projectsToShow.forEach(id => {
            htmlProjectContainer += createProjectCardHtml(relatedProjects[id-1]);
        });
        
        const projectContainer = document.querySelector('.projects__container');
        projectContainer.innerHTML = htmlProjectContainer;
    }

    // activate Owl carrousel in all resolutions
    function activateOwlCarrouselAllResolutions() {
        const carrouselContainers = document.querySelectorAll('.add-carrousel');
        [].forEach.call(carrouselContainers, carrouselContainer => {
            carrouselContainer.innerHTML = `<div class="owl-carousel owl-theme">
                                                ${carrouselContainer.innerHTML}
                                            </div>`;
            $(document).ready(() => $(".add-carrousel .owl-carousel").owlCarousel({
                items:1,
                responsive : {
                    768 : {
                        items : 3
                    }
                },
                loop:true,
                margin:20,
                autoplay:true,
                autoplayTimeout:3000,
                autoplayHoverPause:true
            }));
        });
    }

    // set last projects data
    function setLastProjects(data) {
        const projectsToShow = data.items;
        let htmlProjectContainer = '';
        
        projectsToShow.forEach(project => {
            htmlProjectContainer += createProjectCardHtml(project);
        });
        
        const projectContainer = document.querySelector('.projects__container');
        projectContainer.innerHTML = htmlProjectContainer;
        activateOwlCarrouselAllResolutions();
    }

    // set data of a project to template
    function setDataToProject(data, projectId) {
        const dataReceived = (projectId) ? data.items.filter(el => el.key === projectId)[0] : data.items[0];
        const landingTitle = document.querySelector('.landing__title');
        const landingInfoTitle = document.querySelector('.landing__info-title');
        const landingInfoDate = document.querySelector('.landing__info-date');
        const landingBanner = document.querySelector('.landing__banner');
        const landingText = document.querySelector('.landing__text');

        const dateCompleted = new Date(dataReceived.completed);
        const day = dateCompleted.getDate();
        const month = dateCompleted.toLocaleString('default', { month: 'long' });
        const monthCapitaliced = month.charAt(0).toUpperCase() + month.slice(1);
        const year = dateCompleted.getFullYear();

        document.title = dataReceived.name + " - Circle";
        landingTitle.innerHTML = dataReceived.name;
        landingInfoTitle.innerHTML = dataReceived.categories.join(' & ');
        landingInfoDate.innerHTML = `Completed on ${monthCapitaliced} ${day}, ${year}`;
        landingBanner.src = "/src/assets/projects-section/" + dataReceived.image;
        landingBanner.alt = dataReceived.name;
        landingText.innerHTML = dataReceived.description.join('<br><br>');
    }

    // get projects data from Deta endpoint
    function getProjectsData() {
        return new Promise((resolve, reject) => {
            const url = 'https://database.deta.sh/v1/a0wwnrex/projects/query'; 
            const body = { query: [{}] };
            const fetchParams = {
                method: 'POST',
                headers: {
                    "Accept": 'application/json',
                    "Content-Type": 'application/json',
                    "X-API-Key": 'a0wwnrex_JeRhBybn5iFYziStv9d2M6Mchd2b4B4H'
                },
                body: JSON.stringify(body)
            };
        
            fetch(url, fetchParams)
                .then(response => response.json())
                .then(data => {
                    if (data.paging.size) resolve(data);
                    else reject('Error')
                })
        });
    }

    // get guery url parameters
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    // get project id from query url and then fill all data
    const projectQueryId = params.project;
    if (projectQueryId) {
        getProjectsData()
            .then(data => {
                document.querySelector('.loader__container').style.display = 'none';
                setDataToProject(data, projectQueryId);
                setProjectsRelated(data, projectQueryId);
            })
    }

    // if exists recent project block fill all data
    const recentProjects = document.getElementById('recent-projects');
    if (recentProjects) {
        getProjectsData()
            .then(data => {
                document.querySelector('.loader__container').style.display = 'none';
                setLastProjects(data);
            })
    }
});