//  This div is where profile information will appears.
const overview = document.querySelector(".overview");
//  to select the unordered list to display the repos list.
const repoList = document.querySelector(".repo-list");
// selects the section with a class of “repos” where all your repo information appears.
const allReposContainer = document.querySelector(".repos");
// selects the section with a class of “repo-data” where the individual repo data will appear.
const individualRepoData = document.querySelector(".repo-data");


const username = "PapaMusey";

const getUserData = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    console.log(data);
    displayUserInformation(data); // to display user's information on the webpage
};
getUserData();


// function to display the fetched user information on the page
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

// function to fetch repos.
const getUserRepos = async function () {
    const response = await fetch(` https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await response.json();
    console.log(repoData);
    displayRepoInformation(repoData);

};
getUserRepos();


//  function to display information about each repo
const displayRepoInformation = function (repos) {
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
        // console.log(repoName);
        getRepoInfo(repoName);
    };

});

// getting specific repo information we have, 
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


// function to display the specific repo information
const specificInfo = function (repoInfo, languages) {
    individualRepoData.innerHTML = "";

    /* instead of using .show and .hide with their respective classes, 
    it is better or appropriate to work with the hide class already predefines in the CSS file
    repoData.classList.show("repo-data");
    repoInfo.classList.hide("repos"); */

    individualRepoData.classList.remove("hide");
    allReposContainer.classList.add("hide");
    const div = document.querySelector("div");
    div.innerHTML = `        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
`;
    individualRepoData.append(div);

};

