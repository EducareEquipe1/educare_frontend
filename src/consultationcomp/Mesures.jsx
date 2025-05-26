import React from "react";

const Mesures = ({ formData, handleChange }) => {
  return (
    <div>
      <div className="bg-white shadow-md rounded-xl p-6 space-y-6 text-black">
        <h2 className="text-2xl font-bold text-gray-[150]">Mesures</h2>
        <div className="grid grid-cols-2 gap-4 font-[Exo_2] text-[13px] font-bold capitalize leading-[100%] text-[#2E3D4094]">
          {/* First Column */}
          <div className="space-y-4">
            {/* Poids */}
            <div className="flex items-center space-x-4 mb-4">
              <label className="w-[100px]">Poids (kg):</label>
              <input
                inputMode="numeric"
                className="w-full max-w-[150px] px-3 py-2 rounded-[12px]
 border border-[2px] border-[#2E3D40A6] focus:outline-none focus:ring-2 focus:ring-blue-500 
        [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-[#2E3D4094]"
              />
            </div>

            {/* IMC */}
            <div className="flex items-center space-x-4 mb-4">
              <label className="w-[100px]">IMC :</label>
              <input
                readOnly
                inputMode="numeric"
                className="w-full max-w-[150px] px-3 py-2 rounded-[12px]
 border border-[2px] border-[#2E3D40A6] focus:outline-none focus:ring-2 focus:ring-blue-500 
        [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-[#2E3D4094]"
              />
            </div>
          </div>

          {/* Second Column */}
          <div className="space-y-4">
            {/* Taille */}
            <div className="flex items-center space-x-4 mb-4">
              <label className="w-[100px]">Taille(cm) :</label>
              <input
                inputMode="numeric"
                className="w-full max-w-[150px] px-3 py-2 rounded-[12px]
 border border-[2px] border-[#2E3D40A6] focus:outline-none focus:ring-2 focus:ring-blue-500 
        [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-[#2E3D4094]"
              />
            </div>

            {/* Tension Artérielle */}
            <div className="flex items-center space-x-4 mb-4">
              <label className="w-[100px]">Tension Artérielle :</label>
              <input
                inputMode="numeric"
                className="w-full max-w-[150px] px-3 py-2 rounded-[12px]
 border border-[2px] border-[#2E3D40A6] focus:outline-none focus:ring-2 focus:ring-blue-500 
        [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-[#2E3D4094]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mesures;
