import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Paperclip, Link as LinkIcon } from 'lucide-react';
import axios from 'axios';

const ConsultationForm = () => {
  const { id_consultation } = useParams();
console.log(id_consultation)

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
  console.log(id_consultation);


  //fetch teh consultationform data
console.log("id of consultation" , id_consultation);
useEffect(() => {
  const fetchConsultationData = async () => {
    console.log("id consultation", id_consultation);

    if (!id_consultation) return;
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Access denied. Please log in.");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://educare-backend-l6ue.onrender.com/medecins/get-consultation/${id_consultation}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log("Full API response:", response); // Debug the full response
      
      // Access response.data, not response directly
      const apiData = response.data;
      console.log("API data:", apiData); // Debug the actual data
      
      // Format date if needed
      const apiDate = apiData.date 
        ? new Date(apiData.date).toISOString().split('T')[0]
        : '';
      
        setConsultationData(prev => ({
          ...prev,
          date: apiData.date ? new Date(apiData.date).toISOString().split('T')[0] : '',
          type: apiData.type || 'routine',
          motif: apiData.motif || '',
          symptomes: apiData.symptomes || '',
          observations: apiData.observations || '',
          diagnostic: apiData.diagnostic || '',
          id_rendezVous: apiData.id_rendezVous || '',
          patient_id: apiData.patient_id || '',
          piece: apiData.piece ? { name: apiData.piece } : null // Convert string to file-like object
        }));
        
    } catch (error) {
      console.error('Error fetching consultation:', error);
      alert(`Error loading consultation: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  fetchConsultationData();
}, [id_consultation]);

console.log(consultationData);

 //handle sauvgarde
 const handleFormSubmit = async (e) => {
  e.preventDefault();
  
  if (!id_consultation) {
    alert("No consultation ID provided for update");
    return;
  }

  setIsLoading(true);

  try {
    // Create FormData for the update
    const formData = new FormData();
    
    // Append all updatable fields
    formData.append('date', consultationData.date);
    formData.append('type', consultationData.type);
    formData.append('motif', consultationData.motif);
    formData.append('symptomes', consultationData.symptomes);
    formData.append('observations', consultationData.observations);
    formData.append('diagnostic', consultationData.diagnostic);
    
    // Handle file update if a new file was selected
    if (consultationData.piece instanceof File) {
      formData.append('file', consultationData.piece);
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    };

    // Only PUT/PATCH request for updates
    const response = await axios.put(
      `https://educare-backend-l6ue.onrender.com/api/consultations/${id_consultation}`,
      formData,
      config
    );

    alert('Consultation mise à jour avec succès!');
    
    // Optional: redirect after successful update
    // navigate('/consultations');

  } catch (error) {
    console.error('Update error:', error);
    alert(`Erreur lors de la mise à jour: ${error.response?.data?.message || error.message}`);
  } finally {
    setIsLoading(false);
  }
};

 //handle Annuler





 //handle value change
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setConsultationData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };
    
  //handle change of color
  const getConsultationTypeColor = () => {
    switch (consultationData.type) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'routine': return 'bg-green-100 text-green-800 border-green-200';
      case 'followup': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  

  return (
    <div className="relative flex bg-[#EFEFEF]">
      {/* Consultation Form */}
      <div className="flex flex-col w-full px-4 md:px-12 mt-4">
        <form onSubmit={handleFormSubmit} className="flex flex-col w-full space-y-6 px-6 mt-[10px]">
          {/* Motif, Date, Type */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-1">Motif</label>
              <input
                type="text"
                name="motif"
                value={consultationData.motif}
                onChange={handleInputChange}
                placeholder="Motif de la consultation"
                className="w-full text-black rounded-md border border-gray-300 py-2 px-3 bg-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
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

          {/* Symptômes */}
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

          {/* Observations */}
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

          {/* Diagnostic */}
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

         
         {/* <div>
            <label className="block text-sm font-bold text-black mb-1">Examen Médical</label>
            <div className="flex items-center space-x-2">
              
            
                href={`/examenclinique/${patientInfo.email}`}
                className="text-[#679294] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Créer/Voir Rapport d'Examen
            </div>
            <input
              type="text"
              name="id_examen"
              value={id_examen}
              onChange={handleInputChange}
              placeholder="Ou saisir l'ID d'examen"
              className="mt-2 text-black w-full rounded-md border border-gray-300 py-2 px-3"
            />
          </div>

          {/* Ordonnance 
          <div>
            <label className="block text-sm font-bold text-black mb-1">Ordonnance</label>
            <div className="flex items-center space-x-2">
              
                href={`/ordonnance/${patientInfo.email}`}
                className="text-[#679294] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Créer/Voir Ordonnance
             
            </div>
            <input
              type="text"
              name="prescriptionId"
              value={prescriptionId}
              onChange={handleInputChange}
              placeholder="Ou saisir l'ID d'ordonnance"
              className="mt-2 text-black w-full rounded-md border border-gray-300 py-2 px-3"
            />
          </div>*/}

          {/* Pièce jointe */}
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

          {/* Boutons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="rounded text-white bg-[#679294] w-[109px] h-[34px]"
            >
              Sauvegarder
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

