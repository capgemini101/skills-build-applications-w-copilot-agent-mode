import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboards, setLeaderboards] = useState([]);
  const getApiUrl = () => {
    const host = window.location.hostname;
    let apiUrl;
    if (host.includes('github.dev')) {
      // Remove the port and .app.github.dev to get the full codespace name
      const codespaceName = host.replace(/-\d+\.app\.github\.dev$/, '');
      apiUrl = `https://${codespaceName}-8000.app.github.dev/api/leaderboards/`;
    } else {
      apiUrl = `http://localhost:8000/api/leaderboards/`;
    }
    return apiUrl;
  };
  const endpoint = getApiUrl();

  useEffect(() => {
    console.log('Fetching Leaderboards from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaderboards(results);
        console.log('Leaderboard data:', results);
      });
  }, [endpoint]);

  return (
    <div className="card shadow-sm p-3 mb-4 bg-white rounded">
      <h2 className="card-title text-primary mb-4">Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Team</th>
              <th scope="col">Total Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboards.map((lb, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td>{lb.team ? (lb.team.name || lb.team) : ''}</td>
                <td>{lb.total_points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
