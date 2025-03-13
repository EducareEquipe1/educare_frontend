import React from 'react'

export default function Form() {

  return (
    <div className="relative bg-[#679294] h-screen p-6 lg:w-[519px] mx-auto ml-[114px] md:w-full sm:w-full">
        <h1 className='decoration-white font-exo2 text-3xl font-bold text-center mt-[150px]'>Please check your email</h1>
        <p className=' mt-[20px] text-[#2E3D40] font-bold-300 text-center'>we just sent an email  click the link in the email to verify your account</p>
        <button type="submit"
        onMouseDown={(e) => e.target.style.opacity = "0.8"}
        onMouseUp={(e) => e.target.style.opacity = "1"}  
        className="block mx-auto bg-white text-[#679294] rounded-[10px] w-[420px] h-[40px] mt-[30px] "  >
          Resend Email
        </button>
        <img
          src="/logo.png"
          className="w-[150px] h-[59px] block mx-auto mt-[136px]"
        />
    </div>
  )
}
