document.addEventListener('DOMContentLoaded', () => {

    // randoms numbers arr
    function getRandomNumsArr(num) {
        let arrNums = [];
        for (let i=1; i <= num; i++) arrNums.push(i);
        return arrNums.sort((a, b) => 0.5 - Math.random());
    }

    // get projects related data
    function setDataRelatedProjects(data, projectId) {
        const categoryProject = data.items.filter(el => el.key === projectId)[0].categories;
        const relatedProjects = data.items.filter(el => el.categories.join('').includes(categoryProject[0]) && (el.key !== projectId));
        const projectsToShow = getRandomNumsArr(relatedProjects.length).slice(0,3);
        let htmlProjectContainer = '';
        
        projectsToShow.forEach(id => {
            const srcImgCard = "/src/assets/projects-section/" + relatedProjects[id-1].image;
            const titleCard = relatedProjects[id-1].name;
            const catCard = relatedProjects[id-1].categories.join(' & ');
            const linkCard = "/projects.html?project=" + relatedProjects[id-1].key;
            const projectCard = `<div class="project-card">
                <img class="project-card__img" src="${srcImgCard}" alt="${titleCard}">
                <div class="project-card__container">
                    <h3 class="project-card__title">${titleCard}</h3>
                    <p class="project-card__text">${catCard}</p>
                    <a href="${linkCard}" class="project-card__link">Learn more</a>
                </div>
            </div>`;
            htmlProjectContainer += projectCard;
        });
        
        const projectContainer = document.querySelector('.projects__container');
        projectContainer.innerHTML = htmlProjectContainer;
    }

    // set data form Deta to DOM
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
        landingText.innerHTML = dataReceived.description.join('<br><br>');
    }

    // get projects data from Deta endpoint
    function getProjectsData(projectId) {
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
                if (data.paging.size) {
                    setDataToProject(data, projectId);
                    setDataRelatedProjects(data, projectId);
                }
            })
    }

    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    let projectQueryId = params.project;
    
    getProjectsData(projectQueryId);
});