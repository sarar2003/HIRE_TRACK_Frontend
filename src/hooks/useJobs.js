import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setJobs(data);
        setError(null);
      } else {
        throw new Error(data?.message || 'Failed to fetch jobs');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (token) {
      fetchJobs();
    }
  }, [token]);

  return { jobs, fetchJobs, loading, error };
};

export default useJobs;
