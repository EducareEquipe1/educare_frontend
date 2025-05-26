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
  const [examenMedicalData, setExamenMedicalData] = useState(null); // For the detailed data

  const [patientData, setPatientData] = useState({
    prenom: "",
    nom: "",
    email: "",
    isActif: "",
  });

  const [formData, setFormData] = useState({
    poids: "",
    taille: "",
    IMC: "",
    tension: "",
    vision_d: "",
    vision_g: "",
    larmoiement: "",
    douleurs: "",
    taches_yeux: "",
    audition_d: "",
    audition_g: "",
    sifflements: "",
    angines: "",
    epistaxis: "",
    rhinorrhee: "",
    cephalies: "",
    vertiges: "",
    troubles_sommeil: "",
    peau_normal: "",
    peau_anormale: "",
    douleurs_musculaires: "",
    douleurs_articulaires: "",
    douleurs_neurologiques: "",
    toux: "",
    dyspnee: "",
    douleurs_thoraciques: "",
    palpitations: "",
    oedemes: "",
    cyanose: "",
    pyrosis: "",
    vomissements: "",
    douleurs_abdominales: "",
    dysurie: "",
    hematurie: "",
    cycles_irreguliers: "",
    fonction_respiratoire: "",
    fonction_circulatoire: "",
    fonction_motrice: "",
    sanguins: "",
    urinaires: "",
    radiologiques: "",
    hepatites_pos: "",
    hepatites_neg: "",
    syphilis_pos: "",
    syphilis_neg: "",
    vih_pos: "",
    vih_neg: "",
  });

  //fetch image
  const [imageSrc, setImageSrc] = useState('/default.png'); // default image at start

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

  const [id_examen, setExamenId] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!email || !id_consultation) return;

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Access denied. Please log in.");
        return;
      }

      try {
        setLoading(true);

        // 1. Fetch patient data
        const response = await fetch(
          `https://educare-backend-l6ue.onrender.com/medecins/get-user-info/${email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch patient data");

        const data = await response.json();
        setPatientData({
          prenom: data.prenom,
          nom: data.nom,
          email: data.email,
          isActif: data.isActif,
        });

        // 2. Check if examen medical exists
        const examenCheckRes = await fetch(
          `https://educare-backend-l6ue.onrender.com/medecins/consultations/${id_consultation}/has-examen-medical`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const examenCheck = await examenCheckRes.json();
        if (examenCheck.exists) {
          setExamenExists(true);

          // 3. If examen exists, fetch full examen medical data
          const examenDataRes = await fetch(
            `https://educare-backend-l6ue.onrender.com/medecins/consultations/${id_consultation}/examen-medical`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!examenDataRes.ok)
            throw new Error("Failed to fetch examen medical data");

          const examenData = await examenDataRes.json();
          setExamenMedicalData(examenData); // 🔁 Replace with your own state
        } else {
          setExamenExists(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [email, id_consultation]);

  const handleSave = async () => {
    if (!id_consultation) {
      alert("Consultation ID manquant.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Parse floats (or null)
      const poids = parseFloat(formData.poids) || null;
      const taille = parseFloat(formData.taille) || null;
      const IMC = parseFloat(formData.IMC) || null;
      const tension = parseFloat(formData.tension) || null;
      const vision_d = parseFloat(formData.vision_d) || null;
      const vision_g = parseFloat(formData.vision_g) || null;

      // Helper to convert "true"/"false" or string booleans to 0 or 1
      const toTinyInt = (val) =>
        val === "true" || val === true || val === 1 || val === "1" ? 1 : 0;

      const dataToSend = {
        poids,
        taille,
        IMC,
        tension,
        vision_d,
        vision_g,
        larmoiement: toTinyInt(formData.larmoiement),
        douleurs: toTinyInt(formData.douleurs),
        taches_yeux: toTinyInt(formData.taches_yeux),
        audition_d: toTinyInt(formData.audition_d),
        audition_g: toTinyInt(formData.audition_g),
        sifflements: toTinyInt(formData.sifflements),
        angines: toTinyInt(formData.angines),
        epistaxis: toTinyInt(formData.epistaxis),
        rhinorrhee: toTinyInt(formData.rhinorrhee),
        cephalies: toTinyInt(formData.cephalies),
        vertiges: toTinyInt(formData.vertiges),
        troubles_sommeil: toTinyInt(formData.troubles_sommeil),
        peau_normal: toTinyInt(formData.peau_normal),
        peau_anormale: toTinyInt(formData.peau_anormale),
        douleurs_musculaires: toTinyInt(formData.douleurs_musculaires),
        douleurs_articulaires: toTinyInt(formData.douleurs_articulaires),
        douleurs_neurologiques: toTinyInt(formData.douleurs_neurologiques),
        toux: toTinyInt(formData.toux),
        dyspnee: toTinyInt(formData.dyspnee),
        douleurs_thoraciques: toTinyInt(formData.douleurs_thoraciques),
        palpitations: toTinyInt(formData.palpitations),
        oedemes: toTinyInt(formData.oedemes),
        cyanose: toTinyInt(formData.cyanose),
        pyrosis: toTinyInt(formData.pyrosis),
        vomissements: toTinyInt(formData.vomissements),
        douleurs_abdominales: toTinyInt(formData.douleurs_abdominales),
        dysurie: toTinyInt(formData.dysurie),
        hematurie: toTinyInt(formData.hematurie),
        cycles_irreguliers: toTinyInt(formData.cycles_irreguliers),
        fonction_respiratoire: formData.fonction_respiratoire || "",
        fonction_circulatoire: formData.fonction_circulatoire || "",
        fonction_motrice: formData.fonction_motrice || "",
        sanguins: formData.sanguins || "",
        urinaires: formData.urinaires || "",
        radiologiques: formData.radiologiques || "",
        hepatites_pos: toTinyInt(formData.hepatites_pos),
        hepatites_neg: toTinyInt(formData.hepatites_neg),
        syphilis_pos: toTinyInt(formData.syphilis_pos),
        syphilis_neg: toTinyInt(formData.syphilis_neg),
        vih_pos: toTinyInt(formData.vih_pos),
        vih_neg: toTinyInt(formData.vih_neg),
      };

      const response = await axios.post(
        `https://educare-backend-l6ue.onrender.com/medecins/examen-medical-create/${id_consultation}`,
        dataToSend,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setExamenId(response.data.id);
      alert("Examen médical enregistré avec succès !");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
      alert("Erreur lors de la sauvegarde");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? (checked ? "true" : "false") : value,
    }));
  };

  return (
    <div className="relative flex bg-[#EFEFEF] min-h-screen">
      <div className="flex flex-col md:flex-row w-full overflow-hidden">
        <div className="w-full md:w-24 bg-white shadow-md fixed top-0 left-0 bottom-0 z-10">
          <SideBar />
        </div>

        <div className="flex flex-col w-full ml-[120px]">
          <div className="h-16 flex items-center px-8 shadow bg-gradient-to-r from-[#A9C2C3] to-[#BED1D1] z-10 ml-[40px]">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#679294] text-xl md:text-2xl font-bold">
              Patients
            </h1>
          </div>

          <div className="flex flex-col md:flex-row p-4 ml-[100px] mt-[20px]">
            <div className="w-full md:w-[239px] h-fit bg-white shadow-lg rounded-xl p-6 space-y-6">
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
              <h1 className="text-black text-2xl font-bold mb-6">
                Examen Physique
              </h1>
              <form className="flex flex-col space-y-6">
                <Mesures formData={formData} handleChange={handleChange} />
                <ExamenAppareil
                  formData={formData}
                  handleChange={handleChange}
                />
                <ExplorationFonctionnels
                  formData={formData}
                  handleChange={handleChange}
                />
                <ExamenComplementaire
                  formData={formData}
                  handleChange={handleChange}
                />

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
