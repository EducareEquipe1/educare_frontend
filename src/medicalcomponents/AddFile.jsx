import React, { useState, useEffect } from 'react';

import {useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';


export default function AddFile() {
  const [status, setStatus] = useState('Active');
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const location = useLocation();
  const navigate = useNavigate(); // ← add this line
   const { email } = useParams();
 

  useEffect(() => {
    if (email) {
      fetchUserInfo();
    }
  }, [email]);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`https://educare-backend-l6ue.onrender.com/medecins/get-user-info/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserInfo(response.data);
      setStatus(response.data.statut || 'Active');
    } catch (err) {
      console.error("Erreur lors de la récupération des infos utilisateur:", err);
    } finally {
      setLoading(false);
    }
  };

  const goToMedicalForm = () => {
    if (!email || !userInfo) return;
    navigate(`/medicalform/${email}`, {
      state: { userInfo }
    });
  };

  return (
    <div className="fixed bg-[#EFEFEF] w-full h-full">
  
     

        <div className="flex flex-row">
          <div className="w-[239px] bg-white shadow-lg rounded-xl p-6 ml-[200px] mt-[10px]">
            <div className="flex flex-col items-center">
              <img
                src="/logo.png"
                alt="Patient"
                className="w-[133px] h-[194px] object-cover border-4 border-gray-300"
              />
              <span className={`text-sm px-3 py-1 rounded-full mt-2 ${status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                {status}
              </span>
              {userInfo && (
                <div className="text-center mt-2">
                  <p className="font-semibold">{userInfo.nom} {userInfo.prenom}</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col w-full px-4 md:px-12 mt-4">
            <div className='bg-white shadow-md rounded-md p-6'>
              <h2 className="text-xl font-bold mb-4">Medical Dossier</h2>
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <button
                  className="rounded text-white bg-[#679294] w-[140px] h-[40px]"
                  onClick={goToMedicalForm}
                >
                  Ajouter
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

  );
}
