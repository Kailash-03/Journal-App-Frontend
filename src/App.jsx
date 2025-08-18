import { createContext, useState } from 'react'
import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import HomeComp from '../pages/HomeComp'
import Header from '../pages/Header'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import UserDetails from '../pages/Entries'
import Entries from '../pages/Entries'
import CreateEntry from '../pages/CreateEntry'

export const path = "https://journal-app-backend-2v23.onrender.com/api/v1";
export const userContext = createContext();
function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <userContext.Provider value={{isAuthenticated,setIsAuthenticated}} >
    <Router>
      <Header/>
      <Routes>
      <Route path="/" element={<HomeComp/>} /> 
      {/* <Route path="/userDetails" element={<UserDetails/>} /> */}
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/journals" element={<Entries/>} />
      <Route path="/create-entry" element={<CreateEntry/>} />
      </Routes>
      <Toaster/>
    </Router>
    </userContext.Provider> 
  )
}

export default App
