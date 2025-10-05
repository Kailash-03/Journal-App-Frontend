import { useState, useEffect } from 'react'
import {Routes, Route, useLocation, Navigate} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import React from 'react'
import { userContext, path } from './main'
import axios from 'axios'
import HomeComp from '../pages/HomeComp'
import Header from '../pages/Header'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import CreateEntry from '../pages/CreateEntry'
import Journals from '../pages/Journals'
import EditEntry from '../pages/EditEntry'



function App() {
  const location = useLocation();
  const notIncludeHeaders = ["/create-entry","/edit"];
  const basePath = "/" + location.pathname.split("/")[1];
  const showHeader = notIncludeHeaders.includes(basePath) ? false : true;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is already authenticated when app loads
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${path}/user/getUserDetails`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        });
        if (response.status === 200) {
          setIsAuthenticated(true);

          
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (loading) {
    return <div style={{textAlign: "center", marginTop: "3rem"}}>Loading...</div>;
  }
  return (
    <userContext.Provider value={{isAuthenticated,setIsAuthenticated}} >
      {showHeader && <Header/>}
      <Routes>
        <Route path="/" element={<HomeComp />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/journals" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/journals" /> : <Signup />} />
        <Route path="/journals" element={<Journals />} />
        <Route path="/create-entry" element={isAuthenticated ? <CreateEntry /> : <Navigate to="/login" />} />
        <Route path="/edit/:id" element={isAuthenticated ? <EditEntry /> : <Navigate to="/" />} />
        <Route path="*" element={isAuthenticated ? <Navigate to="/journals" /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster/>
    </userContext.Provider> 
  )
}

export default App
