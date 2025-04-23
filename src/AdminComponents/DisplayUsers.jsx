import React, { useState, useEffect } from "react";
import Oneuser from "./Oneuser";

const DisplayUsers = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Static token for authentication
  const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjEsImVtYWlsIjoibmkubWVyem91a0Blc2ktc2JhLmR6IiwiaWF0IjoxNzQ0MDM2ODMyLCJleHAiOjE3NDY2Mjg4MzJ9.GbF_0vPxlAfPuh7V6RcDiZ3o5iSKxRcMcmwnS5lTyU4";

  // Fetch users
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

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

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
    <div className="flex flex-col justify-end items-end bg-[#FFFEFE] max-h-[500px] min-h-[250px] min-w-[900px] flex flex-col overflow-y-auto mx-6 mb-6 rounded-[15px] border border-[#CACACA] shadow-md py-2 px-4">
      <div className="w-full flex flex-col items-center py-3 h-full">
        <div className="flex justify-between w-full font-medium text-[#BBBBBF] border-b pb-2">
          <span className="">Matricule</span>
          <span className="">Name</span>
          <span className="">Email</span>
          <span className="">Role</span>
          <span className="">State</span>
          <span className=""></span>
        </div>

        <div className="max-h-[300px] min-h-[250px] flex flex-col overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading users...</p>
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
                fetchUsers={fetchUsers} // Pass the fetchUsers function for re-fetching after archiving
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayUsers;
