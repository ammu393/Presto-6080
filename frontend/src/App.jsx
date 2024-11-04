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
import Presentation from "./pages/Presentation/Presentation.jsx";

function App() {
  const [token, setToken] = useState(null);
  const [store, setStore] = useState({ presentations: [] });

  
  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      setToken(localStorage.getItem('token'));      
    }
    console.log("REFRESH")
  },[]);

  {console.log('outer token' + token)}


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard token={token} store={store} setStore={setStore} setTokenFn={setToken} />} />
        <Route path="/login" element={<Login token= { token } setTokenFn={ setToken } />} />
        <Route path="/register" element={<Register token={token} setTokenFn={ setToken } />} />
        <Route path="/presentations/:presentationId" element={<Presentation token={token} store={store} setStore={setStore} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
