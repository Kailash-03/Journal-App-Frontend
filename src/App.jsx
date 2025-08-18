import { createContext, use, useState } from 'react'
import React from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import HomeComp from '../pages/HomeComp'
import Header from '../pages/Header'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import UserDetails from '../pages/Entries'
import Entries from '../pages/Entries'
import CreateEntry from '../pages/CreateEntry'

export const path = "https://journal-app-backend-2v23.onrender.com/api/v1";
export const userContext = createContext({ isAuthenticated: false });



function App() {
  const location = useLocation();
  const notIncludeHeaders = ["/create-entry"];

  const showHeader = notIncludeHeaders.includes(location.pathname) ? false : true;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <userContext.Provider value={{isAuthenticated,setIsAuthenticated}} >
      {showHeader && <Header/>}
      <Routes>
      <Route path="/" element={<HomeComp/>} /> 
      {/* <Route path="/userDetails" element={<UserDetails/>} /> */}
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/journals" element={<Entries/>} />
      <Route path="/create-entry" element={<CreateEntry/>} />
      </Routes>
      <Toaster/>
    </userContext.Provider> 
  )
}

export default App
