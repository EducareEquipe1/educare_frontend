import React, { useState } from "react";
import Confirmation from "./Confirmation";

const Oneuser = ({ matricule, first_name, last_name, email, role, is_active, fetchUsers }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [actionType, setActionType] = useState(""); // 'archiver' or 'modifier'

  // Static token for authentication
  const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjEsImVtYWlsIjoibmkubWVyem91a0Blc2ktc2JhLmR6IiwiaWF0IjoxNzQ0MDM2ODMyLCJleHAiOjE3NDY2Mjg4MzJ9.GbF_0vPxlAfPuh7V6RcDiZ3o5iSKxRcMcmwnS5lTyU4";

  // Handle confirmation for archiving
  const handleConfirm = async () => {
    if (actionType === "archiver") {
      // Archiving the user
      try {
        const response = await fetch(
          `https://educare-backend-l6ue.onrender.com/admin/archive-user/${email}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${adminToken}`, // Static token
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Failed to archive user:", errorData);
          return;
        }

        console.log("User archived successfully");
        fetchUsers(); // Re-fetch users after archiving
      } catch (error) {
        console.error("Error archiving user:", error);
      }
    }
    setShowConfirmation(false);
  };

  return (
    <div className="text-[13px] w-full">
      <div className="flex flex-wrap sm:flex-nowrap gap-4 items-center justify-between p-2">
        <span className="capitalize  sm:w-[170px]">{matricule}</span>
        <span className="capitalize w-1/2 sm:w-[150px]">{first_name} {last_name}</span>
        <span className="w-1/2 sm:w-[210px] truncate">{email}</span>
        <span className="w-1/2 sm:w-[180px]">{role}</span>
        <span className={`w-1/2 sm:w-[60px] ${is_active ? "text-green-600" : "text-red-600"}`}>
          {is_active ? "Active" : "Inactive"}
        </span>
        <div className="flex p-1">
          <button
            className="border border-[#929A9B] text-[13px] px-2 py-1 hover:bg-[#679294] hover:text-white cursor-pointer rounded"
            onClick={() => {
              setActionType("archiver");
              setShowConfirmation(true);
            }}
          >
            Archiver
          </button>
        </div>
      </div>

      <div className="h-[1px] bg-[#BBBBBF] w-full" />

      {showConfirmation && (
        <Confirmation
          type={actionType}
          onCancel={() => setShowConfirmation(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default Oneuser;
