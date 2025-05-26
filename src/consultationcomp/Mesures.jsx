import React from "react";

const Mesures = ({ formData, handleChange, readOnly }) => {
  // Handle tension as systolic/diastolic
  const handleTensionChange = (e, type) => {
    if (readOnly) return;
    const value = e.target.value;
    const newTension = { ...formData.tension, [type]: value };
    handleChange({
      target: {
        name: "tension",
        value: `${newTension.systolic || ''}/${newTension.diastolic || ''}`,
      },
    });
  };

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

                type="number"
                name="poids"
                value={formData.poids || ''}
                onChange={handleChange}
                readOnly={readOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Entrez le poids"

              />
            </div>

            {/* IMC */}
            <div className="flex items-center space-x-4 mb-4">
              <label className="w-[100px]">IMC :</label>
              <input

                type="number"
                name="IMC"
                value={formData.IMC || ''}
                onChange={handleChange}
                readOnly={true} // Keep IMC readOnly as in original
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Indice de masse corporelle"

              />
            </div>
          </div>

          {/* Second Column */}
          <div className="space-y-4">
            {/* Taille */}
            <div className="flex items-center space-x-4 mb-4">
              <label className="w-[100px]">Taille(cm) :</label>
              <input

                type="number"
                name="taille"
                value={formData.taille || ''}
                onChange={handleChange}
                readOnly={readOnly}
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
                  value={formData.tension?.split('/')[0] || ''}
                  onChange={(e) => handleTensionChange(e, 'systolic')}
                  readOnly={readOnly}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Systolique"
                />
                <input
                  type="number"
                  value={formData.tension?.split('/')[1] || ''}
                  onChange={(e) => handleTensionChange(e, 'diastolic')}
                  readOnly={readOnly}
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
