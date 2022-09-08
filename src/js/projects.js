document.addEventListener('DOMContentLoaded', () => {

    // set data form Deta to DOM
    function setDataToTemplate(data) {
        
        const dataReceived = data.items[0];        
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

        landingTitle.innerHTML = dataReceived.name;
        landingInfoTitle.innerHTML = dataReceived.categories.join(' & ');
        landingInfoDate.innerHTML = `Completed on ${monthCapitaliced} ${day}, ${year}`;
        landingBanner.src = "/src/assets/projects-section/" + dataReceived.image;
        landingText.innerHTML = dataReceived.description.join('<br><br>');

    }

    // get Projects data from Deta endpoint
    function getProjectsData(keyId) {
        let queryObj = {};
        if (keyId) queryObj = {"key": keyId};

        const url = 'https://database.deta.sh/v1/a0wwnrex/projects/query'; 
        const body = { query: [queryObj] };
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
                    setDataToTemplate(data);
                }
            })
    }

    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    let projectQueryId = params.project;

    if (projectQueryId) getProjectsData(projectQueryId);
    else getProjectsData();
});