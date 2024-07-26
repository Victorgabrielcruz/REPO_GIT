document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const toggleModeBtn = document.getElementById('toggleModeBtn');
    const toggleModeBtnMobile = document.getElementById('toggleModeBtnMobile');

    toggleModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggleModeBtn.innerHTML = document.body.classList.contains('dark-mode') ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });

    toggleModeBtnMobile.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggleModeBtnMobile.innerHTML = document.body.classList.contains('dark-mode') ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });

    // Fetch GitHub User Data
    fetch('https://api.github.com/users/Victorgabrielcruz')
        .then(response => response.json())
        .then(data => {
            document.getElementById('userAvatar').src = data.avatar_url;
            document.getElementById('userName').innerText = data.name || data.login;
            document.getElementById('userBio').innerText = data.bio;
            document.getElementById('userLocation').innerText = data.location;
            document.getElementById('userBlog').innerText = data.blog;
            document.getElementById('userBlog').href = data.blog;
            document.getElementById('userFollowers').innerText = ` ${data.followers}` ;
        });

    // Fetch GitHub Repositories
    fetch('https://api.github.com/users/Victorgabrielcruz/repos')
        .then(response => response.json())
        .then(data => {
            const reposContainer = document.getElementById('reposContainer');
            data.forEach(repo => {
                const repoCard = document.createElement('div');
                repoCard.classList.add('col-md-4');
                repoCard.innerHTML = `

                <a href="./repo.html?repo=${repo.name}" class="text-decoration-none">
                    <div class="card mt-5">
                        <div class="card-body">
                        <h5 class="card-title">${repo.name}</h5>
                        <p class="card-text">${repo.description || 'Sem descrição'}</p>
                            <i class="fa-regular fa-star float-start"> ${repo.stargazers_count}</i>
                            <i class="fa-regular fa-user float-end"> ${repo.forks_count}</i>
                        </div>
                    </div>
                </a>
                `;
                reposContainer.appendChild(repoCard);
            });
        });

    // Fetch JSONServer Data for Colleagues


    // Fetch Suggested Content for Carousel

});
document.addEventListener('DOMContentLoaded', () => {
    // Função para obter os parâmetros da URL
    function getQueryParams() {
        const params = {};
        window.location.search.substring(1).split('&').forEach(param => {
            const [key, value] = param.split('=');
            params[key] = decodeURIComponent(value);
        });
        return params;
    }

    const queryParams = getQueryParams();
    const repoName = queryParams.repo;

    if (repoName) {
        fetch(`https://api.github.com/repos/Victorgabrielcruz/${repoName}`)
        .then(response => response.json())
        .then(repo => {
            const repoInfo = document.getElementById('repoInfo');
            repoInfo.innerHTML = `
                <div class="col-12 ">
                    <h3>${repo.name}</h3>
                    <div ">
                        <b>Descrição</b>
                        <p>${repo.description || 'Sem descrição'}</p>
                        <strong>Issues Abertas:</strong>
                        <p> ${repo.open_issues_count}</p>
                        <strong>Linguagem Principal:</strong> 
                        <p>${repo.language || 'N/A'}</p>
                        <div class="float-end">
                            <i class="fa-regular fa-star "> ${repo.stargazers_count}</i>
                            <br>
                            <i class="fa-regular fa-user "> ${repo.forks_count}</i>
                        </div>
                        <strong>Link:</strong>
                        <p> <a href="${repo.html_url}" target="_blank">${repo.html_url}</a></p>

                    </div>
  
                </div>
            `;

            return fetch(repo.languages_url);
        })
        .then(response => response.json())
        .then(languages => {
            const repoLanguages = document.getElementById('repoLanguages');
            repoLanguages.innerHTML = '<h4>Languages Used:</h4><div id="languageTags"></div>';
            const languageTags = document.getElementById('languageTags');
            
            for (const [language, bytes] of Object.entries(languages)) {
                const tag = document.createElement('span');
                tag.className = 'badge bg-secondary me-1 bl';
                tag.textContent = `${language} (${bytes} bytes)`;
                languageTags.appendChild(tag);
            }
        })
        .catch(error => {
            const repoInfo = document.getElementById('repoInfo');
            repoInfo.innerHTML = `<div class="col-12"><p>Erro ao carregar os detalhes do repositório.</p></div>`;
            console.error('Erro ao buscar detalhes do repositório:', error);
        });
    }


});
