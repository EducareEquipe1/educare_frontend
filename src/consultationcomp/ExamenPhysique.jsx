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

  const [examenMedicalData, setExamenMedicalData] = useState(null);
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


    fetchImageUrl();

  }, [email]);

  // Fetch patient + examen data
 useEffect(() => {
  const fetchData = async () => {
    if (!email || !id_consultation) return;


  useEffect(() => {
    const fetchPatientData = async () => {
      if (!email || !id_consultation) {
        alert("Email ou ID de consultation manquant.");
        return;
      }

      console.log('Consultation ID:', id_consultation);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Access denied. Please log in.");
        return;
      }


    try {
      setLoading(true);


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

        if (!response.ok) throw new Error(`Failed to fetch patient data: ${response.status}`);

        const data = await response.json();
        setPatientData({
          prenom: data.prenom || "",
          nom: data.nom || "",
          email: data.email || "",
          isActif: data.isActif ?? "",
        });

        const examenCheckRes = await fetch(
          `https://educare-backend-l6ue.onrender.com/medecins/consultations/${id_consultation}/has-examen-medical`,

          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );


        if (!examenCheckRes.ok) throw new Error(`Failed to check examen existence: ${examenCheckRes.status}`);

        const examenCheck = await examenCheckRes.json();
        console.log('Examen check response:', examenCheck);
        setExamenExists(examenCheck.exists);

        if (examenCheck.exists) {
          const examenDataRes = await fetch(
            `https://educare-backend-l6ue.onrender.com/medecins/consultations/${id_consultation}/examen-medical`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!examenDataRes.ok) throw new Error(`Failed to fetch examen medical data: ${examenDataRes.status}`);

          const examenData = await examenDataRes.json();
          console.log('Fetched examenMedicalData:', examenData);
          setExamenMedicalData(examenData);

          const dataToPopulate = examenData.data || examenData;
          setFormData({
            poids: dataToPopulate.poids?.toString() || "",
            taille: dataToPopulate.taille?.toString() || "",
            IMC: dataToPopulate.IMC?.toString() || "",
            tension: dataToPopulate.tension?.toString() || "",
            vision_d: dataToPopulate.vision_d?.toString() || "",
            vision_g: dataToPopulate.vision_g?.toString() || "",
            larmoiement: dataToPopulate.larmoiement ? "true" : "false",
            douleurs: dataToPopulate.douleurs ? "true" : "false",
            taches_yeux: dataToPopulate.taches_yeux ? "true" : "false",
            audition_d: dataToPopulate.audition_d?.toString() || "",
            audition_g: dataToPopulate.audition_g?.toString() || "",
            sifflements: dataToPopulate.sifflements ? "true" : "false",
            angines: dataToPopulate.angines ? "true" : "false",
            epistaxis: dataToPopulate.epistaxis ? "true" : "false",
            rhinorrhee: dataToPopulate.rhinorrhee ? "true" : "false",
            cephalies: dataToPopulate.cephalies ? "true" : "false",
            vertiges: dataToPopulate.vertiges ? "true" : "false",
            troubles_sommeil: dataToPopulate.troubles_sommeil ? "true" : "false",
            peau_normal: dataToPopulate.peau_normal ? "true" : "false",
            peau_anormale: dataToPopulate.peau_anormale ? "true" : "false",
            douleurs_musculaires: dataToPopulate.douleurs_musculaires ? "true" : "false",
            douleurs_articulaires: dataToPopulate.douleurs_articulaires ? "true" : "false",
            douleurs_neurologiques: dataToPopulate.douleurs_neurologiques ? "true" : "false",
            toux: dataToPopulate.toux ? "true" : "false",
            dyspnee: dataToPopulate.dyspnee ? "true" : "false",
            douleurs_thoraciques: dataToPopulate.douleurs_thoraciques ? "true" : "false",
            palpitations: dataToPopulate.palpitations ? "true" : "false",
            oedemes: dataToPopulate.oedemes ? "true" : "false",
            cyanose: dataToPopulate.cyanose ? "true" : "false",
            pyrosis: dataToPopulate.pyrosis ? "true" : "false",
            vomissements: dataToPopulate.vomissements ? "true" : "false",
            douleurs_abdominales: dataToPopulate.douleurs_abdominales ? "true" : "false",
            dysurie: dataToPopulate.dysurie ? "true" : "false",
            hematurie: dataToPopulate.hematurie ? "true" : "false",
            cycles_irreguliers: dataToPopulate.cycles_irreguliers ? "true" : "false",
            fonction_respiratoire: dataToPopulate.fonction_respiratoire || "",
            fonction_circulatoire: dataToPopulate.fonction_circulatoire || "",
            fonction_motrice: dataToPopulate.fonction_motrice || "",
            sanguins: dataToPopulate.sanguins || "",
            urinaires: dataToPopulate.urinaires || "",
            radiologiques: dataToPopulate.radiologiques || "",
            hepatites_pos: dataToPopulate.hepatites_pos ? "true" : "false",
            hepatites_neg: dataToPopulate.hepatites_neg ? "true" : "false",
            syphilis_pos: dataToPopulate.syphilis_pos ? "true" : "false",
            syphilis_neg: dataToPopulate.syphilis_neg ? "true" : "false",
            vih_pos: dataToPopulate.vih_pos ? "true" : "false",
            vih_neg: dataToPopulate.vih_neg ? "true" : "false",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert(`Erreur lors du chargement : ${error.message}`);
      } finally {
        setLoading(false);

      }
    } catch (e) {
      console.error("Erreur lors du chargement des données:", e);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [email, id_consultation]);


  const toTinyInt = (val) =>
    val === "true" || val === true || val === 1 || val === "1" ? 1 : 0;

  const handleChange = (e) => {
    if (examenExists) return;
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? (checked ? "true" : "false") : value;
    console.log(`Updating field: ${name}, value: ${newValue}, type: ${type}, event target:`, {
      name: e.target.name,
      value: e.target.value,
      type: e.target.type,
    });
    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };


  const handleSave = async () => {
    if (!id_consultation) {
      alert("Consultation ID manquant.");
      return;
    }


    console.log('Consultation ID for save:', id_consultation);
    console.log('Form Data before saving:', { poids: formData.poids, taille: formData.taille });

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token manquant.");
      }

      const dataToSend = {
        poids: formData.poids !== "" ? formData.poids : null,
        taille: formData.taille !== "" ? formData.taille : null,
        IMC: formData.IMC !== "" ? formData.IMC : null,
        tension: formData.tension !== "" ? formData.tension : null,
        vision_d: formData.vision_d !== "" ? formData.vision_d : null,
        vision_g: formData.vision_g !== "" ? formData.vision_g : null,
        larmoiement: toTinyInt(formData.larmoiement),
        douleurs: toTinyInt(formData.douleurs),
        taches_yeux: toTinyInt(formData.taches_yeux),
        audition_d: formData.audition_d !== "" ? formData.audition_d : null,
        audition_g: formData.audition_g !== "" ? formData.audition_g : null,
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

      console.log('Sending dataToSend:', JSON.stringify(dataToSend, null, 2));

      const response = await axios.post(
        `https://educare-backend-l6ue.onrender.com/medecins/examen-medical-create/${id_consultation}`,
        dataToSend,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log('Save response:', response.data);
      setExamenId(response.data.id);
      setExamenExists(true);
      alert("Examen médical enregistré avec succès !");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error.response?.data || error.message);
      alert(`Erreur lors de la sauvegarde : ${error.response?.data?.message || error.message}`);

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
              <form className="flex flex-col space-y-6" onSubmit={(e) => e.preventDefault()}>
                <Mesures formData={formData} handleChange={handleChange} readOnly={examenExists} />
                <ExamenAppareil formData={formData} handleChange={handleChange} readOnly={examenExists} />
                <ExplorationFonctionnels formData={formData} handleChange={handleChange} readOnly={examenExists} />
                <ExamenComplementaire formData={formData} handleChange={handleChange} readOnly={examenExists} />

                {!examenExists && (
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
                )}
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamenPhysique;