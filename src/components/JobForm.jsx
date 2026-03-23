import React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const JobForm = ({ onJobAdded }) => {
  const { token } = useAuth();
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newJob = { company, role, status, notes };
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newJob),
      });
      const data = await response.json();
      if (response.ok) {
        setCompany("");
        setRole("");
        setStatus("Applied");
        setNotes("");
        setSuccess("Job Added Successfully!");
        setTimeout(() => setSuccess(""), 3000);
        onJobAdded();
      } else {
        throw new Error(data?.message || 'Failed to add job');
      }
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };
  return (
    <div className="job-form-card">
    <form onSubmit={handleSubmit}>
      <h2>Add New Job</h2>
      <br />
      <br />
      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />
      <br />
      <br />
      <select
        name=""
        id=""
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
      <br />
      <br />
      <textarea
        name=""
        id=""
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      ></textarea>
      <br />
      <br />
      <button type="submit">Add Jobs</button>
      {success && <p>{success}</p>}
      <br />
      <br />
    </form>
    </div>
  );
};

export default JobForm;
