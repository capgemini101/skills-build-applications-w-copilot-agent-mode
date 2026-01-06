import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const getApiUrl = () => {
    const host = window.location.hostname;
    let apiUrl;
    if (host.includes('github.dev')) {
      // Remove the port and .app.github.dev to get the full codespace name
      const codespaceName = host.replace(/-\d+\.app\.github\.dev$/, '');
      apiUrl = `https://${codespaceName}-8000.app.github.dev/api/teams/`;
    } else {
      apiUrl = `http://localhost:8000/api/teams/`;
    }
    return apiUrl;
  };
  const endpoint = getApiUrl();

  useEffect(() => {
    console.log('Fetching Teams from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Teams data:', results);
      });
  }, [endpoint]);

  return (
    <div className="card shadow-sm p-3 mb-4 bg-white rounded">
      <h2 className="card-title text-primary mb-4">Teams</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td>{team.name}</td>
                <td>{team.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teams;
