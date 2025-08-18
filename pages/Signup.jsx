import React from "react";
import "../styles/signup.css";

const Signup = () => {
  return (
    <div className="login-page">
      <main className="login-main">
        <h2 className="login-title">Create your account</h2>
        <form className="login-form">
          <label htmlFor="name" className="login-label">Name</label>
          <input
            type="text"
            id="name"
            className="login-input"
            placeholder="Enter your name"
          />
          <label htmlFor="email" className="login-label">Email</label>
          <input
            type="email"
            id="email"
            className="login-input"
            placeholder="Enter your email"
          />
          <label htmlFor="password" className="login-label">Password</label>
          <input
            type="password"
            id="password"
            className="login-input"
            placeholder="Enter your password"
          />
          <label htmlFor="confirmPassword" className="login-label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="login-input"
            placeholder="Confirm your password"
          />
          <button type="submit" className="pagelogin-btn">Sign Up</button>
        </form>
        <div className="login-links">
          <a href="/login" className="login-link">Already have an account? Log In</a>
        </div>
      </main>
    </div>
  );
};

export default Signup