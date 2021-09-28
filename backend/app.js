const express = require("express");
const {getUser, getRepositories} = require("./controllers/usersController");
const helmet = require("helmet");

const app = express();

// Use Helmet
app.use(helmet());

// Have access to request.body
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Retrieve user's profile
app.get("/api/:username", getUser);

// Retrieve user's repositories
app.post("/api", getRepositories);

// Set port to 8080
app.listen(8080, () => {
  console.log("Listening to port 8080.");
});
