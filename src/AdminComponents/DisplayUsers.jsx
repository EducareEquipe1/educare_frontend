import React, { useState, useEffect } from "react";
import Oneuser from "./Oneuser";

const DisplayUsers = () => {
  const [patients, setPatients] = useState([]);

  const handleDelete = async (email) => {
    console.log("Trying to delete user with email:", email);

    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token"); // Récupérer le token
      if (!token) throw new Error("Authentication token is missing");

      console.log(
        `Fetching: https://educare-backend-l6ue.onrender.com/admin/delete-user/${encodeURIComponent(
          email
        )}`
      );

      const response = await fetch(
        `https://educare-backend-l6ue.onrender.com/admin/delete-user/${encodeURIComponent(
          email
        )}`,
        //setErrorMessage(response.error);
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Ajout du token
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete doctor: ${errorText}`);
      }

      console.log("user deleted successfully");

      // Mettre à jour la liste après suppression
      setPatients((prevPatients) =>
        prevPatients.filter((user) => user.email !== email)
      );
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  // Fonction pour récupérer tous les patients depuis l'API
  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem("token"); // Récupération du token
      if (!token) throw new Error("Authentication token is missing");

      const response = await fetch(
        "https://educare-backend-l6ue.onrender.com/admin/get-all-patients",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }

      const data = await response.json();
      console.log("Fetched data:", data);
      setPatients(data); // Mise à jour des patients
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // useEffect pour charger les patients au montage
  useEffect(() => {
    fetchPatients();
  }, []);
  console.log(patients);
  return (
    <div className="flex flex-col justify-end items-end bg-[#FFFEFE] mx-8 mb-6 rounded-[15px] border border-[#CACACA] shadow-md py-2 px-4">
      <div className="w-full grid grid--6 gap-2 items-center p-3 h-full">
        {/* Titles */}
        <div className="flex justify-between font-medium text-[#BBBBBF] border-b pb-2">
          <span className="md:w-[140px]">Matricule</span>
          <span className="md:w-[180px]">Name</span>
          <span className="md:w-[130px]">Email</span>
          <span className="md:w-[100px]">Role</span>
          <span className="md:w-[140px]">State</span> {/* Ajout de l'état */}
        </div>
        <div className="max-h-[300px] min-h-[250px] flex flex-col overflow-x-auto overflow-y-auto">
          {patients.length > 0 ? (
            patients.map((patient, index) => (
              <Oneuser
                key={index}
                matricule={patient.matricule}
                first_name={patient.first_name}
                last_name={patient.last_name}
                email={patient.email}
                role={patient.role}
                is_active={patient.is_active}
                onDelete={handleDelete}
                // Ajout de l'état du patient
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No patients found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayUsers;
