import React, { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import SideBar from './SideBar';
export default function AddFile() {

  const [activeTab, setActiveTab] = useState('dossier');
  const status = "Active";
  
  const location = useLocation(); // Get the current location object
  const queryParams = new URLSearchParams(location.search); // Get query parameters
  const email = queryParams.get("email"); // Extract the 'email' parameter

  const [patientData, setPatientData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  



  const tabs = [
    { id: 'dossier', label: 'Dossier Médical' },
    { id: 'examen', label: 'Examen Médical' },
    { id: 'rendezvous', label: 'Rendez-vous' },
    { id: 'ordonnances', label: 'Ordonnances' },
  ];


    //fetch the email,firstname,last name
    useEffect(() => {
      if (email) {
        const fetchPatientData = async () => {
          try {
            const response = await fetch(`http://localhost:5000/api/patient/${email}`);
            if (!response.ok) {
              throw new Error('Patient not found or error occurred');
            }
            const data = await response.json();
            console.log(data); // Check if data is returned properly
            setPatientData(data);
          } catch (err) {
            console.error('Error:', err.message);
          }
        };
  
        fetchPatientData();
      } else {
        console.error('No email parameter found');
      }
    }, [email]); // Fetch data when email changes


  return (
    <div className="fixed bg-[#EFEFEF] w-full h-full">
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
                className="w-[133px] h-[194px] object-cover border-4 border-gray-300"
              />
              <h2 className="mt-4 text-black text-lg font-semibold">{patientData.first_name}{patientData.last_name}</h2>
              <span
                className={`text-sm px-3 py-1 rounded-full mt-2 ${
                  status === 'Active' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {status}
              </span>
            </div>
          </div>
          {/* Tabs + Content */}
          <div className="flex flex-col w-full px-4 md:px-12 mt-4">
            {/* Navigation Tabs */}
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

            {/* Box with shadow under tabs */}
            <div className=" p-6 ">
              {activeTab === 'dossier' && (
               <div className='grid grid-cols-1 md:grid-cols-2 gap-120 bg-white shadow-md rounded-md'>
                <h3 className='text-gray-600 mr-[10px]'>Aucun dossier medicale disponible</h3>
                 <button className="rounded text-white bg-[#679294] w-[109px] h-[34px] mr-[10px] mt-[10px]">ajouter</button>
               </div>
              )}

              {activeTab === 'examen' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Examen Médical</h2>
                  <p>Résultats des examens médicaux récents...</p>
                </div>
              )}

              {activeTab === 'rendezvous' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Rendez-vous</h2>
                  <p>Liste des prochains rendez-vous médicaux...</p>
                </div>
              )}

              {activeTab === 'ordonnances' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Ordonnances</h2>
                  <p>Liste des ordonnances actives...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
