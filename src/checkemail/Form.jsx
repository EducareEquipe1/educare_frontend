import React from 'react'

export default function Form() {
  return (
    <div className="relative bg-[#679294] h-screen p-6 w-[519px] mx-auto ml-[114px]">
        <h1>Please check your email</h1>
        <p>we just sent an email to click the link in the email to verify your account</p>
        <button type="submit"  className="bg-white text-[#679294] w-[420px] mt-[30px] border-[10px]"  >
          Resend mail
        </button>
    </div>
  )
}
