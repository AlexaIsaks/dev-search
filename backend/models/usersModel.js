require("isomorphic-fetch");

// Retrieves user profiles from GitHub and GitLab using the selected username
const fetchUsers = (username) => {
  return Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://gitlab.com/api/v4/users?username=${username}`)
    ])
    .then((response) => {
      return Promise.all(response.map((resp) => {
        /* Check if response status is OK. GitLab api returns a 200 status even when the username does not exist.
          The result returned is an empty array. 
          */
        if (resp.status === 200) {
          return resp.json();
        } else {
          return {};
        }
      }));
    }).then((results) => {
      /*The first GitLab api does not return the user's full profile, however it needs
      to be used to retrieve the user's id. The id is then used in a second GitLab api, which
      then returns the user's full profile. 
      
      First check that the GitLab api returned results
      */
      if (results[1].length > 0) {
        return fetch(`https://gitlab.com/api/v4/users/${results[1][0]["id"]}`)
          .then((response) => {
            // Check if response status is OK
            if (response.status === 200) {
              return response.json();
            // The above api sometimes return a 403 (Forbidden). Continue with initial results.
            } else {
              return results[1][0];
            }

          })
          .then((gitLabResults) => {      
            // Replace the initial GitLab results with full profile
            results[1] = gitLabResults;

            return results;
          });
      } else {
        // Replace empty array with empty object to keep results consistent.
        results[1] = {};
        return results;
      }

    })
    .then((results) => {
      const data = [];

      // Extract only the important user profile details from each result
      results.forEach((result) => {
        // Check that the result is not an empty object
        if (Object.keys(result).length > 0) {
          const user = createUserObject(result);
          data.push(user);
        }
      });
      return data;
    });
}

// Extracts specific user details and stores it in an abject
const createUserObject = (user) => {
  const id = user.id;
  const name = user.name;
  const avatar = user.avatar_url;
  const bio = user.bio;
  let username = "";
  let platform = "";
  let webUrl = "";

  /*Certain profile details are found under different property names. For example, GitHub stores the username under
  "login", while GitLab stores it under "username". To determine which platform the user belongs to, the property "html_url"
  will be used. GitHub contains the property "html_url" , while GitLab does not contain this property.*/
  if (user.hasOwnProperty("html_url")) {
    username = user.login;
    platform = "GitHub";
    webUrl = user.html_url;
  } else {
    username = user.username;
    platform = "GitLab";
    webUrl = user.web_url;
  }

  return {
    id,
    name,
    username,
    bio,
    avatar,
    platform,
    webUrl
  }
}

// Retrieves the user's repositories
const fetchRepositories = (username, id, platform) => {
  let repositoryApi = "";

  // Check which platform was selected to ensure that correct api is used
  if (platform === "GitHub") {
    repositoryApi = `https://api.github.com/users/${username}/repos`;
  } else {
    repositoryApi = `https://gitlab.com/api/v4/users/${id}/projects`;
  }

  return fetch(repositoryApi)
    .then((response) => {
      if (response.status === 200 ) {
        return response.json();
      } else {
        return [];
      }
    })
    .then((results) => {
      const data = [];

      // Check if results were returned
      if (results.length > 0) {
        // Extract specific repository information from each result
        results.forEach((result) => {
          // Retrieve the repository's URL
          const repositoryUrl = platform === "GitHub" ? result.html_url : result.web_url;

          // Create an object
          const repositoryDetails = {
            id: result.id,
            name: result.name,
            description: result.description,
            createdAt: new Date(result.created_at).toLocaleString("en-ZA", {
              day: "numeric",
              month: "long",
              year: "numeric"
            }),
            repositoryUrl,
            commits: []
          }

          data.push(repositoryDetails);
        });

      }
      return data;
    })
    .then((results) => {
      //A separate api is used to retrieve the commits of each repository 

      // Check if there are repositories
      if (results.length > 0) {
        return Promise.all(
          results.map((result) => {
            let commitsApi = "";

            // Determine which api will be used
            if (platform === "GitHub") {
              commitsApi = `https://api.github.com/repos/${username}/${result.name}/commits`;
            } else {
              commitsApi = `https://gitlab.com/api/v4/projects/${result.id}/repository/commits`;
            }

            return fetch(commitsApi)
              .then((response) => {
                if (response.status === 200) {
                  return response.json();
                } else {
                  return [];
                }
              })
              .then((commits) => {
                // Check if commits are available
                if (commits.length > 0) {
                  // Extract specific commit details for each commit
                  commits.forEach((commit, index) => {
                    // Retrieve only 5 commits
                    if (index < 5) {
                      let id = "";
                      let date = "";
                      let message = "";
                      // Check if the repository is from GitHub or GitLab
                      if (platform === "GitHub") {
                        id = commit.sha;
                        date = commit.commit.author.date;
                        message = commit.commit.message;
                      } else {
                        id = commit.id;
                        date = commit.created_at;
                        message = commit.message;
                      }

                      // Add each commit to the respective repository's commits array
                      result["commits"].push({
                        id,
                        date: new Date(date).toLocaleString("en-ZA", {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        }),
                        message
                      });
                    }
                  });

                }
                return result;
              });
          })
        );
      } else {
        return results
      }
    });
}

module.exports = {
  fetchUsers,
  fetchRepositories
}