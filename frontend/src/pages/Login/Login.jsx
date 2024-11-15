import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import NavBar from '../../NavBar';
import NavBar from "../../components/NavBar"
import { useError } from '../../contexts/ErrorContext';

export default function Login({ token, setTokenFn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { showError } = useError();

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  // Calls admin/auth/login and redirects to dashboard on success
  const login = () => {
    axios.post('http://localhost:5005/admin/auth/login', {
      email: email,
      password: password
    })
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        setTokenFn(response.data.token)
        navigate('/dashboard')
      })
      .catch((error) => {
        showError(error.response.data.error);
      })
  }
  return (
    <>
      <div className="h-screen bg-register-background">
      <NavBar></NavBar>
        <div className="flex flex-col justify-center items-center px-4">
          <div className="flex justify-center text-center">
            <div className="mt-20">
              <p className="text-2xl sm:text-3xl font-normal text-[#2f3033] mb-3">
                Welcome back!
              </p>
              <p className="text-xl sm:text-2xl text-[#ababab] mb-6">
                Lets get you signed in
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full max-w-sm sm:max-w-md">
            <div className="bg-white w-full rounded-lg shadow-lg p-6 sm:w-[32rem]">
              <form className="w-[90%] my-5 mx-6 flex flex-col justify-center">
                <div className="relative mb-5 group">
                  <input
                    type="email"
                    name="floating_email"
                    id="floating_email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block py-2 px-2 w-full text-sm text-black border border-[#edeff2] bg-[#f7f8fa] appearance-none focus:outline-[#30b0e3] focus:bg-white focus:ring-0 peer placeholder-transparent"
                    placeholder=" "
                    required
                  />
                  <label className="absolute text-sm px-2 text-gray-500 transition-transform duration-300 transform -translate-y-10 scale-100 top-3 left-0 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-3.5 peer-valid:scale-75 peer-valid:-translate-y-6">
                    Email
                  </label>
                </div>
                <div className="relative mb-5 group">
                  <input
                    type="password"
                    name="floating_password"
                    id="floating_password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block py-2 px-2 w-full text-sm text-black border border-[#edeff2] bg-[#f7f8fa] appearance-none focus:outline-[#30b0e3] focus:bg-white focus:ring-0 peer placeholder-transparent"
                    placeholder=" "
                    required
                  />
                  <label className="absolute text-sm px-2 text-gray-500 transition-transform duration-300 transform -translate-y-2 scale-100 top-3 left-0 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-3.5 peer-valid:scale-75 peer-valid:-translate-y-6">
                    Password
                  </label>
                </div>
                <div className="inline-flex items-center justify-center w-full">
                <hr className="w-full h-px my-8 mx-8 border-0 bg-gray-300" />
              </div>
                <button onClick={login} className="bg-[#3f4d52] w-full sm:w-[20%] mx-auto text-white hover:bg-[#566970] py-3.5 px-5 rounded whitespace-nowrap">
                  Log in
                </button>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );  
};