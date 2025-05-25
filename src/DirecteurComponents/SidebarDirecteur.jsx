import React, { useState } from "react";
import logo from "/public/logo.png";
import { MdDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { IoMdArchive } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { BsGraphUp } from "react-icons/bs";



const SidebarDirecteur = () => {
  return (
    <div>
          <div className="flex h-full  ">
            <div className="flex flex-col gap-12 h-screen bg-gradient-to-b from-[#A9C2C3] to-[#679294] pr-3">
              <div className="flex justify-between items-end mx-2 mt-4    w-[80px] md:w-[120px] gap-2 md:gap-2">
                <img src={logo} alt="" className="ml-3 mt-4" />
              </div>
              <ul className="flex flex-col gap-2 md:gap-4 px-4 md:px-6 text-[12px] md:text-[14px]">
                <li>
                  <a
                    href="/directeur"
                    className="flex items-center gap-2 hover:bg-[linear-gradient(to_left,#2E3D40,transparent)] hover:text-white  transition-[5s]  py-2 rounded-full"
                  >
                    <BsGraphUp />
                    <p>Statistiques</p>
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className="flex items-center gap-2 hover:bg-[linear-gradient(to_left,#2E3D40,transparent)] hover:text-white transition-[5s]  py-2 rounded-full"
                  >
                    <HiUsers />
                    <p>Utilisateurs</p>
                  </a>
                </li>
    
                
    
                <li>
                  <a
                    href=""
                    className="flex items-center gap-2  hover:bg-[linear-gradient(to_left,#2E3D40,transparent)] hover:text-white transition-[5s]  py-2 rounded-full"
                  >
                    <IoSettingsSharp />
                    <p>Paramètre </p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
  )
}

export default SidebarDirecteur
