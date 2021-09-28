import React from "react";
import { Link } from "react-router-dom";

// A template for the user search result
const SearchResult = ({ profile, handleDisplayUser }) => {
  return (
    // User
    <div className="mb-3 border-bottom bg-white shadow result">
    
      <Link
        to={`/user-details/${profile.id}`}
        data-id={profile.id}
        className="mb-3 text-secondary text-decoration-none"
        onClick={handleDisplayUser}
      >
        <div className="row gx-2 gx-md-3 h-100">

          {/*User's profile picture*/}
          <div className="col-4 col-md-2 h-100 result__image-container">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="result__image"
            />
          </div>

          {/*User's name and selected platform */}
          <div className="col-6 col-md-9 d-flex flex-column justify-content-center align-items-start">
            <span>{profile.name} ({profile.username})</span>
            <span>{profile.platform}</span>
          </div>

          <div className="col-2 col-md-1 d-flex justify-content-center align-items-center">
            <span className="d-flex justify-content-center align-items-center fs-5 text-mustard">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SearchResult;
