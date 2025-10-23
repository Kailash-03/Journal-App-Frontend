import React, { useContext, useState } from "react";
import "../styles/Signup.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { path, userContext } from "../src/main";

const Signup = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(userContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${path}/user/createUser`, {
        name,
        email,
        password
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });

      setIsAuthenticated(true);
      console.log("Signup successful:", response.data);
      toast.success("Account created successfully!");
    } catch (error) {
      console.log("Signup error:", error.response?.data?.error || error.message || error);
      toast.error(error.response?.data?.error || "Some internal error occurred");
      setIsAuthenticated(false);
    }

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  if (isAuthenticated) {
    return <Navigate to="/journals" />;
  }
  return (
    <div className="login-page">
      <main className="login-main">
        <h2 className="login-title">Create your account</h2>
        <form className="login-form" onSubmit={handleSignup}>
          <label htmlFor="name" className="login-label">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="login-input"
            placeholder="Enter your name"
          />
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
            placeholder="Enter your password"
          />
          <label htmlFor="confirmPassword" className="login-label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="login-input"
            placeholder="Confirm your password"
          />
          <button type="submit" className="pagelogin-btn">Sign Up</button>
        </form>
        <div className="login-links">
          <Link to="/login" className="login-link">Already have an account? Log In</Link>
        </div>
      </main>
    </div>
  );
};

export default Signup