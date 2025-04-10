import React from "react";

const UsersList = ({
  matricule,
  prenom,
  nom,
  email,
  //role,
  onConsult,
}) => {
  return (
    <div className="text-[13px] w-full">
      <div className="text-black flex flex-wrap sm:flex-nowrap gap-4 items-center justify-between p-2">
        <span className="capitalize w-1/2 sm:w-[150px]">{matricule}</span>
        <span className="capitalize w-1/2 sm:w-[150px]">
          {prenom} {nom}
        </span>
        <span className="w-1/2 sm:w-[200px] truncate">{email}</span>
       {/* <span className="w-1/2 sm:w-[120px]">{role}</span>*/}
        <div className="p-1">
          <button
            onClick={() => onConsult?.(email)}
            className="border border-[#929A9B] text-[13px] px-2 py-1 hover:bg-[#679294] cursor-pointer rounded"
          >
            Consulter
          </button>
        </div>
      </div>
      <div className="h-[1px] bg-[#BBBBBF] w-full" />
    </div>
  );
};

export default UsersList;
