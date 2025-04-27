import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SideBar from './SideBar';
import MedicalForm from './MedicalForm';
import ConsultationList from '../consultationcomp/ConsultationList'


const Medecin = () => {
  const [activeTab, setActiveTab] = useState('dossier');
  const [loading, setLoading] = useState(false);

  const { email } = useParams();

  const tabs = [ 
    { id: 'consultation', label: 'Consultation' },
    { id: 'dossier', label: 'Dossier Médicale' },
    { id: 'rendezvous', label: 'Rendez-vous' },
    { id: 'ordonnances', label: 'Ordonnances' }
  ];

  useEffect(() => {
    const fetchMedicalRecord = async () => {
      if (!email) return;

      setLoading(true);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Access denied. Please log in.");
          return;
        }

        await axios.get(
          `https://educare-backend-l6ue.onrender.com/medecins/get-dossier-medical/${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      } catch (error) {
        console.error("Erreur lors de la récupération du dossier médical:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalRecord();
  }, [email]);

  return (
    <div className="flex h-screen bg-[#EFEFEF] overflow-hidden">
      {/* Sidebar */}
      <div className="w-[100px] bg-white shadow-md fixed top-0 left-0 bottom-0 z-10">
        <SideBar />
      </div>

      {/* Main content */}
      <div className="flex flex-col w-full ml-[100px]">
        {/* Header */}
        <div className="h-[60px] ml-[37px] flex items-center px-8 shadow bg-gradient-to-r from-[#A9C2C3] to-[#BED1D1] z-10">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#679294] text-xl md:text-2xl font-bold">
            Patients
          </h1>
        </div>

        {/* Tabs */}
        <div className="sticky ml-[450px] top-[60px] bg-[#EFEFEF] z-10 px-8 py-3 flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`text-black font-bold text-sm md:text-base border-b-2 transition duration-300 ease-in-out ${
                activeTab === tab.id
                  ? 'border-[#F4A261]'
                  : 'border-transparent'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto px-8 py-4">
          {loading ? (
            <div className="flex justify-center items-center p-6">
              <p className="text-gray-600">Chargement des données...</p>
            </div>
          ) : (
            <>
              {activeTab === 'consultation' && <ConsultationList/>  }
              {activeTab === 'dossier' && <MedicalForm/>}
            

              {activeTab === 'rendezvous' && (
                <div className="p-4 bg-gray-50 rounded-md">
                  <h2 className="text-xl font-bold mb-4">Rendez-vous</h2>
                  <p>Liste des prochains rendez-vous médicaux...</p>
                </div>
              )}

              {activeTab === 'ordonnances' && (
                <div className="p-4 bg-gray-50 rounded-md">
                  <h2 className="text-xl font-bold mb-4">Ordonnances</h2>
                  <p>Liste des ordonnances actives...</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Medecin;


