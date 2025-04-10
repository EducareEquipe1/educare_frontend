/*import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import axios from 'axios';

export default function AddFile() {
  const [activeTab, setActiveTab] = useState('dossier');
  const status = "Active";

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const [formData, setFormData] = useState({
      email:"",
      numSecuritéSociale: "",
      groupeSanguin: "A+",
      nom: "",
      prenom: "",
      date_naissance: "",
      situation_famille: "Célibataire",
      statut: "",
      adresse: "",
      num_tel: "",
      notes: "",
      poids: "",
      taille: "",
      // AntécédentsPersonels fields
      tabac_fume: "",
      tabac_fume_nombre: "",
      tabac_chique: "",
      tabac_chique_nombre: "",
      tabac_pris:"",
      tabac_pris_nombre:"",
      age_pris: "",
      ancien_fume: "",
      periode_exposition: "",
      alcool: "",
      medicaments: "",
      
      // AntécédentsMedicaux fields
      affectionsCongenitales: "",
      maladiesGenerales: "",
      interventionsChirurgicales: "",
      reactionsAllergiques: "",
    });

  const [patientData, setPatientData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  {/*useEffect(() => {
    if (email) {
      const fetchPatientData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/patient/${email}`);
          if (!response.ok) {
            throw new Error('Patient not found or error occurred');
          }
          const data = await response.json();
          setPatientData(data);
        } catch (err) {
          console.error('Error:', err.message);
        }
      };
      fetchPatientData();
    } else {
      console.error('No email parameter found');
    }
  }, [email]);}

  const handleConsult = async () => {
    try {
      const response = await axios.get(`/api/medical-form/get/${email}`);
      if (response.status === 200) {
        navigate(`/medicalForm/${email}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        navigate(`/addFile/${email}`);
      } else {
        console.error("Erreur lors de la vérification du dossier médical", error);
        navigate(`/addFile/${email}`);
      }
    }
  };

  const handleSubmit = () => {

    const url = 'https://educare-backend-l6ue.onrender.com/medecins/dossier-medical-create';
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Access denied. Please log in.");
      return;
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(patientData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Une erreur est survenue lors de l'envoi du formulaire");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Réponse du serveur :", data);
        alert("Dossier médical créé avec succès !");
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi :", error);
        alert("Erreur lors de l'envoi du formulaire.");
      });
  };

  const tabs = [
    { id: 'dossier', label: 'Dossier Médical' },
    { id: 'examen', label: 'Examen Médical' },
    { id: 'rendezvous', label: 'Rendez-vous' },
    { id: 'ordonnances', label: 'Ordonnances' },
  ];

  return (
    <div className="fixed bg-[#EFEFEF] w-full h-full">
      <SideBar />

      <div className="flex flex-col w-full">
        <div className="flex h-[40px] md:max-h-[60px] justify-between items-center px-4 md:px-12 shadow-md bg-gradient-to-r from-[#A9C2C3] to-[#BED1D1]">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#679294] text-l md:text-2xl font-bold ml-[95px]">
            Patients
          </h1>
        </div>

        <div className="flex flex-row">
          <div className="w-[239px] h-fit bg-white shadow-lg rounded-xl p-6 space-y-6 ml-[200px] mt-[10px]">
            <div className="flex flex-col items-center">
              <img
                src="./logo.png"
                alt="Patient"
                className="w-[133px] h-[194px] object-cover border-4 border-gray-300"
              />
              <h2 className="mt-4 text-black text-lg font-semibold">
                {patientData.first_name} {patientData.last_name}
              </h2>
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
                  className={`text-black font-bold md:text-base border-b-2 transition duration-300 ease-in-out ${
                    activeTab === tab.id
                      ? 'border-[#F4A261]'
                      : 'border-transparent hover:border-[#F4A261]'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'dossier' && (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-md rounded-md p-4'>
                  <h3 className='text-gray-600'>Aucun dossier médical disponible</h3>
                  <button onClick={handleSubmit} className="rounded text-white bg-[#679294] w-[109px] h-[34px] mt-[10px]">
                    Ajouter
                  </button>
                </div>
              )}

              {activeTab === 'examen' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Examen Médical</h2>
                  <p>Résultats des examens médicaux récents...</p>
                </div>
              )}

              {activeTab === 'rendezvous' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Rendez-vous</h2>
                  <p>Liste des prochains rendez-vous médicaux...</p>
                </div>
              )}

              {activeTab === 'ordonnances' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Ordonnances</h2>
                  <p>Liste des ordonnances actives...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} */
  import React, { useState, useEffect } from 'react';
  import { useNavigate, useLocation } from 'react-router-dom';
  import axios from 'axios';
  import SideBar from './SideBar';
  
  export default function AddFile() {
    const [activeTab, setActiveTab] = useState('dossier');
    const [patientData, setPatientData] = useState({
      email: "",
      numSecuritéSociale: "",
      groupeSanguin: "A+",
      nom: "",
      prenom: "",
      date_naissance: "",
      situation_famille: "Célibataire",
      statut: "",
      adresse: "",
      num_tel: "",
      notes: "",
      poids: "",
      taille: "",
      tabac_fume: "",
      tabac_fume_nombre: "",
      tabac_chique: "",
      tabac_chique_nombre: "",
      tabac_pris: "",
      tabac_pris_nombre: "",
      age_pris: "",
      ancien_fume: "",
      periode_exposition: "",
      alcool: "",
      medicaments: "",
      affectionsCongenitales: "",
      maladiesGenerales: "",
      interventionsChirurgicales: "",
      reactionsAllergiques: "",
    });
  
    const [status, setStatus] = useState("Active");
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");
  
    useEffect(() => {
      if (email) {
        // You can use this if you want to fetch existing patient data
        axios.get(`/api/dossier-medical/${email}`)
          .then(response => {
            setPatientData(response.data); // Assuming response contains patient data
          })
          .catch(error => {
            console.error("Error fetching patient data", error);
          });
      }
    }, [email]);
    const handleSubmit = async () => {
      try {
        const url = 'https://educare-backend-l6ue.onrender.com/medecins/dossier-medical-create';  // Ensure this is the correct URL
        const token = localStorage.getItem("token");
    
        if (!token) {
          alert("Access denied. Please log in.");
          return;
        }
    
        const data = { ...patientData, email }; // Ensure email is included
    
        // Check if the data is correctly structured
        console.log("Sending data to backend:", data);
    
        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
    
        if (response.status === 201) {
          alert("Dossier médical créé avec succès !");
          navigate(`/medicalForm/${email}`);
        } else {
          alert("Une erreur est survenue lors de la création du dossier.");
          console.error("Response status:", response.status);
        }
      } catch (error) {
        if (error.response) {
          // Handle known API error responses
          console.error("Erreur lors de l'envoi:", error.response.data);
          alert(`Erreur: ${error.response.data.message || 'Erreur inconnue'}`);
        } else {
          // Handle unknown errors (network, server, etc.)
          console.error("Erreur serveur:", error);
          alert("Erreur lors de l'envoi du formulaire.");
        }
      }
    };
  
    const tabs = [
      { id: 'dossier', label: 'Dossier Médical' },
      { id: 'examen', label: 'Examen Médical' },
      { id: 'rendezvous', label: 'Rendez-vous' },
      { id: 'ordonnances', label: 'Ordonnances' },
    ];
  
    return (
      <div className="fixed bg-[#EFEFEF] w-full h-full">
        <SideBar />
  
        <div className="flex flex-col w-full">
          <div className="flex h-[40px] md:max-h-[60px] justify-between items-center px-4 md:px-12 shadow-md bg-gradient-to-r from-[#A9C2C3] to-[#BED1D1]">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#679294] text-l md:text-2xl font-bold ml-[95px]">
              Patients
            </h1>
          </div>
  
          <div className="flex flex-row">
            <div className="w-[239px] h-fit bg-white shadow-lg rounded-xl p-6 space-y-6 ml-[200px] mt-[10px]">
              <div className="flex flex-col items-center">
                <img
                  src="./logo.png"
                  alt="Patient"
                  className="w-[133px] h-[194px] object-cover border-4 border-gray-300"
                />
                <h2 className="mt-4 text-black text-lg font-semibold">
                  {patientData.nom} {patientData.prenom}
                </h2>
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
                    className={`text-black font-bold md:text-base border-b-2 transition duration-300 ease-in-out ${activeTab === tab.id ? 'border-[#F4A261]' : 'border-transparent hover:border-[#F4A261]'}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
  
              <div className="p-6">
                {activeTab === 'dossier' && (
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-md rounded-md p-4'>
                    <h3 className='text-gray-600'>Aucun dossier médical disponible</h3>
                    <button onClick={handleSubmit} className="rounded text-white bg-[#679294] w-[109px] h-[34px] mt-[10px]">
                      Ajouter
                    </button>
                  </div>
                )}
  
                {activeTab === 'examen' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Examen Médical</h2>
                    <p>Résultats des examens médicaux récents...</p>
                  </div>
                )}
  
                {activeTab === 'rendezvous' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Rendez-vous</h2>
                    <p>Liste des prochains rendez-vous médicaux...</p>
                  </div>
                )}
  
                {activeTab === 'ordonnances' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Ordonnances</h2>
                    <p>Liste des ordonnances actives...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  