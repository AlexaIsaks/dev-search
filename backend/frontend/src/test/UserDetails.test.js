import React from "react";
import UserDetails from "../components/pages/UserDetails";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";

// UserDetails component snapshot test
test("UserDetails component renders correctly", () => {
  // Mock state: Selected user profile to be viewed
  const userProfile = {
    avatar:
      "https://secure.gravatar.com/avatar/2ed3e45ee10bf4e18df94e547c891c91?s=80&d=identicon",
    bio: "Not available",
    id: 2705266,
    name: "John Smith ",
    platform: "GitLab",
    username: "John_smith",
    webUrl: "https://gitlab.com/John_smith",
  };

  const tree = renderer
    .create(
      <BrowserRouter>
        <UserDetails userProfile={userProfile} />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// Unit Test: Correct user details displayed
test("correct user details displayed", () => {
  const userProfile = {
    id: 47313,
    name: "Fabien Potencier",
    username: "fabpot",
    bio: null,
    avatar: "https://avatars.githubusercontent.com/u/47313?v=4",
    platform: "GitHub",
    webUrl: "https://github.com/fabpot",
  };

  render(
    <BrowserRouter>
      <UserDetails userProfile={userProfile} />
    </BrowserRouter>
  );

  const tdElement = screen.getByTestId("name");
  expect(tdElement).toHaveTextContent("Fabien Potencier");
});
