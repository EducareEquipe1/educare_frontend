import React, { useState, useEffect } from "react";
import Oneuser from "./Oneuser";
import NewUserForm from "./NewUserForm"; // Vous devrez créer ce composant

const DisplayUsers = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewUserForm, setShowNewUserForm] = useState(false);
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
        <div className="flex justify-end p-4 ">
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
                <h2 className="text-2xl flex  text-[#679294] font-bold">Nouveau Utilisateur</h2>
              
            </div>
            
            
            {/* Vous devrez créer ce composant ou l'intégrer ici */}
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
    </div>
  );
};

export default DisplayUsers;