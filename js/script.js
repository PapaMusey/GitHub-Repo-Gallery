const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const allReposContainer = document.querySelector(".repos");
const individualRepoData = document.querySelector(".repo-data");
const backToGallery = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");



const username = "PapaMusey";

const getUserData = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    console.log(data);
    displayUserInformation(data); 
}
getUserData();


const displayUserInformation = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = ` <figure>
      <img alt="user avatar" src=${data.
            avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.
            public_repos
        }</p>
    </div>  `;
    overview.append(div);
}

const getUserRepos = async function () {
    const response = await fetch(` https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await response.json();
    console.log(repoData);
    displayRepoInformation(repoData);

};
getUserRepos();

const displayRepoInformation = function (repos) {
    filterInput.classList.remove("hide")

    for (const repo of repos) {
        let repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }

};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    };

});

const getRepoInfo = async function (repoName) {
    const repoResponse = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await repoResponse.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];
    for (const language in languageData) {
        languages.push(language);
        console.log(languages);
    };
    specificInfo(repoInfo, languages);
};

const specificInfo = function (repoInfo, languages) {
    individualRepoData.innerHTML = "";
    individualRepoData.classList.remove("hide");
    allReposContainer.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = ` <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
         `;
    individualRepoData.append(div);
    backToGallery.classList.remove("hide");
};

backToGallery.addEventListener("click", function () {
    allReposContainer.classList.remove("hide");
    individualRepoData.classList.add("hide");
    backToGallery.classList.add("hide");
})

filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    console.log(searchText);
    const repos = document.querySelectorAll(".repo");
    const searchLowercaseText = searchText.toLowerCase();

    for (const repo of repos) {
        const repoLowercaseText = repo.innerText.toLowerCase();
        if (repoLowercaseText.includes(searchLowercaseText)) {
            repo.classList.remove("hide");
        }
        else {
            repo.classList.add("hide");
        }
    }
});



