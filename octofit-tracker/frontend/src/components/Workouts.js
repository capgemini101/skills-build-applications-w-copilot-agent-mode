import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const getApiUrl = () => {
    const host = window.location.hostname;
    let apiUrl;
    if (host.includes('github.dev')) {
      // Remove the port and .app.github.dev to get the full codespace name
      const codespaceName = host.replace(/-\d+\.app\.github\.dev$/, '');
      apiUrl = `https://${codespaceName}-8000.app.github.dev/api/workouts/`;
    } else {
      apiUrl = `http://localhost:8000/api/workouts/`;
    }
    return apiUrl;
  };
  const endpoint = getApiUrl();

  useEffect(() => {
    console.log('Fetching Workouts from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Workouts data:', results);
      });
  }, [endpoint]);

  return (
    <div className="card shadow-sm p-3 mb-4 bg-white rounded">
      <h2 className="card-title text-primary mb-4">Workouts</h2>
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
            {workouts.map((workout, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td>{workout.name}</td>
                <td>{workout.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Workouts;
