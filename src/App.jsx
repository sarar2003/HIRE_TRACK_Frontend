import React from "react";
import Joblist from "./components/Joblist.jsx";
import JobForm from "./components/JobForm.jsx";
import useJobs from "./hooks/useJobs.js";
import { useAuth } from "./context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const App = () => {
  const { logout } = useAuth();
  const { jobs, fetchJobs, loading, error } = useJobs();
  const {navigate} = useNavigate();
  return (
    <div className="app-wrapper">
      <button 
        className="btn-logout" 
        onClick={() => {
          logout();
          navigate('/login')
        }}
      >
        Logout
      </button>
      <div className="main-layout">
        <JobForm onJobAdded={fetchJobs} />
        <Joblist
          jobs={jobs}
          onRefresh={fetchJobs}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default App;
