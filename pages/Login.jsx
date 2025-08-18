import React, { useContext, useState } from "react";
import "../styles/Login.css";
import axios from "axios";  
import { useNavigate, Navigate } from "react-router-dom";   
import toast from "react-hot-toast";
import { path, userContext } from "../src/App";

const Login = () => {
  const {isAuthenticated, setIsAuthenticated} = useContext(userContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = async (e)=>{
      e.preventDefault();
    try {
      const response = await axios.post(`${path}/user/loginUser`,{
        email,password
      },{
        headers: {
          "Content-Type": "application/json",
        },withCredentials: true 
      });

      setIsAuthenticated(true);
      console.log("Login successful:", response.data);
      toast.success("Login successful");
      // <navigate to="/" />; 
    } catch (error) {
      console.log("Login error:", error.response?.data?.error || error.message || error);
      toast.error(error.response?.data?.error || "Some internal error occurred");
      setIsAuthenticated(false);
    }

    setEmail("");
    setPassword("");    
  }

  if(isAuthenticated) {
    return <Navigate to="/journals" />;
  }
  return (
    <div className="login-page">
      <main className="login-main">
        <h2 className="login-title">Welcome back</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="email" className="login-label">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
            placeholder="Enter your email"
          />
          <label htmlFor="password" className="login-label">Password</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            placeholder="Enter your password"
          />
          <div className="login-remember">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button type="submit" className="pagelogin-btn">Login</button>
        </form>
        <div className="login-links">
          <a href="/signup" className="login-link">Don't have an account? Sign up</a>
          <a href="/forgot-password" className="login-link">Forgot password?</a>
        </div>
      </main>
    </div>
  );
};

export default Login;