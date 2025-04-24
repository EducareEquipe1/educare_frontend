import React, { useEffect, useState } from "react";
import { useLocation, useParams } from 'react-router-dom';
import SideBar from './SideBar';
import AntécédentsMedicaux from './AntécédentsMedicaux';
import AntécédentsPersonels from './AntécédentsPersonels';
import DonnéesBiométrique from './DonnéesBiométrique';
import DetailsPersonnels from './DetailsPersonnels';

const MedicalForm = () => {
  
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [medicalRecordLoading, setMedicalRecordLoading] = useState(false);
  const [recordExists, setRecordExists] = useState(true);    

  const location = useLocation();
  const { email } = useParams();

  const [patientData, setPatientData] = useState({
    prenom: '',
    nom: '',
    email: '',
    isActif: "",
  });

  const [formData, setFormData] = useState({
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
    notes: "none",
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

  const tabs = [
    { id: 'dossier', label: 'Dossier Médicale' },
    { id: 'examen', label: 'Examen Médicale' },
    { id: 'rendezvous', label: 'Rendez-vous' },
    { id: 'ordonnances', label: 'Ordonnances' }
  ];

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!email) return;

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Access denied. Please log in.");
        return;
      }

      try {
        // 1. Get user info
        const userResponse = await fetch(`https://educare-backend-l6ue.onrender.com/medecins/get-user-info/${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) throw new Error("Failed to fetch user info");

        const userInfo = await userResponse.json();

        setPatientData({
          prenom: userInfo.prenom,
          nom: userInfo.nom,
          email: userInfo.email,
          isActif: userInfo.isActif,
        });

        setFormData(prev => ({
          ...prev,
          nom: userInfo.nom,
          prenom: userInfo.prenom,
          num_tel: userInfo.num_tel,
          statut: userInfo.statut,
          date_naissance: userInfo.date_naissance,
          email: userInfo.email
        }));

        // 2. Check if medical record exists
        const recordResponse = await fetch(`https://educare-backend-l6ue.onrender.com/medecins/get-dossier-medical/${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (recordResponse.status === 404) {
          setRecordExists(false);
          return;
        }

        if (!recordResponse.ok) throw new Error("Failed to fetch medical record");

        const recordData = await recordResponse.json();
        setFormData(prev => ({ ...prev, ...recordData }));
        setRecordExists(true);
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      }
    };

    fetchInitialData();
  }, [email]);

  const handleChange = (e) => {
    if (!recordExists || isEditing) {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleEditMode = () => {
    if (isEditing) {
      handleSubmit();
    }
    setIsEditing(!isEditing);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Access denied. Please log in.");
      return;
    }

    const method = recordExists ? "PUT" : "POST";
    const url = recordExists
      ? `https://educare-backend-l6ue.onrender.com/medecins/medical-records-update/${email}`
      : `https://educare-backend-l6ue.onrender.com/medecins/dossier-medical-create/${email}`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        if (response.status === 400) {
          alert(`Validation error: ${errorResponse.message || 'Please check the form data.'}`);
        } else if (response.status === 500) {
          alert("Server error: Unable to process your request. Please try again later.");
        } else {
          alert(`Unexpected error: ${errorResponse.message || 'Please try again later.'}`);
        }
        throw new Error("Erreur lors de la soumission du formulaire");
      }

      const data = await response.json();
      alert(recordExists ? "Dossier mis à jour avec succès !" : "Dossier créé avec succès !");
      setFormData(prev => ({ ...prev, ...(data?.dossier || data) }));
      setRecordExists(true);
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      alert(`Error: ${error.message || 'An unexpected error occurred.'}`);
    }
  };

  return (
    <div className="relative flex bg-[#EFEFEF]">
      <div className="flex flex-row">
        <div className="w-[239px] h-fit bg-white shadow-lg rounded-xl p-6 space-y-6 ml-[200px] mt-[10px]">
          <div className="flex flex-col items-center">
            <img
              src="./logo.png"
              alt="Patient"
              className="text-black w-[133px] h-[194px] object-cover border-4 border-gray-300"
            />
            <h2 className="mt-4 text-black text-lg font-semibold">{patientData.nom} {patientData.prenom}</h2>
            <h2 className="mt-4 text-gray-600 text-lg font-semibold">{patientData.email}</h2>
            <span
              className={`text-sm px-3 py-1 rounded-full mt-2 ${
                patientData.isActif === false ? "text-red-500" : "text-green-500"
              }`}
            >
              {patientData.isActif === false ? "Inactive" : "Active"}
            </span>
          </div>

          <div>
            <label className="block text-black text-sm font-bold mb-1">Notes du médecin</label>
            <textarea
              name="notesMedecin"
              value={formData.notesMedecin || ''}
              onChange={handleChange}
              placeholder="Écrire des observations ici..."
              rows="6"
              className="w-full text-black border border-gray-300 rounded-md px-3 py-2 resize-none"
              readOnly={!isEditing}
            />
          </div>
        </div>

        <div className="flex flex-col w-full px-4 md:px-12 mt-4">
          {(loading) ? (
            <div className="flex justify-center items-center p-6">
              <p className="text-gray-600">Chargement des données...</p>
            </div>
          ) : (
            <form className="flex flex-col w-full space-y-6 px-6 mt-[10px]">
              <DetailsPersonnels 
                formData={formData} 
                handleChange={handleChange} 
                readOnly={!isEditing}
              />
              <DonnéesBiométrique 
                formData={formData} 
                handleChange={handleChange} 
                readOnly={!isEditing}
              />
              <AntécédentsPersonels 
                formData={formData} 
                handleChange={handleChange} 
                readOnly={!isEditing}
              />
              <AntécédentsMedicaux 
                formData={formData} 
                handleChange={handleChange} 
                readOnly={!isEditing}
              />
              <button 
                type="button" 
                onClick={toggleEditMode} 
                className="rounded text-white bg-[#679294] w-[109px] h-[34px]"
              >
                {isEditing ? 'Sauvegarder' : 'Modifier'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalForm;
