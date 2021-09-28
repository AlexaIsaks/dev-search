import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import UserDetails from "./UserDetails";

// Site container
class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: null,
      searchResults: null,
      isSearching: false,
      isLoaded: false,
      error: null,
      userProfile: null,
    };
  }

  // Updates state with searched item
  handleSearchChange = (event) => {
    const value = event.target.value;
    this.setState({
      search: value
    });
  };

  // Submits the search form and returns the user search results
  handleSearchSubmit = (event) => {
    event.preventDefault();

    // Fetch user
    fetch(`/api/${this.state.search}`)
      .then((response) => response.json())
      .then(
        (data) => {
          // Update state
          this.setState({
            searchResults: data,
            isSearching: true,
            isLoaded: true
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      );
  }

  // Returns and displays the selected user on the user details page
  handleDisplayUser = (event) => {
    // Retrieve the user's id number
    const id = parseInt(event.currentTarget.dataset.id);

    // Find the selected user from the search results
    const userProfile = this.state.searchResults.find((result) => {
      return result.id === id;
    });

    // Save the selected user in the userProfile property
    this.setState({
      userProfile
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route exact path="/">
              {/*Home page*/}
              <Home
                state={this.state}
                handleSearchChange={this.handleSearchChange}
                handleSearchSubmit={this.handleSearchSubmit}
                handleDisplayUser={this.handleDisplayUser}
              />
            </Route>

            {/*User details page*/}
            <Route path="/user-details/:id">
              <UserDetails userProfile={this.state.userProfile} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Container;
