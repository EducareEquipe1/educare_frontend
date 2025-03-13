import React, { useState } from "react";
import { MailIcon, Lock,Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    setIsLoading(true);
    await handleLogin(); 
    setIsLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://educare-backend-l6ue.onrender.com/patients/login/", { email, password });

      localStorage.setItem("token", res.token); // Store JWT token
      setMessage("Login successful!");
      if (res.patient.is_active ==true){
      navigate("/home");
      localStorage.setItem("token", res.data.token); // Store JWT token
      } else {
        navigate("/checkemail", { state: { email: email } });
      }

    } catch (error) {
      setMessage("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="relative bg-[#679294] h-screen p-6  lg:w-[519px] mx-auto ml-[114px] md:w-full sm:w-full ">

      <h2 className="decoration-white font-exo2 text-3xl font-bold text-center mt-[118px]">
        Welcome back
      </h2>

      <form className="flex justify-center items-center">
        <div className="flex flex-col items-center">

        {/*email*/}
        <div className="relative mt-[30px]">
          <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white-500 w-5 h-5" />
          <input
            type='email'
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-white rounded-[10px] text-white w-[420px] p-2 pl-10"
          />
        </div>

        {/*Password*/}
        <div className="relative mt-[20px]">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white-500 w-5 h-5" />
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-white rounded-[10px] text-white w-[420px] p-2 pl-10"
          />
           {/*show/hid password*/}
            <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
            onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
      </button>
        </div>

        {/*submit button*/}
        <button type="submit" 
        onClick={handleClick} 
        disabled={isLoading}
        onMouseDown={(e) => e.target.style.opacity = "0.8"} 
        onMouseUp={(e) => e.target.style.opacity = "1"}
        className="bg-white text-[#679294] rounded-[10px] w-[420px] h-[40px] mt-[30px] "  >
         {isLoading ? "Signing in..." : "Sign in"}
        </button>

        <h3>
        <Link to="/forgotpassword" className="font-exo2 text-white flex justify-end] pl-[330px] " >
          Forgot password?
          </Link>
          </h3>
          <div className=" w-[266px] h-[1px] bg-[#2E3D40] mt-[20px]"></div>
        <p>Don't have an account yet? <Link to="/" className="text-[#2E3D40]"> Sign up</Link></p>
        <p className="text-red-500 mt-1">{message}</p>
        </div>
      </form>

      <img
          src="/logo.png"
          className="w-[150px] h-[59px] block mx-auto mt-[25px]"
        />
    </div>
  );
}

