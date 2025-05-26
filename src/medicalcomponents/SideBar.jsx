import React, { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { FaUserDoctor } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";

const SideBar = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 h-full">
        <div className="flex flex-col gap-12 h-screen bg-gradient-to-b from-[#A9C2C3] to-[#679294]">
          <div className="flex justify-between items-end mx-2 mt-4    w-[80px] md:w-[120px] gap-2 md:gap-2">
            <img src="/logo.png" alt="" className="ml-[0.5px] mt-4" />
          </div>
          <ul className="flex flex-col gap-2 md:gap-8 px-4 md:px-6 text-[12px] md:text-[16px]">
            
            
            <li className="flex items-center gap-2">
              <a
                    href="/user"
                    className="flex items-center gap-2 hover:bg-[linear-gradient(to_left,#2E3D40,transparent)] hover:text-white  transition-[5s]  py-2 rounded-full"
                  >
             
                <HiUsers />
                <p>Patients</p>
         </a>
            </li>
            <li className="flex items-center gap-2">
              <a
                    href="/rendezvous"
                    className="flex items-center gap-2 hover:bg-[linear-gradient(to_left,#2E3D40,transparent)] hover:text-white  transition-[5s]  py-2  rounded-full"
                  >
                
                     <FaUserDoctor />
                            <p className="">Rendez-vous</p>
                            </a>
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
