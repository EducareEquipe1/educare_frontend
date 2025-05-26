import React, { useState, useEffect } from "react";
import Oneuser from "./Oneuser";
import NewUserForm from "./NewUserForm"; 
import { IoMdAttach } from "react-icons/io";

const DisplayUsers = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [showPdfUploadForm, setShowPdfUploadForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const adminToken = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://educare-backend-l6ue.onrender.com/Admin/get-users",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setPatients(data.utilisateurs || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handlePdfUpload = async () => {
    if (!selectedFile) {
      alert("Veuillez sélectionner un fichier PDF");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        "https://educare-backend-l6ue.onrender.com/your-pdf-upload-endpoint",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Échec de l'upload du PDF");

      // Handle successful upload
      alert("Étudiants ajoutés avec succès!");
      setShowPdfUploadForm(false);
      setSelectedFile(null);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error uploading PDF:", error);
      alert("Une erreur est survenue lors de l'upload du PDF");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="relative">
      {/* Tableau des utilisateurs */}
      <div className="bg-[#FFFEFE] max-h-[420px] min-h-[250px] overflow-y-auto rounded-[15px] border border-[#CACACA] shadow-md overflow-hidden mx-6  min-w-[900px]">
        {/* En-tête du tableau */}
        

        {/* En-têtes des colonnes */}
        <div className="grid grid-cols-12 gap-4 items-center p-4 border-b border-[#CACACA] text-[#BBBBBF] font-medium">
          <div className="col-span-2">Matricule</div>
          <div className="col-span-2">Nom</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-2">Rôle</div>
          <div className="col-span-2">Statut</div>
          <div className="col-span-1">Action</div>
        </div>

        {/* Corps du tableau */}
        <div className="">
          {loading ? (
            <div className="flex items-center justify-center h-full p-8 text-gray-500">
              Chargement des utilisateurs...
            </div>
          ) : patients.length > 0 ? (
            patients.map((user, index) => (
              <Oneuser
                key={index}
                matricule={user.matricule || "--"}
                first_name={user.prenom || "--"}
                last_name={user.nom || "--"}
                email={user.email}
                role={user.role}
                is_active="active"
                fetchUsers={fetchUsers}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-full p-8 text-gray-500">
              Aucun utilisateur trouvé.
            </div>
          )}
        </div>
      </div>
      
      {/* Bouton Nouveau Utilisateur */}
      <div className="flex justify-end p-4 gap-4 ">
        <button 
          onClick={() => setShowPdfUploadForm(true)}
          className="flex justify-center items-center gap-1 px-4 py-2 bg-white rounded-md shadow-xl hover:bg-gray-100"
        >
          <IoMdAttach /> <h1>Ajouter Étudiants via PDF</h1>
        </button>

        <button
          onClick={() => setShowNewUserForm(true)}
          className="bg-[#679294] text-white px-4 py-2 rounded-md hover:bg-[#5a7e80] transition-colors"
        >
          + Ajouter
        </button>
      </div>

      {/* Formulaire Nouveau Utilisateur (conditionnel) */}
      {showNewUserForm && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-center items-center mb-4">
                <h2 className="text-2xl flex text-[#679294] font-bold">Nouveau Utilisateur</h2>
            </div>
            
            <NewUserForm 
              onSuccess={() => {
                setShowNewUserForm(false);
                fetchUsers();
              }} 
              onCancel={() => setShowNewUserForm(false)}
            />
          </div>
        </div>
      )}

      {/* PDF Upload Modal */}
      {showPdfUploadForm && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex   items-center mb-4">
              <h2 className="text-2xl text-[#679294] font-bold mb-5">Ajouter Étudiants via PDF</h2>
             
            </div>
            
            <div className="mb-6">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-[#679294] file:text-white
                  hover:file:bg-[#5a7e80]"
              />
              {selectedFile && (
                <p className="mt-2 text-sm text-gray-600">
                  Fichier sélectionné: {selectedFile.name}
                </p>
              )}
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowPdfUploadForm(false);
                  setSelectedFile(null);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={handlePdfUpload}
                className="px-4 py-2 bg-[#679294] text-white rounded-md hover:bg-[#5a7e80]"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayUsers;