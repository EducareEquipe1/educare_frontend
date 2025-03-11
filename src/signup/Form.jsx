import React, { useState } from 'react';
import { MailIcon,Lock } from "lucide-react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";


export default function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 


  const handleSignup =async(e) =>{
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:5173/register", { email, password });
      setMessage(res.data.message)

      if (res.status === 201) {
        setTimeout(() => {
          navigate("/signin"); // Redirect to Signin page after signup
        }, 2000); // Delay for user feedback
      }
    }
    catch(error){
      setMessage("Error signing up.Try again")
    }
  }

  return (
    <div className="relative bg-[#679294] h-screen p-6  w-[519px] mx-auto  ml-[114px]">

      <h2 className=" decoration-white font-exo2 text-3xl font-bold text-center mt-[232px]">Create an account</h2>

      <form className="mt-4">

      <div className="relative mt-4">
        <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border border-[#2E3D40] rounded-[10px] text-[#2E3D40] w-[420px] p-2 pl-10"
        />
      </div>
      <div className="relative mt-4">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password:"
          className="border border-[#2E3D40] rounded-[10px] text-[#2E3D40] w-[420px] p-2 pl-10 "
        />
      </div>
        <button type="submit" onClick={handleSignup} className='!important bg-white text-[#679294] w-[420px] mt-[30px]  border-[10px]'>Sign up</button>
        <p>Already have an account?<Link to="/signin">Log in</Link></p>
      </form>
    </div>
  );
}
