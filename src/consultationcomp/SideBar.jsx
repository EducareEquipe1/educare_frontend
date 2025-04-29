import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { FaUserDoctor } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa"; // little arrow for dropdown
import { Link } from "react-router-dom"; // assuming you're using react-router

const SideBar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);

  // Get the user's email from localStorage
  const email = localStorage.getItem("email") || "no-email@example.com";

  return (
    <div>
      <div className="fixed top-0 left-0 h-full">
        <div className="flex flex-col gap-12 h-screen bg-gradient-to-b from-[#A9C2C3] to-[#679294]">
          <div className="flex justify-between items-end mx-2 mt-4 w-[80px] md:w-[120px] gap-2 md:gap-2">
            <img src="/logo.png" alt="logo" className="ml-[0.5px] mt-4" />
          </div>

          <ul className="flex flex-col gap-2 md:gap-4 px-4 md:px-6 text-[12px] md:text-[16px]">
            <li className="flex items-center gap-2">
              <MdDashboard />
              <p>Home</p>
            </li>

            <li className="flex items-center gap-2">
              <FaUserDoctor />
              <p>Rendez-vous</p>
            </li>

            {/* Patients with dropdown */}
            <li className="relative">
              <div
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <HiUsers />
                <p>Patients</p>
                <FaChevronDown className={`transition-transform ${openDropdown ? "rotate-180" : ""}`} />
              </div>

              {openDropdown && (
                <ul className="absolute left-10 mt-2 bg-white shadow-lg rounded-md py-2 w-40 z-20">
                  <li className="px-4 py-2 text-black hover:bg-gray-100">
                    <Link to={`/medicalform/${email}`}>Medical Form</Link>
                  </li>
                  <li className="px-4 py-2 text-black hover:bg-gray-100">
                    <Link to={`/listeconsultation/${email}`}>Consultation</Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="flex items-center gap-2">
              <IoSettingsSharp />
              <p>Paramètres</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
