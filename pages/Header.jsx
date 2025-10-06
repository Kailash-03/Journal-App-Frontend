import React, { useContext } from 'react'
import '../styles/Header.css'
import { Link, useLocation } from 'react-router-dom'
import { path, userContext } from '../src/main'  
import toast from 'react-hot-toast'
import axios from 'axios'

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(userContext);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${path}/user/logout`,{
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }     
      })

      console.log("Logout successful:", response);
      toast.success("Logout successful");
      setIsAuthenticated(false);
      // console.log(response);
    } catch (error) {
      console.log("Logout error:", error.response?.data?.error || error.message || error);
      toast.error(error.response?.data?.error || "Some internal error occurred"); 
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <span className="logo-icon">◆</span>
        <Link to="/" className="logo-text">Reflectly</Link>
      </div>
      <nav className="header-nav">
        {isAuthenticated ? (
          // Navigation for authenticated users
          <>
            {/* Only show "My Journals" link if NOT on journals page */}
            {location.pathname !== '/journals' && (
              <Link to="/journals" className="nav-link">My Journals</Link>
            )}
            <button onClick={handleLogout} className="nav-btn login-btn">Logout</button>
          </>
        ) : (
          // Navigation for unauthenticated users
          <>
            <Link to="/signup" className="nav-btn signup-btn">Signup</Link>
            <Link to="/login" className="nav-btn login-btn">Login</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header