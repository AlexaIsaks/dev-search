import React from "react";
import SearchResult from "../components/SearchResult";

// Home page
const Home = ({state, handleSearchChange, handleSearchSubmit, handleDisplayUser,}) => {
  const {searchResults, isSearching, isLoaded, error } = state;
  let displaySearchResults = null;

  // An error occurred during the search
  if (error) {
    displaySearchResults = (<p>An error has occurred.</p>);
  // Search is not in process
  } else if (!isSearching) {
    displaySearchResults = null;
  // An empty array is returned, thus no users were found
  } else if (isLoaded && searchResults.length === 0) {
    displaySearchResults = (<p>No results. Please ensure that you have entered the correct username.</p>);
  // User(s) found
  } else if (isLoaded && searchResults.length > 0) {
    displaySearchResults = searchResults.map((result) => {
      return (
        <SearchResult
          key={result.id}
          profile={result}
          handleDisplayUser={handleDisplayUser}
        />
      );
    });
  // Waiting on search results
  } else {
    displaySearchResults = <p>Please wait...</p>;
  }

  return (
    <React.Fragment>
      
      {/*Page header*/}
      <header className="py-5">
        <h1 className="h2 text-center text-uppercase mb-0">Dev Search</h1>
      </header>

      {/*Page main*/}
      <main>
        <div className="container px-md-5">
          <div>

            {/*Search form */}
            <form onSubmit={handleSearchSubmit} className="w-100">
              <div className="input-group">
                <input
                  type="search"
                  name="search"
                  placeholder="Search dev by username"
                  onChange={handleSearchChange}
                  className="form-control border-top-0 border-start-0 border-end-0 bg-offwhite input"
                  required
                />
                <button
                  type="submit"
                  className="btn border border-top-0 border-start-0 border-end-0"
                >
                  <span className="d-flex justify-content-center align-items-center fs-5 text-mustard">
                    <ion-icon name="search-outline"></ion-icon>
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/*Search results */}
          <div className="py-5">
            {displaySearchResults}
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default Home;
