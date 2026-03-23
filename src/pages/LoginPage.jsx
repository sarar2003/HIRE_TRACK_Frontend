import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
        const response = await fetch(import.meta.env.VITE_API_URL.replace('/jobs', '/auth/login'),{
            method:'POST',
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify({email, password})
        })
        const data = await response.json()
        if(response.ok){
            login(data.token)
            navigate('/')
        }
        else{
            setError("Invalid Credentials")
        }
        

    }
    catch(error){
        console.error("Failed to fetch :"+ error)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
        <br />
          <label htmlFor="email">Email</label>
          <input 
            id="email"
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        <br />
          <label htmlFor="password">Password</label>
          <input 
            id="password"
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        <br />
        <br />
          <button type="submit">Login</button>
          {error && <p className="error-msg">{error}</p>}
          <div className="auth-footer">
            <p>No account? <a href="/register">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
