import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import RepositoryResult from "../components/RepositoryResult";

// User details page
class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repositories: [],
      isRepositoriesLoaded: false,
      error: null
    };
  }

  // Retrieve the user's repositories
  componentDidMount() {
    const { id, username, platform } = this.props.userProfile;

    const userDetails = {
      id,
      username,
      platform
    };

    // Fetch arguments
    const parameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails)
    };

    // Fetch the user's repositories
    fetch("/api", parameters)
      .then((response) => response.json())
      .then(
        (data) => {
          this.setState({
            repositories: data,
            isRepositoriesLoaded: true
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      );
  }

  render() {
    // Extract the user's profile and repository details
    const { name, username, bio, avatar, webUrl } = this.props.userProfile;
    const { repositories, isRepositoriesLoaded, error } = this.state;
    let repositoryResults = null;

    // An error has occurred while retrieving the repositories
    if (error) {
      repositoryResults = (
        <tbody>
          <tr>
            <td>There seems to be an error.</td>
          </tr>
        </tbody>
      );
      // Waiting for search results
    } else if (!isRepositoriesLoaded) {
      repositoryResults = (
        <tbody>
          <tr>
            <td>Please wait...</td>
          </tr>
        </tbody>
      );
      // The user has no repositories
    } else if (isRepositoriesLoaded && repositories.length === 0) {
      repositoryResults = (
        <tbody>
          <tr>
            <td>No repositories are available.</td>
          </tr>
        </tbody>
      );
      // Display respositories
    } else {
      repositoryResults = repositories.map((repository) => {
        return (<RepositoryResult key={repository.id} repository={repository} />);
      });
    }

    return (
      <React.Fragment>
        {/*Page header */}
        <header className="pt-4 pb-3">
          {/*Navigate back to home page */}
          <NavLink
            exact
            to="/"
            className="d-flex justify-content-start align-items-center text-decoration-none text-mustard fs-5"
          >
            <span className="d-flex justify-content-center align-items-center me-2">
              <ion-icon name="chevron-back-outline"></ion-icon>
            </span>
            <span>Back</span>
          </NavLink>
        </header>

        {/*Page main*/}
        <main className="pb-5 px-md-5">
          <div className="user">
            <header className="d-flex justify-content-start align-items-center my-5">
              {/*User's profile picture */}
              <div className="user__image-container">
                <img src={avatar} alt={name} className="user__image" />
              </div>
              <h1 data-testid="name" className="ps-3 ps-md-5 h2 text-center">
                {name}
              </h1>
            </header>

            {/*User's profile details*/}
            <section className="mb-5">
              <div className="overflow-auto">
                <table>
                  <tbody>
                    <tr>
                      <th>Username</th>
                      <td>{username}</td>
                    </tr>
                    <tr>
                      <th>Bio</th>
                      <td>{bio && bio !== "" ? bio : "Not available"}</td>
                    </tr>
                    <tr>
                      <th>URL</th>
                      <td>
                        <a
                          href={webUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {webUrl}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/*User's repositories*/}
            <section>
              <h2 className="mb-4 h3">Repositories</h2>
              <div className="overflow-auto">
                <table data-testid="table">{repositoryResults}</table>
              </div>
            </section>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default withRouter(UserDetails);
