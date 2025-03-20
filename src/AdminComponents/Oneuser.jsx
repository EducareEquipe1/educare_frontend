import React from 'react';
import { MdDeleteOutline } from "react-icons/md";


const Oneuser = ({ matricule, first_name, last_name, email, role, isActive }) => {
  return (
    <div className="text-[13px] w-full">
      <div className="flex flex-wrap sm:flex-nowrap gap-4 items-center justify-between p-2">
        <span className="capitalize w-1/2 sm:w-[150px]">{matricule}</span>
        <span className="capitalize w-1/2 sm:w-[150px]">{first_name} {last_name}</span>
        <span className="w-1/2 sm:w-[200px] truncate">{email}</span>
        <span className="w-1/2 sm:w-[120px]">{role}</span>
        <span className={`w-1/2 sm:w-[100px] ${isActive ? 'text-green-600' : 'text-red-600'}`}>
          {isActive ? "Active" : "Inactive"}
        </span>
        <div className=' p-1  border rounded-'>
        <MdDeleteOutline className='  textwhite'/>

        </div>

      </div>
      <div className="h-[1px] bg-[#BBBBBF] w-full" />
    </div>
  );
};

export default Oneuser;
