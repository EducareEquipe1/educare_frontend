import React, { useEffect, useState } from "react";
import axios from "axios";
import Mesures from "./Mesures";
import ExamenAppareil from "./ExamenAppareil";
import ExplorationFonctionnels from "./ExplorationFonctionnels";
import ExamenComplementaire from "./ExamenComplementaire";
import SideBar from "./SideBar";
import { useParams } from "react-router-dom";

const ExamenPhysique = () => {
  const email = localStorage.getItem("selectedEmail");
  const { id_consultation } = useParams();

  const [loading, setLoading] = useState(false);
  const [examenExists, setExamenExists] = useState(false);
  const [examenMedicalData, setExamenMedicalData] = useState({});
  const [id_examen, setExamenId] = useState(null);

  const [patientData, setPatientData] = useState({
    prenom: "",
    nom: "",
    email: "",
    isActif: "",
  });

  const [formData, setFormData] = useState({
    // Mesures
    poids: "",
    taille: "",
    IMC: "",
    tension: "",

    // Examen Appareil
    vision_d: "",
    vision_g: "",
    larmoiement: false,
    douleurs: false,
    taches_yeux: false,
    audition_d: false,
    audition_g: false,
    sifflements: false,
    angines: false,
    epistaxis: false,
    rhinorrhee: false,
    cephalies: false,
    vertiges: false,
    troubles_sommeil: false,
    peau_normal: false,
    peau_anormale: false,
    douleurs_musculaires: false,
    douleurs_articulaires: false,
    douleurs_neurologiques: false,
    toux: false,
    dyspnee: false,
    douleurs_thoraciques: false,
    palpitations: false,
    oedemes: false,
    cyanose: false,
    pyrosis: false,
    vomissements: false,
    douleurs_abdominales: false,
    dysurie: false,
    hematurie: false,
    cycles_irreguliers: false,

    // Exploration Fonctionnels
    fonction_respiratoire: "",
    fonction_circulatoire: "",
    fonction_motrice: "",

    // Examen Complementaire
    sanguins: "",
    urinaires: "",
    radiologiques: "",
    hepatites_pos: false,
    hepatites_neg: false,
    syphilis_pos: false,
    syphilis_neg: false,
    vih_pos: false,
    vih_neg: false,
  });
  const [imageSrc, setImageSrc] = useState("/default.png");

  // Fetch patient photo
  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const response = await fetch(
          `https://educare-backend-l6ue.onrender.com/patients/get-patient-photo/${email}`
        );
        const data = await response.json();
        if (response.ok && data.success && data.image) {
          setImageSrc(data.image);
        }
      } catch (error) {
        setImageSrc("/default.png");
      }
    };

    if (email) {
      fetchImageUrl();
    }
  }, [email]);

  // Fetch patient + examen data
 useEffect(() => {
  const fetchData = async () => {
    if (!email || !id_consultation) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Access denied. Please log in.");
      return;
    }

    try {
      setLoading(true);

      // 1. Fetch patient data
      const patientRes = await fetch(
        `https://educare-backend-l6ue.onrender.com/medecins/get-user-info/${email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const patientData = await patientRes.json();
      setPatientData(patientData);

      // 2. Check if examen exists
      const examRes = await fetch(
        `https://educare-backend-l6ue.onrender.com/medecins/consultations/${id_consultation}/has-examen-medical`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const examData = await examRes.json();
      setExamenExists(examData.exists);

      // 3. If examen exists, fetch the details and populate the form
      if (examData.exists) {
        const examDetailsRes = await fetch(
          `https://educare-backend-l6ue.onrender.com/medecins/consultations/${id_consultation}/examen-medical`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const examDetails = await examDetailsRes.json();
        const data = examDetails.data;
        setExamenMedicalData(data);

        setFormData((prev) => ({
          ...prev,
          poids: data.poids || "",
          taille: data.taille || "",
          IMC: data.IMC || "",
          tension: data.tension || "",
          vision_d: data.vision_d || "",
          vision_g: data.vision_g || "",
          larmoiement: !!data.larmoiement,
          douleurs: !!data.douleurs,
          taches_yeux: !!data.taches_yeux,
          audition_d: !!data.audition_d,
          audition_g: !!data.audition_g,
          sifflements: !!data.sifflements,
          angines: !!data.angines,
          epistaxis: !!data.epistaxis,
          rhinorrhee: !!data.rhinorrhee,
          cephalies: !!data.cephalies,
          vertiges: !!data.vertiges,
          troubles_sommeil: !!data.troubles_sommeil,
          peau_normal: !!data.peau_normal,
          peau_anormale: !!data.peau_anormale,
          douleurs_musculaires: !!data.douleurs_musculaires,
          douleurs_articulaires: !!data.douleurs_articulaires,
          douleurs_neurologiques: !!data.douleurs_neurologiques,
          toux: !!data.toux,
          dyspnee: !!data.dyspnee,
          douleurs_thoraciques: !!data.douleurs_thoraciques,
          palpitations: !!data.palpitations,
          oedemes: !!data.oedemes,
          cyanose: !!data.cyanose,
          pyrosis: !!data.pyrosis,
          vomissements: !!data.vomissements,
          douleurs_abdominales: !!data.douleurs_abdominales,
          dysurie: !!data.dysurie,
          hematurie: !!data.hematurie,
          cycles_irreguliers: !!data.cycles_irreguliers,
          fonction_respiratoire: data.fonction_respiratoire || "",
          fonction_circulatoire: data.fonction_circulatoire || "",
          fonction_motrice: data.fonction_motrice || "",
          sanguins: data.sanguins || "",
          urinaires: data.urinaires || "",
          radiologiques: data.radiologiques || "",
          hepatites_pos: !!data.hepatites_pos,
          hepatites_neg: !!data.hepatites_neg,
          syphilis_pos: !!data.syphilis_pos,
          syphilis_neg: !!data.syphilis_neg,
          vih_pos: !!data.vih_pos,
          vih_neg: !!data.vih_neg,
        }));
      }
    } catch (e) {
      console.error("Erreur lors du chargement des données:", e);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [email, id_consultation]);


  // Handle form submit
  const handleSave = async () => {
    if (!id_consultation) {
      alert("Consultation ID manquant.");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");

    // Prepare data in the format backend expects
    const dataToSend = {
      poids: parseFloat(formData.poids) || null,
      taille: parseFloat(formData.taille) || null,
      IMC: parseFloat(formData.IMC) || null,
      tension: formData.tension || "",
      // Add all other fields
      vision_d: parseFloat(formData.vision_d) || null,
      vision_g: parseFloat(formData.vision_g) || null,
      larmoiement: formData.larmoiement ? 1 : 0,
      douleurs: formData.douleurs ? 1 : 0,
      // Convert all boolean fields to 1/0
      peau_normal: formData.peau_normal ? 1 : 0,
      peau_anormale: formData.peau_anormale ? 1 : 0,
      // Include all other fields...
    };

    try {
      const url = `https://educare-backend-l6ue.onrender.com/medecins/consultations/${id_consultation}/examen-medical`;
      const method = examenExists ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error("Request failed");

      const result = await response.json();
      alert(examenExists ? "Examen mis à jour" : "Examen créé");
      setExamenExists(true);
    } catch (e) {
      console.error("Error:", e);
      alert("Erreur lors de la sauvegarde");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />

      <div className="flex flex-col w-full ml-[120px]">
        {/* Top header */}
        <div className="h-16 flex items-center px-8 shadow bg-gradient-to-r from-[#A9C2C3] to-[#BED1D1] z-10 ml-[40px]">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#679294] text-xl md:text-2xl font-bold">
            Patients
          </h1>
        </div>

        <div className="flex bg-transparent flex-col md:flex-row p-4 ml-[100px] mt-[20px]">
          {/* Sidebar card */}
          <div className="w-full md:w-[239px] h-fit bg-white shadow-lg rounded-xl p-6 space-y-6">
            <div className="flex flex-col items-center">
              <img
                src={imageSrc}
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

          {/* Main content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {loading ? (
              <div className="text-center text-blue-500 text-lg font-semibold">
                Chargement...
              </div>
            ) : (
              <div className="max-w-5xl mx-auto bg-transparent rounded-xl p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                  Examen Médical de {patientData.prenom} {patientData.nom}
                </h1>

                {/* Mesures */}
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-[#2E3D40F2] mb-4">
                    Mesures
                  </h2>
                  <Mesures formData={formData} setFormData={setFormData} />
                </section>

                {/* Examen Appareil */}
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-[#2E3D40F2] mb-4">
                    Examen Appareil
                  </h2>
                  <ExamenAppareil
                    formData={formData}
                    setFormData={setFormData}
                  />
                </section>

                {/* Explorations Fonctionnelles */}
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-[#2E3D40F2] mb-4">
                    Explorations Fonctionnelles
                  </h2>
                  <ExplorationFonctionnels
                    formData={formData}
                    setFormData={setFormData}
                  />
                </section>

                {/* Examens Complémentaires */}
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-[#2E3D40F2] mb-4">
                    Examens Complémentaires
                  </h2>
                  <ExamenComplementaire
                    formData={formData}
                    setFormData={setFormData}
                  />
                </section>

                {/* Save button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="bg-[#679294] hover:bg-[#679294] text-white font-semibold py-2 px-6 rounded-md transition"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamenPhysique;
