import React from "react";
import Home from "../components/pages/Home";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";

// Home component snapshot test
test("Home component renders correctly", () => {
  // Mock state: Search results
  const state = {
    error: null,
    isLoaded: true,
    isSearching: true,
    search: "john_smith",
    searchResults: [
      {
        avatar:
          "https://secure.gravatar.com/avatar/2ed3e45ee10bf4e18df94e547c891c91?s=80&d=identicon",
        bio: "",
        id: 2705266,
        name: "John Smith ",
        platform: "GitLab",
        username: "John_smith",
        webUrl: "https://gitlab.com/John_smith",
      },
    ],
    userProfile: null
  };

  const tree = renderer
    .create(
      <BrowserRouter>
        <Home state={state} />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
