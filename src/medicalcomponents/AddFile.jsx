import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import SideBar from './SideBar';

export default function AddFile() {
  const [activeTab, setActiveTab] = useState('dossier');
  const [patientData, setPatientData] = useState(null);
  const [status, setStatus] = useState('Active');
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const token = localStorage.getItem("doctorToken");

  useEffect(() => {
    if (email && token) {
      fetchPatientInfo(email);
    }
  }, [email]);

  const fetchPatientInfo = async (email) => {
    try {
      const response = await axios.get(`https://educare-backend-l6ue.onrender.com/patients/${email}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPatientData(response.data);
      setStatus(response.data.statut);
    } catch (error) {
      console.error("Erreur lors de la récupération des infos patient :", error);
    }
  };

  const createDossier = async () => {
    if (!patientData) return;
    setLoading(true);

    try {
      await axios.post(
        "https://educare-backend-l6ue.onrender.com/medecins/dossier-medical-create/",
        {
          email: patientData.email,
          nom: patientData.nom,
          prenom: patientData.prenom,
          statut: patientData.statut,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Dossier médical créé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la création du dossier médical :", error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'dossier', label: 'Medical Dossier' },
    { id: 'examen', label: 'Medical Exam' },
    { id: 'rendezvous', label: 'Rendez-vous' },
    { id: 'ordonnances', label: 'Prescriptions' },
  ];

  return (
    <div className="fixed bg-[#EFEFEF] w-full h-full">
      <SideBar />
      <div className="flex flex-col w-full">
        <div className="flex h-[60px] justify-between items-center px-4 md:px-12 shadow-md bg-gradient-to-r from-[#A9C2C3] to-[#BED1D1]">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#679294] text-2xl font-bold ml-[95px]">
            Patients
          </h1>
        </div>

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
            </div>
          </div>

          <div className="flex flex-col w-full px-4 md:px-12 mt-4">
            <div className="flex space-x-6 border-b border-gray-300 pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`text-black font-bold md:text-base border-b-2 transition duration-300 ${activeTab === tab.id ? 'border-[#F4A261]' : 'border-transparent hover:border-[#F4A261]'}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'dossier' && (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-md rounded-md p-4'>
                  {loading ? (
                    <div className="col-span-2 flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    <button
                      className="rounded text-white bg-[#679294] w-[140px] h-[40px]"
                      onClick={createDossier}
                    >
                      Créer Dossier
                    </button>
                  )}
                </div>
              )}

              {activeTab === 'examen' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Medical Exam</h2>
                  <p>Recent medical exam results...</p>
                </div>
              )}

              {activeTab === 'rendezvous' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Appointments</h2>
                  
                </div>
              )}

              {activeTab === 'ordonnances' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Prescriptions</h2>
                  <p>List of active prescriptions...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
