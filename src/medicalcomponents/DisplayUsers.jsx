import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersList from './UsersList';
import axios from 'axios';

export default function DisplayUsers() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [roleFilter, setRoleFilter] = useState('');

  const navigate = useNavigate();
  const handleConsult = async (email) => {
    try {
      const response = await axios.get(`/api/medical-form/get/${email}`);
      
      if (response.status === 200) {
        // Medical record exists
        navigate(`/medicalForm/${email}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Medical record not found
        navigate(`/addFile/${email}`);
      } else {
        // Some other error (e.g., network or auth issue)
        console.error("Erreur lors de la vérification du dossier médical", error);
        navigate(`/addFile/${email}`);
      }
    }
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {

        const response = await axios.get("https://educare-backend-l6ue.onrender.com/admin/get-all-patients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPatients(response.data);
        setFilteredPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    if (roleFilter === '') {
      setFilteredPatients(patients);
    } else {
      setFilteredPatients(
        patients.filter((patient) =>
          patient.role.toLowerCase().includes(roleFilter.toLowerCase())
        )
      );
    }
  }, [roleFilter, patients]);

  return (
    <div className="h-screen flex flex-col justify-end items-end bg-[#FFFEFE] mx-8 mb-6 rounded-[15px] border border-[#CACACA] shadow-md py-2 px-4 ml-[150px] mt-[50px]">
      {/* Filter input */}
      <div className="w-full mb-4">
        <label className="text-sm font-medium text-gray-600 mr-2">Filter by role:</label>
        <input
          type="text"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          placeholder="e.g. admin, doctor, user"
          className="text-black border border-gray-300 rounded px-2 py-1 text-sm"
        />
      </div>

      <div className="w-full grid grid-cols-1 gap-2 items-center p-3 h-full">
        {/* Titles */}
        <div className="flex justify-between font-medium text-[#BBBBBF] border-b pb-2">
          <span className="md:w-[140px]">Matricule</span>
          <span className="md:w-[180px]">Name</span>
          <span className="md:w-[130px]">Email</span>
          <span className="md:w-[100px]">Role</span>
        </div>

        <div className="max-h-[300px] min-h-[250px] flex flex-col overflow-x-auto overflow-y-auto">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <UsersList
                key={patient.matricule}
                matricule={patient.matricule}
                first_name={patient.first_name}
                last_name={patient.last_name}
                email={patient.email}
                role={patient.role}
                onConsult={handleConsult}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No patients found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
