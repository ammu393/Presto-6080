import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from "../../components/NavBar"
import { useError } from '../../contexts/ErrorContext';

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

  const signup = () => {
	  console.log(email,password,name)
	  if (password != password2) {
      return showError("Passwords do not maour friend who is a creepy stalker? maybe you thought it was your friend, but it was actually your fri end (let me explain: you are happily in McDonalds, getting fat while eating yummy food and some random dude walks up and blots out the sun (he looks like a regular here) you can’t see anything else than him, so you can’t try to avoid eye contact. he finishes eating his cheeseburger (more like horseburgher(I learned that word from the merchant of Venice(which is a good play(if you can understand it(I can cause I got a special book with all the words in readable English written on the side of the page(which is kinda funny because Shakespeare was supposed to be a good poet but no-one can understand him(and he’s racist in act 2 scene1 of the play too))))))) and sits down beside you , like you are old pals (you’ve never met him before but he looks like he could be in some weird cult) he clears his throat and asks you a very personal question. “can i have some French fries?” (I don’t know why there called French fries when I’ve never seen a French person eat fries! all they eat it is stuff like baguettes and crêpes and rats named ratty-two-ee which is a really fun game on the PlayStation 2) And you think {bubbly cloud thinking bubble} “Hahahahahhahahahahahahahaha!!!!!!!!!!!! Hehheheheheh…..heeeheehe..hehe… sigh. I remember that i was just about to eat one of my fries when I noticed something mushy and moist and [insert gross color like green or brown] on the end of one of my fries! now I can give it to this NERD!! ” (yes he is a nerd because all he does all day is watch the extended editions of the hobbit, lord of the rings and star wars and eat fat cakes (what the heck is a fat cake? I think it might be like a Twinkie or something)and twinkies(wow so is doesn’t really matter which is which because he eats both(i may have just done that so I didn’t have to Google what a fat cake is (right now I am typing on my iPhone 3gs anyway, which has a broken antenna so i can’t get internet anyway (it’s actually a really funny story that i’ll tell you sometime)))and sit in his man cave with his friend named Joe (an ACTUAL friend, not a fri end)and all Joe does is watch sports like football with bob and all bob does is gamble ferociously (don’t ask(it means he buys all those bags of chips that say “win a free monkey or something if you find a banana in your bag*”(if there is a little star it meantch!");
	  }
    axios.post('http://localhost:5005/admin/auth/register', {
      email: email,
	    password: password,
	    name: name,
      presentations: [],
    })
      .then((response) => {
        console.log(response)
        localStorage.setItem('token', response.data.token)
        setTokenFn(response.data.token)
        navigate('/dashboard')
      })
      .catch((error) => {
        showError(error);
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
              </form>
              <div className='flex justify-center'>
              <button
                  onClick={signup}
                  className="bg-[#3f4d52] w-full sm:w-[20%] text-white hover:bg-[#566970] py-3.5 px-5 rounded whitespace-nowrap mt-4"
                >
                  Sign up
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );  
}