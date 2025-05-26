import React, { useEffect, useState } from "react";
import { useLocation, useParams } from 'react-router-dom';

import AntécédentsMedicaux from './AntécédentsMedicaux';
import AntécédentsPersonels from './AntécédentsPersonels';
import DonnéesBiométrique from './DonnéesBiométrique';
import DetailsPersonnels from './DetailsPersonnels';

const MedicalForm = () => {

  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [recordExists, setRecordExists] = useState(false);
  const [imageSrc, setImageSrc] = useState('/default.png');
  const { email } = useParams();

  const [patientData, setPatientData] = useState({
    prenom: '',
    nom: '',
    email: '',
    isActif: false,
  });

  const [formData, setFormData] = useState({
    email: "",
    numSecuritéSociale: "",
    groupeSanguin: "",
    nom: "",
    prenom: "",
    date_naissance: "",
    situation_famille: "",
    statut: "",
    adresse: "",
    num_tel: "",

    poids: "",
    taille: "",
    tabac_fume: "false",
    tabac_fume_nombre: "",
    tabac_chique: "false",
    tabac_chique_nombre: "",
    tabac_pris: "false",
    tabac_pris_nombre: "",
    age_pris: "",
    ancien_fume: "",
    periode_exposition: "",
    alcool: "",
    medicaments: "",
    notes:"",
    affectionsCongenitales: "",
    maladiesGenerales: "",
    interventionsChirurgicales: "",
    reactionsAllergiques: "",
  });

  //fetch image
  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const imgUrl = `https://educare-backend-l6ue.onrender.com/patients/get-patient-photo/${email}`;
        const response = await fetch(imgUrl);

        if (response.ok) {
          const data = await response.json();

          if (data.success && data.image) {
            setImageSrc(data.image);
            console.log('Image URL loaded:', data.image);
          } else {
            console.warn('No image found in response, using fallback');
            setImageSrc('/default.png');
          }
        } else {
          console.warn('Failed to fetch image URL, using fallback');
          setImageSrc('/default.png');
        }
      } catch (error) {
        console.error('Error fetching image URL:', error);
        setImageSrc('/default.png');
      }
    };

    fetchImageUrl();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token || !email) return;

      try {
        // Étape 1 : Obtenir les informations de base utilisateur
        const userRes = await fetch(`https://educare-backend-l6ue.onrender.com/medecins/get-user-info/${email}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const userInfo = await userRes.json();

        setPatientData({
          nom: userInfo.nom,
          prenom: userInfo.prenom,
          email: userInfo.email,
          isActif: userInfo.isActif
        });
        console.log(patientData);
        setFormData(prev => ({
          ...prev,
          nom: userInfo.nom,
          prenom: userInfo.prenom,
          email: userInfo.email,
          statut: userInfo.statut,
          num_tel: userInfo.num_tel,
          date_naissance: userInfo.date_naissance,
        }));

        // Étape 2 : Tenter de récupérer le dossier médical existant
        const recordRes = await fetch(`https://educare-backend-l6ue.onrender.com/medecins/get-dossier-medical/${email}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (recordRes.ok) {
          const record = await recordRes.json();
          setFormData(prev => ({ ...prev, ...record }));
          setRecordExists(true);
        }
      } catch (err) {
        console.error("Erreur lors du chargement :", err);
      }
    };

    fetchData();
  }, [email]);

  const handleChange = (e) => {
    if (!isEditing) return;
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleEditMode = async () => {
    if (isEditing) {
      await handleSubmit();
    }
    setIsEditing(!isEditing);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

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
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Échec de la sauvegarde");
      const data = await response.json();
      alert("Dossier médical sauvegardé avec succès.");
      setRecordExists(true);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la sauvegarde");
    }
  };

  const createEmptyRecord = async () => {
    const token = localStorage.getItem("token");
    if (!token || !email) return;

    try {
      const res = await fetch(`https://educare-backend-l6ue.onrender.com/medecins/dossier-medical-create/${email}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Erreur de création de dossier.");
      const data = await res.json();
      alert("Dossier créé avec succès !");
      setFormData(prev => ({ ...prev, ...data }));
      setRecordExists(true);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création du dossier.");
    }
  };

  return (
    <div className="relative  flex bg-[#EFEFEF]">
      <div className="flex flex-row ">
        <div className="w-[239px] h-fit bg-white shadow-lg rounded-xl p-6 space-y-6 ml-[200px]  mt-[10px]">
          <div className="flex flex-col items-center">
            <img
              src={imageSrc}
              alt="Patient"
              onError={(e) => {
                console.error('Image load error, switching to default-profile.png');
                e.target.onerror = null;
                e.target.src = '/default.png';
              }}
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
            <form className="flex flex-col w-full  space-y-6 px-6 mt-[10px]">
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
              <div className="flex gap-4">
                <button type="button" onClick={toggleEditMode} className="bg-blue-600 text-white px-4 py-2 rounded">
                  {isEditing ? 'Sauvegarder' : 'Modifier'}
                </button>
                {!recordExists && (
                  <button type="button" onClick={createEmptyRecord} className="bg-green-600 text-white px-4 py-2 rounded">
                    Ajouter un dossier
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalForm;
