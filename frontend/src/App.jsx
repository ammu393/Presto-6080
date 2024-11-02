import { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Landing from "./pages/Landing/Landing.jsx";
import Login from "./pages/Login/Login.jsx"
import Register from "./pages/Register/Register.jsx"
import './index.css'; 

function App() {
  const [token, setToken] = useState(null);
  
  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      setToken(localStorage.getItem('token'));      
    }
  },[]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard token={token} setToken = { setToken } />} />
        <Route path="/login" element={<Login setTokenFn={ setToken } />} />
        <Route path="/register" element={<Register token={token} setTokenFn={ setToken } />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
