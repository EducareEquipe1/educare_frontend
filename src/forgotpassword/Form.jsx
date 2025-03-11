import React, { useState } from 'react';
import { MailIcon,Lock } from "lucide-react";


export default function Form() {
  const [email, setEmail] = useState('');

  return (
    <div className="relative bg-[#679294] h-screen p-6  w-[519px] mx-auto  ml-[114px]">

      <h2 className=" decoration-white font-exo2 text-3xl font-bold text-center mt-[232px]">Forgot password</h2>
      <h3>Enter your Email and we will send you a link to reset your password</h3>

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
      
        <button className='!important bg-white text-[#679294] w-[420px] mt-[30px]  border-[10px]'>Submit</button>
      {/* <div className='w-[150px] h-[58.8px] jutify-center'>
        <img
         src='./logo.png'
         className='w-full h-ratio'
        />
      </div>*/}
      </form>
    </div>
  );
}
