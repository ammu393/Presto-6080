import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../NavBar';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    return (
        <>
        <div class="h-screen bg-register-background ">
        <div class="flex justify-end items-center">
        <a href="/register" class="bg-register-background my-3 mx-3 text-black hover:bg-[#d9d9db] py-2 px-4 rounded whitespace-nowrap">
                Sign up 
        </a> 
        </div>
        <div class="flex flex-col justify-center">
        <div class="flex justify-center text-center">
                <div>
                    <p class="text-3xl font-normal text-[#828282]">
                    Welcome back!
                    </p>
                    <p class="text-2xl text-[#ababab] mb-8">
                    Let's get you signed in

                    </p>
                </div>
            <br />
            </div>
            <div class="flex flex-col justify-center items-center">
        <div class="bg-white w-[32rem] h-[35em] rounded shadow-lg">
            <div class= "flex justify-center my-10">
                through google/facebook login buttons here
            </div>
        <div class="inline-flex items-center justify-center w-full">
            <hr class="w-full h-px my-8 mx-8 border-0 bg-gray-300" />
            <span class="absolute px-3 font-medium text-gray-300 -translate-x-1/2 bg-white left-1/2 ">or</span>
       </div>
        <form class="w-[90%] mx-auto flex flex-col justify-center">
    <div class="relative mb-5 group">
        <input
            type="email"
            name="floating_email"
            id="floating_email"
            class="block py-2 px-2 w-full text-sm text-black border border-[#edeff2] bg-[#f7f8fa] appearance-none focus:outline-[#30b0e3] focus:bg-white focus:ring-0 peer placeholder-transparent"
            placeholder=" "
            required
        />
        <label
            for="floating_email"
            class="absolute text-sm px-2 text-gray-500 transition-transform duration-300 transform -translate-y-10 scale-100 top-3 left-0 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-3.5 peer-valid:scale-75 peer-valid:-translate-y-6"
        >
            Email
        </label>
    </div>
    <div class="relative mb-5 group">
        <input
            type="password"
            name="floating_password"
            id="floating_password"
            class="block py-2 px-2 w-full text-sm text-black border border-[#edeff2] bg-[#f7f8fa] appearance-none focus:outline-[#30b0e3] focus:bg-white focus:ring-0 peer placeholder-transparent"
            placeholder=" "
            required
        />
        <label
            for="floating_password"
            class="absolute text-sm px-2 text-gray-500 transition-transform duration-300 transform -translate-y-2 scale-100 top-3 left-0 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-3.5 peer-valid:scale-75 peer-valid:-translate-y-6"
        >
            Password
        </label>
    </div>
</form>
<div class="mb-10">
    <p class="ml-10">
    remember me button to be added later

    </p>
</div>
<a href="/dashboard" class="bg-[#3f4d52] w-[20%] ml-6 text-white hover:bg-[#566970] py-3.5 px-5 rounded whitespace-nowrap">
                Log in 
        </a> 
            </div>

        </div>
        </div>
        </div>
        </>

    )
}