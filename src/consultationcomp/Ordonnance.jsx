import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

const Ordonnance = () => {
  const [patientData, setPatientData] = useState({
    prenom: '',
    nom: '',
    email: '',
    isActif: "",
  });

  const [isSaved, setIsSaved] = useState(true);
  const element = document.querySelector("form");


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State for form fields
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    date: '',
    age: '',
    notes: ''
  });

  const email = localStorage.getItem('selectedEmail');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!email) {
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Access denied. Please log in.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
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
        
        // Pre-fill form with patient data
        setFormData(prev => ({
          ...prev,
          nom: userInfo.nom,
          prenom: userInfo.prenom
        }));
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [email]);



  const handleCancel = () => {
  setFormData({
    nom: '',
    prenom: '',
    adresse: '',
    date: '',
    age: '',
    notes: ''
  });
  setIsSaved(false);
};

const handleSave = () => {
  // You can add your logic to actually save data here (API call, etc.)
  setIsSaved(true);
};

const handlePrint = () => {
  // Store original HTML and body class
  const originalContent = document.body.innerHTML;
  const originalBodyClass = document.body.className;

  // Extract form HTML
  const printContent = document.getElementById('form').outerHTML;

  // Replace body content with only the form
  document.body.innerHTML = printContent;
  document.body.className = ''; // Reset body classes

  // Add print-specific CSS
  const style = document.createElement('style');
  style.innerHTML = `
    @page { margin: 0; }
    body { margin: 0; }
    button { display: none !important; }
  `;
  document.head.appendChild(style);

  // Trigger print
  window.print();

  // Restore original content
  document.body.innerHTML = originalContent;
  document.body.className = originalBodyClass;

  // Remove the added style
  document.head.removeChild(style);
};


  return (
    <div className="relative flex bg-[#EFEFEF] min-h-screen">
      <div className="flex flex-col md:flex-row w-full overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-24 bg-white shadow-md fixed top-0 left-0 bottom-0 z-10">
          <SideBar />
        </div>

        {/* Main content */}
        <div className="flex flex-col w-full ml-[120px]">
          {/* Header */}
          <div className="h-16 flex items-center px-8 shadow bg-gradient-to-r from-[#A9C2C3] to-[#BED1D1] z-10 ml-[40px]">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#679294] text-xl md:text-2xl font-bold">
              Patients
            </h1>
          </div>

          <div className="flex flex-col md:flex-row p-4 ml-[100px] mt-[20px]">
            <div className='flex flex-row'>
              <div className="w-[239px] h-[346px] md:w-60 bg-white shadow-lg rounded-xl p-6 space-y-6">
                <div className="flex flex-col items-center">
                  <img
                    src="./logo.png"
                    alt="Patient"
                    className="text-black w-[133px] h-[194px] object-cover border-4 border-gray-300"
                  />
                  <h2 className="mt-4 text-black text-lg font-semibold">
                    {patientData.nom} {patientData.prenom}
                  </h2>
                  <h3 className="mt-2 text-gray-600 text-sm md:text-base">
                    {patientData.email}
                  </h3>
                  <span className={`text-sm px-3 py-1 rounded-full mt-2 ${
                    patientData.isActif ? "text-green-500" : "text-red-500"
                  }`}>
                    {patientData.isActif ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
              
              <form id='form' className='bg-white ml-[20px] w-[725px] border rounded-[10px] p-[10px] space-y-3'>
                <h1 className='text-black font-black'>Cabinet Médical ESI-SBA</h1>
                <h2 className='text-gray-600'>Consultation,certificat médicaux,soins,Urgences</h2>
                <h2 className='text-gray-600'>Ecole Supérieure d'Informatique</h2>
                
                <div className="flex items-center text-gray-600">
                  <FaPhone className="mr-2" />
                  <span>00555123456/05557089</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <FaEnvelope className="mr-2" />
                  <span>cabinet.medical@esi-sba.dz</span>
                </div>

                <img
                  src="./logoecole.png" 
                  alt='logo ecole'
                  className='w-[150px] h-[150px] ml-[500px] absolute top-[155px]'
                />
                
                <hr className="border-t-2 border-gray-300 w-[70%] mx-auto my-[50px]"/>

                <h1 className='text-black underline text-center font-black'>Ordonnance</h1>
                
                <div className="grid grid-cols-2 gap-8">
                  {/* First Column */}
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <label className="w-24 text-black font-bold">Nom:</label>
                      <input 
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        className="flex-1  bg-transparent text-black p-1"
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <label className="w-24 text-black font-bold">Prénom:</label>
                      <input 
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        className="flex-1  bg-transparent text-black p-1" 
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <label className="w-24 text-black font-bold">Adresse:</label>
                      <input 
                        type="text"
                        name="adresse"
                        value={formData.adresse}
                        onChange={handleChange}
                        className="flex-1  bg-transparent text-black p-1" 
                      />
                    </div>
                  </div>

                  {/* Second Column */}
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <label className="w-24 text-black font-bold">Date:</label>
                      <input 
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="flex-1 bg-transparent text-black p-1"
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <label className="w-24 text-black font-bold">Age:</label>
                      <input 
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="flex-1  bg-transparent text-black p-1" 
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-t-2 border-gray-300 w-[70%] mx-auto my-[50px]"/>

                <div className="mt-6">
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                   className="w-full h-32 p-3 text-black border border-transparent rounded-lg focus:border-[#679294] focus:outline-none resize-none"
                    placeholder="Saisissez vos medicaments ici..."
                  />
                </div>
                <div className="flex justify-end space-x-4 mt-4">
    <button
      onClick={handleCancel}
      className="px-6 py-2 border border-[#679294] text-[#679294] bg-white rounded-lg font-semibold "
    >
      Annuler
    </button>

    {!isSaved ? (
      <button
        onClick={handleSave}
        className="px-6 py-2 bg-[#679294] text-white rounded-lg font-semibold "
      >
        Sauvegarder
      </button>
    ) : (
      <button
        onClick={handlePrint}
        className="px-6 py-2 bg-[#679294] text-white rounded-lg font-semibold"
      >
        Imprimer
      </button>
    )}
  </div>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ordonnance;