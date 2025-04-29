import React, { useEffect, useState } from "react";
import axios from "axios";
import Mesures from "./Mesures";
import ExamenAppareil from "./ExamenAppareil";
import ExplorationFonctionnels from "./ExplorationFonctionnels";
import ExamenComplementaire from "./ExamenComplementaire";
import SideBar from './SideBar';

const ExamenPhysique = () => {
  const email = localStorage.getItem('selectedEmail');
  const [loading, setLoading] = useState(false);
  const [patientData, setPatientData] = useState({
    prenom: '',
    nom: '',
    email: '',
    isActif: "",
  });

  const [formData, setFormData] = useState({
    poids: "",
    taille: "",
    IMC: "",
    tesion: "",
    vision_d: "",
    vision_g: "",
    larmoiement: "",
    douleur: "",
    taches_yeux: "",
    audition_d: "",
    audition_g: "",
    sifflements: "",
    angines: "",
    epistaxis: "",
    rhinorrhee: "",
    cephalees: "",
    vertiges: "",
    troubles_sommeil: "",
    peau_normale: "",
    peau_anormale: "",
    douleurs_musculaire: "",
    doleur_articulaire: "",
    palpitation: "",
    oedemes: "",
    cyanose: "",
    pyrosis: "",
    vomissements: "",
    doleur_abdominales: "",
    dysurie: "",
    hematurie: "",
    cycles_irrigulier: "",
    fonction_respiratoire: "",
    fonction_circulatoire: "",
    fonction_motrice: "",
    sanguins: "",
    urinaires: "",
    radiologiques: "",
    hepatite_pos: "",
    hepatite_neg: "",
    syphilis_pos: "",
    syphilis_neg: "",
    vih_po: "",
    vih_neg: "",
  });

  const [id_examen, setExamenId] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!email) return;

      const token = localStorage.getItem('token');
      if (!token) {
        alert("Access denied. Please log in.");
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`https://educare-backend-l6ue.onrender.com/medecins/get-user-info/${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch patient data');

        const data = await response.json();
        setPatientData({
          prenom: data.prenom,
          nom: data.nom,
          email: data.email,
          isActif: data.isActif,
        });
      } catch (error) {
        console.error('Error fetching patient data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [email]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const response = await axios.post(
        `https://educare-backend-l6ue.onrender.com/examens-physiques`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setExamenId(response.data.id);
      alert("Examen physique enregistré avec succès!");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
      alert("Erreur lors de la sauvegarde");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? (checked ? "true" : "false") : value
    }));
  };

  return (
    <div className="relative flex bg-[#EFEFEF] min-h-screen">
      <div className="flex flex-col md:flex-row w-full overflow-hidden">
        <div className="w-full md:w-24 bg-white shadow-md fixed top-0 left-0 bottom-0 z-10">
          <SideBar />
        </div>

        <div className="flex flex-col w-full md:ml-24">
          <div className="h-16 flex items-center px-8 shadow bg-gradient-to-r from-[#A9C2C3] to-[#BED1D1] z-10 ml-[40px]">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#679294] text-xl md:text-2xl font-bold">
              Patients
            </h1>
          </div>

          <div className="flex flex-col md:flex-row p-4 ml-[100px] mt-[20px]">
            <div className="w-full md:w-[239px] h-fit bg-white shadow-lg rounded-xl p-6 space-y-6">
              <div className="flex flex-col items-center">
                <img
                  src="./logo.png"
                  alt="Patient"
                  className="text-black w-[133px] h-[194px] object-cover border-4 border-gray-300"
                />
                <h2 className="mt-4 text-black text-lg font-semibold">
                  {patientData.nom} {patientData.prenom}
                </h2>
                <h2 className="mt-4 text-gray-600 text-lg font-semibold">
                  {patientData.email}
                </h2>
                <span
                  className={`text-sm px-3 py-1 rounded-full mt-2 ${
                    patientData.isActif ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {patientData.isActif ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            
            <div className="flex-1 bg-white rounded-xl shadow-lg p-6 ml-6">
              <h1 className="text-black text-2xl font-bold mb-6">Examen Physique</h1>
              <form className="flex flex-col space-y-6">
                <Mesures formData={formData} handleChange={handleChange} />
                <ExamenAppareil formData={formData} handleChange={handleChange} />
                <ExplorationFonctionnels formData={formData} handleChange={handleChange} />
                <ExamenComplementaire formData={formData} handleChange={handleChange} />
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={loading}
                    className="rounded text-white bg-[#679294] px-4 py-2 hover:bg-[#577b7d] transition-colors disabled:opacity-50"
                  >
                    {loading ? "Enregistrement..." : "Sauvegarder"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamenPhysique;