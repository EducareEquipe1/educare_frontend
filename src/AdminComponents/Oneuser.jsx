import React from "react";
import { MdDeleteOutline } from "react-icons/md";

const Oneuser = ({
  matricule,
  first_name,
  last_name,
  email,
  role,
  is_active,
  onDelete,
}) => {
  return (
    <div className="text-[13px] w-full">
      <div className="flex flex-wrap sm:flex-nowrap gap-4 items-center justify-between p-2">
        <span className="capitalize w-1/2 sm:w-[150px]">{matricule}</span>
        <span className="capitalize w-1/2 sm:w-[150px]">
          {first_name} {last_name}
        </span>
        <span className="w-1/2 sm:w-[200px] truncate">{email}</span>
        <span className="w-1/2 sm:w-[120px]">{role}</span>
        <span
          className={`w-1/2 sm:w-[100px] ${
            is_active ? "text-green-600" : "text-red-600"
          }`}
        >
          {is_active ? "Active" : "Inactive"}
        </span>
        <div className=" p-1   rounded-">
          <button
            className="border border-[#929A9B] text-[13px] px-2 py-1 hover:bg-[#679294] hover:text-white cursor-pointer rounded"
            onClick={() => onDelete(email)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="h-[1px] bg-[#BBBBBF] w-full" />
    </div>
  );
};

export default Oneuser;
