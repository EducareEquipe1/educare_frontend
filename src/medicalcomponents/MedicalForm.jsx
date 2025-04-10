import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import SideBar from './SideBar';
import AntécédentsMedicaux from './AntécédentsMedicaux'
import AntécédentsPersonels from './AntécédentsPersonels'
import DonnéesBiométrique from './DonnéesBiométrique'
import DetailsPersonnels from './DetailsPersonnels'

const MedicalForm = () => {
  const status = "true";
  const [activeTab, setActiveTab] = useState('dossier');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [medicalRecordLoading, setMedicalRecordLoading] = useState(false);

  const location = useLocation();
  /*const email = new URLSearchParams(location.search).get("email");*/
  const email = "ahlemyyy@esi-sba.dz";

  const [patientData, setPatientData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  
  const tabs = [
    { id: 'dossier', label: 'Dossier Médicale' },
    { id: 'examen', label: 'Examen Médicale' },
    { id: 'rendezvous', label: 'Rendez-vous' },
    { id: 'ordonnances', label: 'Ordonnances' }
  ];

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

  // Fetch patient basic info
 /* useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://educare-backend-l6ue.onrender.com/medecins/dossier-medical/${email}`);
        if (!response.ok) throw new Error("Patient not found");
        const data = await response.json();
        setPatientData(data);
        
        // Pre-fill some form data with patient info
        setFormData(prev => ({
          ...prev,
          nom: data.last_name || "",
          prenom: data.first_name || "",
          email: data.email || ""
        }));
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    if (email) fetchPatientData();
  }, [email]);*/

  // Fetch medical record data
  useEffect(() => {
    const fetchMedicalRecord = async () => {
      if (!email) return;

      const token = localStorage.getItem("token"); // Get token from local storage

      if (!token) {
        alert("Access denied. Please log in.");
        return;
      }
      
      setMedicalRecordLoading(true);
      try {
        const response = await fetch(`https://educare-backend-l6ue.onrender.com/medecins/get-dossier-medical/${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Pass the token in the header
          },
        });
        if (!response.ok) {
          if (response.status === 404) {
            console.log("No medical record found for this patient");
            return;
          }
          throw new Error("Failed to fetch medical record");
        }
        
        const data = await response.json();
        console.log("Fetched medical record:", data);
        
        // Update formData with the fetched medical record
        setFormData(prev => ({
          ...prev,
          ...data,
        }));
      } catch (err) {
        console.error("Error fetching medical record:", err);
      } finally {
        setMedicalRecordLoading(false);
        console.log("Email utilisé:", email);
      }
    };
    
    fetchMedicalRecord();
  }, [email]);

  const handleChange = (e) => {
    // Only update formData if in edit mode
    if (isEditing) {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Toggle between edit and read-only mode
  const toggleEditMode = () => {
    if (isEditing) {
      // If currently editing, submit the form
      handleSubmit();
    }
    // Toggle the editing state
    setIsEditing(!isEditing);
  };

  // Function to submit the form
  const handleSubmit = () => {
    console.log("Formulaire soumis :", formData);
  
    const method = formData.email ? 'PUT' : 'POST';
    const url = formData.email 
      ? `https://educare-backend-l6ue.onrender.com/medecins/medical-records-update/${formData.email}/`
      : 'https://educare-backend-l6ue.onrender.com/medecins/dossier-medical-create';
  
    // Get the token from localStorage
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("Access denied. Please log in.");
      return;
    }
  
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Add Authorization header
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Une erreur est survenue lors de l\'envoi du formulaire');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Réponse du serveur :', data);
        setFormData(prev => ({
          ...prev,
          ...data.dossier, // <-- instead of spreading all of data
        }));
        alert(formData.id ? 'Dossier médical mis à jour avec succès !' : 'Dossier médical créé avec succès !');
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi :', error);
        alert('Erreur lors de l\'envoi du formulaire.');
      });
  };

  return (
    <div className="relative flex bg-[#EFEFEF]">
      <SideBar />
  
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="flex h-[40px] md:max-h-[60px] justify-between items-center px-4 md:px-12 shadow-md bg-gradient-to-r from-[#A9C2C3] to-[#BED1D1]">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#679294] text-l md:text-2xl font-bold ml-[95px]">
            Patients
          </h1>
        </div>
  
        {/* Main Content */}
        <div className="flex flex-row">
          {/* Right Sidebar */}
          <div className="w-[239px] h-fit bg-white shadow-lg rounded-xl p-6 space-y-6 ml-[200px] mt-[10px]">
            {/* Photo + Status */}
            <div className="flex flex-col items-center">
              <img
                src="./logo.png"
                alt="Patient"
                className="text-black w-[133px] h-[194px] object-cover border-4 border-gray-300"
              />
              <h2 className="mt-4 text-black text-lg font-semibold">{patientData.first_name}{patientData.last_name}</h2>
              <h2 className="mt-4 text-gray-600 text-lg font-semibold">{patientData.email}</h2>
              <span
                className={`text-sm px-3 py-1 rounded-full mt-2 ${
                status === false ? "text-green-500" : "text-red-500"
                }`}
              >
                {status === false ? "Active" : "Inactive"}
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

          {/* Left section */}
          <div>
            {/* Navigation Tabs */}
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
              
              <div className="py-4">
                {activeTab === 'dossier' && (
                  <div className="">
                    {(loading || medicalRecordLoading) ? (
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
                )}
                
                {activeTab === 'examen' && (
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h2 className="text-xl font-bold mb-4">Examen Médicale</h2>
                    <p>Résultats des examens médicaux récents...</p>
                  </div>
                )}
                
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
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default MedicalForm;