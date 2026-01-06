import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const getApiUrl = () => {
    const host = window.location.hostname;
    let apiUrl;
    if (host.includes('github.dev')) {
      // Remove the port and .app.github.dev to get the full codespace name
      const codespaceName = host.replace(/-\d+\.app\.github\.dev$/, '');
      apiUrl = `https://${codespaceName}-8000.app.github.dev/api/users/`;
    } else {
      apiUrl = `http://localhost:8000/api/users/`;
    }
    return apiUrl;
  };
  const endpoint = getApiUrl();

  useEffect(() => {
    console.log('Fetching Users from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Users data:', results);
      });
  }, [endpoint]);

  return (
    <div className="card shadow-sm p-3 mb-4 bg-white rounded">
      <h2 className="card-title text-primary mb-4">Users</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Team</th>
              <th scope="col">Superhero</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.team ? (user.team.name || user.team) : ''}</td>
                <td>{user.is_superhero ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
