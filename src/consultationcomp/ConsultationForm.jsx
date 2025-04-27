import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Paperclip, Link as LinkIcon, Plus } from 'lucide-react';
import axios from 'axios';

const ConsultationForm = () => {
  const { id_consultation } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  if (!token) {
    alert("Access denied. Please log in.");
    return;
  }

  const [consultationData, setConsultationData] = useState({
    date: '',
    type: 'routine',
    motif: '',
    symptomes: '',
    observations: '',
    diagnostic: '',
    id_rendezVous:'',
    piece:'',
    patient_id:""
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch consultation data
  useEffect(() => {
    const fetchConsultationData = async () => {
      if (!id_consultation) return;
      
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://educare-backend-l6ue.onrender.com/medecins/get-consultation/${id_consultation}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        const apiData = response.data[0] ;
 // <<<<< Notice .data here
  
        console.log("Fetched consultation data:", apiData); // now this will show { motif: "...", symptomes: "...", ... }
  
        setConsultationData(prev => ({
          ...prev,
          date: apiData.date || '',
          motif: apiData.motif || '',
          symptomes: apiData.symptomes || '',
          observations: apiData.observations || '',
          diagnostic: apiData.diagnostic || '',
          type: apiData.type || 'routine',
          id_rendezVous: apiData.id_rendezVous || '',
          patient_id: apiData.patient_id || '',
          piece: apiData.piece ? { name: apiData.piece } : null,
        }));
        
      } catch (error) {
        console.error('Error fetching consultation:', error);
        alert(`Error loading consultation: ${error.response?.data?.message || error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchConsultationData();
  }, [id_consultation, token]);
  

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!id_consultation) {
      alert("No consultation ID provided for update");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('date', consultationData.date);
      formData.append('type', consultationData.type);
      formData.append('motif', consultationData.motif);
      formData.append('symptomes', consultationData.symptomes);
      formData.append('observations', consultationData.observations);
      formData.append('diagnostic', consultationData.diagnostic);
      
      if (consultationData.piece instanceof File) {
        formData.append('file', consultationData.piece);
      }

      await axios.put(
        `https://educare-backend-l6ue.onrender.com/medecins/modify-consultation/${id_consultation}`,
        formData,
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
      );

      alert('Consultation mise à jour avec succès!');
    } catch (error) {
      console.error('Update error:', error);
      alert(`Erreur lors de la mise à jour: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setConsultationData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const getConsultationTypeColor = () => {
    switch (consultationData.type) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'routine': return 'bg-green-100 text-green-800 border-green-200';
      case 'followup': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Navigation to physical exam
  const handleAddPhysicalExam = async () => {
    try {
      setIsLoading(true);
      
      // Create new empty physical exam with all required fields
      const response = await axios.post(
        `https://educare-backend-l6ue.onrender.com/medecins/examenphysique-create/${id_consultation}`,
        {
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
          // Include any other required fields with empty values
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (!response.data?.id_examen) {
        throw new Error("No exam ID returned from server");
      }
  
      // Store the exam ID in localStorage if needed
      localStorage.setItem('currentExamId', response.data.id_examen);
      
      // Navigate to the newly created physical exam
      navigate(`/examenphysique/${response.data.id_examen}`);
      
    } catch (error) {
      console.error('Error creating physical exam:', error);
      alert(`Failed to create physical exam: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Navigation to prescription
  const handleAddPrescription = () => {
    navigate(`/consultation/${id_consultation}/ordonnance`);
  };

  return (
    <div className="relative flex bg-[#EFEFEF]">
      <div className="flex flex-col w-full px-4 md:px-12 mt-4">
        <form onSubmit={handleFormSubmit} className="flex flex-col w-full space-y-6 px-6 mt-[10px]">
          {/* Basic Info Section */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-1">Motif</label>
              <input
                type="text"
                name="motif"
                value={consultationData.motif}
                onChange={handleInputChange}
                className="w-full text-black rounded-md border border-gray-300 py-2 px-3 bg-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black-400" />
                  <input
                    type="date"
                    name="date"
                    value={consultationData.date}
                    onChange={handleInputChange}
                    className="pl-10 text-black w-full rounded-md border border-gray-300 py-2 px-3 bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Type</label>
                <select
                  name="type"
                  value={consultationData.type}
                  onChange={handleInputChange}
                  className={`w-full rounded-md border py-2 px-3 ${getConsultationTypeColor()}`}
                  required
                >
                  <option value="routine">Routinière</option>
                  <option value="urgent">Urgente</option>
                  <option value="followup">Suivi</option>
                </select>
              </div>
            </div>
          </div>

          {/* Symptoms Section */}
          <div>
            <label className="block text-sm font-bold text-black mb-1">Symptômes Rapportés</label>
            <textarea
              name="symptomes"
              value={consultationData.symptomes}
              onChange={handleInputChange}
              rows={3}
              className="w-full text-black rounded-md border border-gray-300 py-2 px-3"
              required
            />
          </div>

      

          {/* Observations Section */}
          <div>
            <label className="block text-sm font-bold text-black mb-1">Observations du Médecin</label>
            <textarea
              name="observations"
              value={consultationData.observations}
              onChange={handleInputChange}
              rows={4}
              className="w-full text-black rounded-md border border-gray-300 py-2 px-3"
              required
            />
          </div>

          {/* Diagnosis Section */}
          <div>
            <label className="block text-sm font-bold text-black mb-1">Diagnostic</label>
            <textarea
              name="diagnostic"
              value={consultationData.diagnostic}
              onChange={handleInputChange}
              rows={3}
              className="w-full text-black rounded-md border border-gray-300 py-2 px-3"
              required
            />
          </div>

          {/*Physical Examen*/}
           <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold text-black">Examen Physique</h3>
              <button
                type="button"
                onClick={handleAddPhysicalExam}
                className="flex items-center text-sm text-[#679294] hover:text-[#51797a]"
              >
                <Plus className="h-4 w-4 mr-1" />
                Ajouter
              </button>
            </div>
            {/* Placeholder for physical exam content */}
            <div className="text-gray-500 text-sm">
              Aucun examen physique enregistré
            </div>
          </div>

          {/* Prescription Section */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold text-black">Ordonnance</h3>
              <button
                type="button"
                onClick={handleAddPrescription}
                className="flex items-center text-sm text-[#679294] hover:text-[#51797a]"
              >
                <Plus className="h-4 w-4 mr-1" />
                Ajouter
              </button>
            </div>
            {/* Placeholder for prescription content */}
            <div className="text-gray-500 text-sm">
              Aucune ordonnance enregistrée
            </div>
          </div>

          {/* File Attachment */}
          <div>
            <label className="block text-sm font-bold text-black mb-1">Pièce Jointe</label>
            <label className="flex items-center space-x-2 cursor-pointer p-3 border border-gray-300 rounded-md hover:bg-gray-50">
              <Paperclip className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                {consultationData.piece ? consultationData.piece.name : 'Choisir un fichier'}
              </span>
              <input
                type="file"
                name="piece"
                onChange={handleInputChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isLoading}
              className="rounded text-white bg-[#679294] w-[109px] h-[34px] disabled:opacity-50"
            >
              {isLoading ? 'En cours...' : 'Sauvegarder'}
            </button>

            <button
              type="button"
              className="rounded text-[#679294] bg-white w-[109px] h-[34px]"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsultationForm;
