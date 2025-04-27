import React from "react";

const Mesures = ({ formData, handleChange }) => {
  return (
    <div>
      <div className="bg-white shadow-md rounded-xl p-6 space-y-6 text-black">
        <h2 className="text-2xl font-bold text-gray-800">Mesures</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* First Column */}
          <div className="space-y-4">
            {/* Poids */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Poids (kg)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Entrez le poids"
              />
            </div>
            
            {/* IMC */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                IMC
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Indice de masse corporelle"
                readOnly
              />
            </div>
          </div>

          {/* Second Column */}
          <div className="space-y-4">
            {/* Taille */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Taille (cm)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Entrez la taille"
              />
            </div>
            
            {/* Tension Artérielle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tension Artérielle
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Systolique"
                />
                <span className="self-center">/</span>
                <input
                  type="number"
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Diastolique"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mesures;