const {fetchUsers, fetchRepositories} = require("../models/usersModel");

// Retrieve user's profile
const getUser = (request, response) => {
  // Retrieve username
  const username = request.params.username;
  // Fetch user
  fetchUsers(username)
    .then((data) => {
      response.send(data);
    }, (error) => {
      response.send(error);
    });
}

// Retrieve user's repositories
const getRepositories = (request, response) => {
  // Retrieve user's details
  const platform = request.body.platform;
  const username = request.body.username;
  const id = request.body.id;

  // Fetch repositories
  fetchRepositories(username, id, platform)
    .then(data => {
      response.send(data);
    }, (error) => {
      response.send(error);
    });
}


module.exports = {
  getUser,
  getRepositories
}
