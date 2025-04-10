import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import axios from 'axios';
import OneArchive from './OneArchive'; // Assure-toi que ce composant existe

const Archive = () => {
  const [activeTab, setActiveTab] = useState('utilisateur');
  const [archivedUsers, setArchivedUsers] = useState([]);
  
  const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjEsImVtYWlsIjoibmkubWVyem91a0Blc2ktc2JhLmR6IiwiaWF0IjoxNzQ0MDM2ODMyLCJleHAiOjE3NDY2Mjg4MzJ9.GbF_0vPxlAfPuh7V6RcDiZ3o5iSKxRcMcmwnS5lTyU4"; // Static Admin Token
  
  useEffect(() => {
    if (activeTab === 'utilisateur') {
      axios.get('https://educare-backend-l6ue.onrender.com/Admin/get-archived-users/', {
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      })
      .then(res => {
        // Vérifie si la réponse est un tableau
        if (Array.isArray(res.data)) {
          setArchivedUsers(res.data);
        } else if (Array.isArray(res.data.utilisateurs)) {
          setArchivedUsers(res.data.utilisateurs);
        } else {
          console.error("Données inattendues", res.data);
          setArchivedUsers([]);
        }
      })
      .catch(err => {
        console.error('Erreur lors du fetch :', err);
        setArchivedUsers([]);
      });
    }
  }, [activeTab]);

  // Handle Restore action (or other actions like delete)
  const handleRestore = (email) => {
    // Logic to restore the user or perform another action
    console.log(`Restoring user with email: ${email}`);
  };

  return (
    <div className="relative flex bg-[#EFEFEF]">
      <SideBar />
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="flex h-[40px] md:max-h-[60px] justify-between items-center px-4 md:px-12 shadow-md bg-gradient-to-r from-[#A9C2C3] to-[#BED1D1]">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#679294] text-l md:text-2xl font-bold">
            Archive
          </h1>
        </div>

        {/* Tabs */}
        <div className="mt-8 mx-8">
          <ul className="flex gap-6 text-[15px] relative">
            <li>
              <button
                onClick={() => setActiveTab('utilisateur')}
                className={`transition-all duration-300 pb-2 border-b-2 ${activeTab === 'utilisateur' ? 'border-[#F4A261] font-semibold' : 'border-transparent hover:border-[#F4A261]'}`}
              >
                Utilisateur
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('dossiers')}
                className={`transition-all duration-300 pb-2 border-b-2 ${activeTab === 'dossiers' ? 'border-[#F4A261] font-semibold' : 'border-transparent hover:border-[#F4A261]'}`}
              >
                Dossiers Medicaux
              </button>
            </li>
          </ul>
          <div className="h-[1.5px] bg-[rgba(146,154,155,0.35)] mt-[-2px]"></div>
        </div>

        {/* Table Headers for archived users */}
        {activeTab === 'utilisateur' && (
          <div className="flex justify-start my-6 mx-6">
            <div className="flex flex-col w-full bg-[#FFFEFE] mx-8 mb-6 rounded-[15px] border border-[#CACACA] shadow-md py-2 px-4">
              <div className="w-full flex gap-2 items-center pb-4  mt-3 mb- font-medium text-[#BBBBBF] border-b">
              <span className="md:w-[160px]">Matricule</span>
                <span className="md:w-[180px]">Name</span>
                <span className="md:w-[230px]">Email</span>
                <span className="md:w-[130px]">Role</span>
                <span className="md:w-[100px]">State</span>
                <span className="md:w-[100px]"></span>
              </div>

                <div className='max-h-[350px] min-h-[250px] flex flex-col overflow-y-auto'>

                
              {/* Utilisateurs */}
              {Array.isArray(archivedUsers) && archivedUsers.length > 0 ? (
                archivedUsers.map((user, index) => (
                  <OneArchive
                    key={index}
                    matricule={user.matricule || "—"}
                    first_name={user.nom || "—"}
                    last_name={user.prenom || "—"}
                    email={user.email || "—"}
                    role={user.role || "unknown"}
                    is_active={false} // Assuming archived users are inactive
                    onDelete={() => handleRestore(user.email)}
                  />
                ))
              ) : (
                <div className="text-center text-sm text-gray-400 mt-4">
                  Aucun utilisateur archivé trouvé.
                </div>
              )}
            </div>
            </div>
          </div>
        )}

        {/* Tu peux ajouter un autre bloc ici pour Dossiers Medicaux si besoin */}
      </div>
    </div>
  );
};

export default Archive;
