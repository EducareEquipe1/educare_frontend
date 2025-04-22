import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersList from './UsersList';
import axios from 'axios';

export default function DisplayUsers() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  const handleConsult = async (email) => {
    const token = localStorage.getItem("token");
      if (!token) {
        alert("Access denied. Please log in.");
        return;
      }
    try {
      
      const response = await axios.get(`https://educare-backend-l6ue.onrender.com/medecins/get-dossier-medical/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      
      console.log("Medical form found:", response.data);

      if (response.status === 200) {
        navigate(`/medicalform/${email}`);
      }
    } catch (error) {
      console.error("API error:", error);
      if (error.response) {
        console.error("Error Status:", error.response.status);
        console.error("Error Data:", error.response.data);
      }

      // Handle cases where dossier doesn't exist
      if (error.response && error.response.status === 404) {
        navigate(`/addfile?email=${email}`);
      } else {
        navigate(`/addfile?email=${email}`);
      }
    }
  };

  useEffect(() => {
    const fetchPatients = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Access denied. Please log in.");
        return;
      }

      try {
        const response = await axios.get("https://educare-backend-l6ue.onrender.com/admin/get-all-patients/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setPatients(response.data);
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        if (error.response?.status === 403) {
          alert("Access forbidden. Please check your permissions.");
        } else {
          console.error("Network error:", error);
          alert("Network error. Please try again later.");
        }
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-end bg-[#FFFEFE] mx-8 mb-6 rounded-[15px] border border-[#CACACA] shadow-md py-6 px-6 ml-[150px] mt-[50px]">
      <div className="w-full">
        <div className="flex justify-between text-sm font-semibold text-[#7D7D7D] border-b pb-2 mb-2">
          <span className="w-1/2 sm:w-[150px]">Matricule</span>
          <span className="w-1/2 sm:w-[180px]">Name</span>
          <span className="w-full sm:w-[200px]">Email</span>
          <span className="w-[100px] text-center">Action</span>
        </div>

        <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {patients.length > 0 ? (
            patients.map((patient) => (
              <UsersList
                key={patient.email}
                matricule={patient.matricule}
                prenom={patient.prenom}
                nom={patient.nom}
                email={patient.email}
                onConsult={handleConsult}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">No patients found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
