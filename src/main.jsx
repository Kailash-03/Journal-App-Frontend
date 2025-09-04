import React from 'react'
import { createRoot } from 'react-dom/client'
import { createContext } from 'react'
import App from './App.jsx'
import {BrowserRouter as Router} from 'react-router-dom'

export const path = "https://journal-app-backend-2v23.onrender.com/api/v1";
export const userContext = createContext({ isAuthenticated: false });

createRoot(document.getElementById('root')).render(
    <Router>
    <App />
    </Router>
)
