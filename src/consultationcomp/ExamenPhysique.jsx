import React, { useEffect, useState } from "react";
import axios from "axios"; // you forgot this too!
import Mesures from "./Mesures";
import ExamenAppareil from "./ExamenAppareil";
import ExplorationFonctionnels from "./ExplorationFonctionnels";
import ExamenComplementaire from "./ExamenComplementaire";
import PatientCard from "./PatientCard"

const ExamenPhysique = ({ consultationId }) => {
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
    syphilis_pos:"",
    syphilis_neg:"",
    vih_po: "",
    vih_neg: "",
  });

  const [examenId, setExamenId] = useState(null);

  useEffect(() => {
    const fetchExamen = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`https://ton-backend.com/examens-physiques/consultation/${consultationId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data) {
          setFormData(response.data);
        }
      } catch (error) {
        console.log("Aucun examen physique trouvé pour cette consultation (normal si c'est une première fois)");
      }
    };

    fetchExamen();
  }, [consultationId]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (examenId) {
        // L'examen existe -> Update
        await axios.put(`https://ton-backend.com/examens-physiques/${examenId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Examen physique mis à jour !");
      } else {
        // Pas d'examen -> Create
        const response = await axios.post(`https://ton-backend.com/examens-physiques`, {
          ...formData,
          consultationId: consultationId
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExamenId(response.data.id);
        alert("Examen physique créé !");
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
      alert("Erreur lors de la sauvegarde");
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
    <div className="relative flex bg-[#EFEFEF]">
      <div className="flex flex-row">
        
          <PatientCard/>
        
    <div className="bg-white flex flex-col w-full px-4 md:px-12 mt-4">
      <h1 className="text-black">Examen Physique</h1>
      <form className="flex flex-col w-full space-y-6 px-6 mt-[10px]">
        <Mesures formData={formData} handleChange={handleChange} />
        <ExamenAppareil formData={formData} handleChange={handleChange} />
        <ExplorationFonctionnels formData={formData} handleChange={handleChange} />
        <ExamenComplementaire formData={formData} handleChange={handleChange} />
        <button
          type="button"
          onClick={handleSave}
          className="rounded text-white bg-[#679294] w-[109px] h-[34px]"
        >
          Sauvegarder
        </button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default ExamenPhysique;
