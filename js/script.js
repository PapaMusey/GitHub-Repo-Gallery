//  This div is where profile information will appears.
const overview = document.querySelector(".overview");
//  to select the unordered list to display the repos list.
const repoList = document.querySelector(".repos")


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
const displayRepoInformation = function(repos) {
    for (const repo of repos){
        let repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);

    }
    

};
