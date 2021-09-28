import React from "react";

// A template for repository results
const RepositoryResult = ({ repository }) => {
  const {name, description, createdAt, repositoryUrl, commits} = repository;

  return (
    // Repository details
    <tbody className="border-bottom-mustard">
      <tr>
        <th>Repository Name</th>
        <td>{name}</td>
      </tr>

      <tr>
        <th>Description</th>
        <td>{description && description !== "" ? description : "Not available"}</td>
      </tr>

      <tr>
        <th>Created At</th>
        <td>{createdAt}</td>
      </tr>

      <tr>
        <th>Repository URL</th>
        <td><a href={repositoryUrl} target="_blank" rel="noopener noreferrer">{repositoryUrl}</a></td>
      </tr>

      {/*Commit details*/}
      <tr>
        <th>Last Commit</th>
        <td>
          {
          // The last commit date is the first commit item in the commits array
          commits.length > 0 ? commits[0]["date"] : "No commits"
          }
     </td>
      </tr>

      {/*Commit messages*/}
      <tr>
        <th>Commit Messages</th>
        <td>
          <ul>
          {
             commits.length > 0 ? commits.map((commit) => {
                return (<li key={commit.id}>{commit.message}</li>);            
            }) : <li>No commits</li>
          }
          </ul>       
        </td>
      </tr>
    </tbody>
  );
};

export default RepositoryResult;
