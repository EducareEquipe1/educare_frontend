import React, { useState } from 'react';
import { MailIcon,Lock } from "lucide-react";
import { AlertCircle } from "lucide-react";


export default function Form() {
  const [email, setEmail] = useState('');

  return (
    <div className="relative bg-[#679294] h-screen p-6  lg:w-[519px] mx-auto ml-[114px] md:w-full sm:w-full">

      <h2 className=" decoration-white font-exo2 text-3xl font-bold text-center mt-[129px]">Forgot password</h2>
      <AlertCircle className="w-[30px] h-[30px] text-[#2E3D40] font-size[10px] ml-[222px] mt-[15px]" />
      <h3 className='mt-[20px] text-[#2E3D40] font-bold text-center'>Enter your Email and we will send you a link to reset your password</h3>

      <form className="flex justify-center items-center">
        <div className="flex flex-col items-center">

      <div className="relative mt-[30px]">
        <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white-500 w-5 h-5" />
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border border-white rounded-[10px] text-white w-[420px] p-2 pl-10 "
        />
      </div>
      
        <button className="bg-white text-[#679294] rounded-[10px] w-[420px] h-[40px] mt-[30px] ">Submit</button>
        </div>
      </form>
      <img
          src="/logo.png"
          className="w-[150px] h-[59px] block mx-auto mt-[45px]"
        />
    </div>
  );
}
