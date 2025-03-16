import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import { FaUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import DisplayDoctors from "./DisplayDoctors";
import { GiHelp } from "react-icons/gi";
import { LuLogOut } from "react-icons/lu";

const Doctors = () => {
  const [popout, setPopout] = useState(false);
  const [doctors, setDoctors] = useState([]); // Store doctors list
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch doctors from backend
  useEffect(() => {
    const getAllMedecins = async () => {
      const token = localStorage.getItem("token");
  
      try {
        const response = await fetch(
          "https://educare-backend-l6ue.onrender.com/admin/get-all-medecins/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Failed to fetch data: ${errorMessage}`);
        }
  
        const data = await response.json();
        console.log("Fetched doctors:", data); // ✅ Vérifier si les données arrivent
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    getAllMedecins();
  }, []);
  

  return (
    <div className="relative flex bg-[#EFEFEF]">
      <SideBar />
      <div className="flex flex-col w-full">
        <div className="flex h-[40px] md:max-h-[60px] justify-between items-center px-4 md:px-12 shadow-md bg-gradient-to-r from-[#A9C2C3] to-[#BED1D1]">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#679294] text-l md:text-2xl font-bold">
            Medical team
          </h1>
        </div>

        {/* Display fetched doctors */}
        <div className="flex justify-start my-6 mx-6">
          
            <DisplayDoctors doctors={doctors} setDoctors={setDoctors} />
        </div>
      </div>
    </div>
  );
};

export default Doctors;
