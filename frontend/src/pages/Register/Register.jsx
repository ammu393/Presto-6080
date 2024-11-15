import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from "../../components/NavBar"
import { useError } from '../../contexts/UseError';

export default function Register({ token, setTokenFn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();
  const { showError } = useError();

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  // Registers a user and redirects to dashboard on success
  const signup = () => {
	  if (password != password2) {
      return showError("Passwords do not match!");
	  }
    axios.post('http://localhost:5005/admin/auth/register', {
      email: email,
	    password: password,
	    name: name,
      presentations: [],
    })
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        setTokenFn(response.data.token)
        navigate('/dashboard')
      })
      .catch(() => {
        showError("Failed to register");
      })
  }
  return (
    <>
      <div className="h-screen bg-register-background">
        <NavBar></NavBar>
        <div className="flex justify-end items-center">
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex justify-center text-center">
            <div>
              <p className="text-3xl mt-20 font-normal text-[#2f3133] mb-3">
                Create an account
              </p>
              <p className="text-xl sm:text-xl text-[#ababab] mb-6">
                Not yet a member? Sign up now!
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="bg-white w-[90%] sm:w-[32rem] h-auto rounded shadow-lg p-6">
              <form className="w-full flex flex-col justify-center">
                {/* Name Field */}
                <div className="relative mb-5 group">
                  <input
                    type="name"
                    name="floating_name"
                    id="floating_name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block py-2 px-2 w-full text-sm text-black border border-[#edeff2] bg-[#f7f8fa] appearance-none focus:outline-[#30b0e3] focus:bg-white focus:ring-0 peer placeholder-transparent"
                    placeholder=" "
                    required
                  />
                  <label className="absolute text-sm px-2 text-gray-500 transition-transform duration-300 transform -translate-y-10 scale-100 top-3 left-0 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-3.5 peer-valid:scale-75 peer-valid:-translate-y-6">
                    Name
                  </label>
                </div>
  
                {/* Email Field */}
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
  
                {/* Password Field */}
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
  
                {/* Confirm Password Field */}
                <div className="relative mb-5 group">
                  <input
                    type="password"
                    name="floating_password2"
                    id="floating_password2"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    className="block py-2 px-2 w-full text-sm text-black border border-[#edeff2] bg-[#f7f8fa] appearance-none focus:outline-[#30b0e3] focus:bg-white focus:ring-0 peer placeholder-transparent"
                    placeholder=" "
                    required
                  />
                  <label className="absolute text-sm px-2 text-gray-500 transition-transform duration-300 transform -translate-y-2 scale-100 top-3 left-0 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-3.5 peer-valid:scale-75 peer-valid:-translate-y-6">
                    Confirm Password
                  </label>
                </div>
                <div className='flex justify-center'>
                  <button
                    onClick={signup}
                    className="bg-[#3f4d52] w-full sm:w-[20%] text-white hover:bg-[#566970] py-3.5 px-5 rounded whitespace-nowrap mt-4"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );  
}