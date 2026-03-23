import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

const Joblist = ({jobs, onRefresh, loading, error}) => {
  const { token } = useAuth();
  
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        onRefresh();
      } else {
        throw new Error(data?.message || 'Failed to delete job');
      }
    } catch (error) {
      console.error("Failed to delete: " + error.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({status: newStatus})
      });
      const data = await response.json();
      if (response.ok) {
        onRefresh();
      } else {
        throw new Error(data?.message || 'Failed to update status');
      }
    } catch (error) {
      console.error("Failed to update job: " + error.message);
    }
  };

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error: {error}</p>;
  if (jobs.length === 0) return <p>No jobs yet. Add one above!</p>;

  return (
    <div>
      <h2>Available Jobs</h2>
      <br />
      <div className="job-list-section">
        <div className="jobs-grid">
          {jobs.map((job) => (
            <div key={job._id} className="job-card">
              <div className="job-card-header">
                <h3>{job.role}</h3>
                <p>
                  <strong>Company: </strong>
                  {job.company}
                </p>
                <p>
                  <strong>Role: </strong>
                  {job.role}
                </p>
              </div>
              <div className="status-badge applied">
                <p>
                  <strong>Status: </strong>
                  {job.status}
                </p>
                <br />
                <select 
                  name="" 
                  id="" 
                  value={job.status} 
                  onChange={(e) => handleStatusChange(job._id, e.target.value)}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <br />
              <br />
              <button onClick={() => handleDelete(job._id)}>
                Delete job
              </button>
              <br />
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Joblist;
