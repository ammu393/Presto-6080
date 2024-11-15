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
import Preview from './pages/Preview/Preview.jsx';
import Rearrange from './pages/Rearrange/Rearrange';
import { ErrorProvider } from './contexts/ErrorContext.jsx';

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
    <ErrorProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard token={token} store={store} setStore={setStore} setTokenFn={setToken} />} />
          <Route path="/login" element={<Login token= { token } setTokenFn={ setToken } />} />
          <Route path="/register" element={<Register token={token} setTokenFn={ setToken } />} />
          <Route path="/presentations/:presentationId/:slideNum" element={<Presentation token={token} store={store} setStore={setStore} />} />
          <Route path="/presentations/preview/:presentationId/:slideNum" element={<Preview token={token} />}/>
          <Route path="/presentations/rearrange/:presentationId" element={<Rearrange token={token} store={store} setStore={setStore} />} />
        </Routes>
      </BrowserRouter>
    </ErrorProvider>
  )
}

export default App
