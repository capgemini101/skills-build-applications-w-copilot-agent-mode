import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const getApiUrl = () => {
    const host = window.location.hostname;
    let apiUrl;
    if (host.includes('github.dev')) {
      // Remove the port and .app.github.dev to get the full codespace name
      const codespaceName = host.replace(/-\d+\.app\.github\.dev$/, '');
      apiUrl = `https://${codespaceName}-8000.app.github.dev/api/activities/`;
    } else {
      apiUrl = `http://localhost:8000/api/activities/`;
    }
    return apiUrl;
  };
  const endpoint = getApiUrl();

  useEffect(() => {
    console.log('Fetching Activities from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Activities data:', results);
      });
  }, [endpoint]);

  return (
    <div className="card shadow-sm p-3 mb-4 bg-white rounded">
      <h2 className="card-title text-primary mb-4">Activities</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Type</th>
              <th scope="col">Duration (min)</th>
              <th scope="col">Date</th>
              <th scope="col">User</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td>{activity.type}</td>
                <td>{activity.duration}</td>
                <td>{activity.date}</td>
                <td>{activity.user ? (activity.user.name || activity.user) : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activities;
