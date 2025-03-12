import React, { useState } from 'react';
import { Lock,AlertCircle,Eye,EyeOff } from "lucide-react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

export default function Form() {
    const [newpassword, setNewassword] = useState("");
    const [verifypassword, setVerifyassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showVerifyPassword, setShowVerifyPassword] = useState(false);
  return (
    <div className="relative bg-[#679294] h-screen p-6  lg:w-[519px] mx-auto  ml-[114px] md:w-full sm:w-fulll">

      <h2 className=" decoration-white font-exo2 text-3xl font-bold text-center mt-[150px]">Reset Password</h2>
      <AlertCircle className="w-[30px] h-[30px] text-[#2E3D40] font-size[10px] ml-[222px] mt-[15px]" />

      <form className="flex justify-center items-center">
      <div className="flex flex-col items-center">

      <div className="relative mt-[20px]">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white-500 w-5 h-5" />
        <input
          type={showNewPassword ? "text" : "password"}
          value={newpassword}
          onChange={(e) => setNewassword(e.target.value)}
          placeholder="New Password:"
          className="border border-white rounded-[10px] text-white w-[420px] p-2 pl-10 transition-all duration-300 hover:border-[#2E3D40]"
        />
         <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
      </div>
      <div className="relative mt-[20px]">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white-500 w-5 h-5" />
        <input
          type={showVerifyPassword ?'text':'password'}
          id="password"
          value={verifypassword}
          onChange={(e) => setVerifyassword(e.target.value)}
          placeholder="Confirm New Password:"
          className="border border-white rounded-[10px] text-white w-[420px] p-2 pl-10 transition-all duration-300 hover:border-[#2E3D40]"
        />
        <button
         type="button"
         className='absolute right-3 top-1/2 -translate-y-1/2 text-white'
         onClick={() => setShowVerifyPassword(!showVerifyPassword)}
        >
          {showVerifyPassword ? <Eye className='w-5 h-5'/>: <EyeOff className='w-5 h-5'/>}
        </button>
      </div>
        <button type="submit" className="bg-white text-[#679294] rounded-[10px] w-[420px] h-[40px] mt-[30px] ">Submit</button>
        </div>
      </form>
      <img
          src="/logo.png"
          className="w-[150px] h-[59px] block mx-auto mt-[50px]"
        />
    </div>
    
  )
}

