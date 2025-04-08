import React from 'react'

export default function AntécédentsPersonels({formData, handleChange,readOnly}) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 text-black">
              
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Antécédents Personnels</h2>
      <h2 className="text-[#F4A261] font-bold text-2xl">Intoxications</h2>
      <div>
        <h3 className="font-bold text-[#679294] mb-2 ml-[12px]">Tabac:</h3>

        {/* À fumer */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <label className="w-24 font-medium text-gray-600">À fumer</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="tabac_fume" 
                value="oui" 
                checked={formData.tabac_fume === "oui"}
                onChange={handleChange} 
                readOnly={readOnly}
                className="mr-2" 
              />
              Oui
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="tabacFumer" 
                value="non" 
                checked={formData.tabac_fume === "non"}
                onChange={handleChange} 
                readOnly={readOnly}
                className="mr-2" 
              />
              Non
            </label>
          </div>
          <input
            type="number"
            name="tabacFumerBoites"
            value={formData.tabac_fume_nombre || ""}
            onChange={handleChange}
            readOnly={readOnly}
            placeholder="Boîtes / jour"
            className="border border-gray-300 rounded-md px-3 py-2 w-40"
          />
        </div>

        {/* À chiquer */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <label className="w-24 font-medium text-gray-600">À chiquer</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="tabac_chique" 
                value="oui" 
                checked={formData.tabac_chique === "oui"}
                onChange={handleChange} 
                readOnly={readOnly}
                className="mr-2" 
              />
              Oui
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="tabacChiquer" 
                value="non" 
                checked={formData.tabac_chique === "non"}
                onChange={handleChange} 
                readOnly={readOnly}
                className="mr-2" 
              />
              Non
            </label>
          </div>
          <input
            type="number"
            name="tabac_chque_nombre"
            value={formData.tabacChiquerBoites || ""}
            onChange={handleChange}
            readOnly={readOnly}
            placeholder="Boîtes / jour"
            className="border border-gray-300 rounded-md px-3 py-2 w-40"
          />
        </div>

        {/* Âge à la première prise */}
        <div className="mb-4">
          <label className="block font-medium text-gray-600 mb-1">Âge à la première prise</label>
          <input
            type="number"
            name="agePremierePrise"
            value={formData.age_pris || ""}
            onChange={handleChange}
            readOnly={readOnly}
            placeholder="ex: 16"
            className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-60"
          />
        </div>

        {/* Ancien fumeur */}
        <div className="mb-2">
          <label className="block font-medium text-gray-600 mb-1">Ancien fumeur :</label>
          <div className="flex items-center gap-6 mb-2">
            <label className="flex items-center">
              <input 
                type="radio" 
                name="ancienFumeur" 
                value="oui" 
                checked={formData.ancien_fume === "oui"}
                onChange={handleChange} 
                readOnly={readOnly}
                className="mr-2" 
              />
              Oui
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                name="ancienFumeur" 
                value="non" 
                checked={formData.ancien_fume === "non"}
                onChange={handleChange} 
                readOnly={readOnly}
                className="mr-2" 
              />
              Non
            </label>
            <label className="block font-medium text-gray-600 mb-1">Période d'exposition:</label>
            <input
              type="text"
              name="periodeExposition"
              value={formData.periode_exposition || ""}
              onChange={handleChange}
              readOnly={readOnly}
              placeholder="Période d'exposition"
              className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/2"
            />
          </div>
        </div>
      </div>

      {/* Alcool */}
      <div className="mt-4">
        <h3 className="font-semibold text-gray-700 mb-2">Alcool</h3>
        <textarea
          name="alcool"
          value={formData.alcool || ""}
          onChange={handleChange}
          readOnly={readOnly}
          placeholder="Détails de consommation d'alcool"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          rows="3"
        />
      </div>

      {/* Médicaments */}
      <div className="mt-4">
        <h3 className="font-semibold text-gray-700 mb-2">Médicaments</h3>
        <textarea
          name="medicament"
          value={formData.medicaments || ""}
          onChange={handleChange}
          readOnly={readOnly}
          placeholder="Liste ou détails de médicaments"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          rows="3"
        />
      </div>

      {/* Autres */}
      <div className="mt-4">
        <h3 className="font-semibold text-gray-700 mb-2">Autres</h3>
        <textarea
          name="autres"
          value={formData.autres || ""}
          onChange={handleChange}
          readOnly={readOnly}
          placeholder="Autres intoxications"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          rows="3"
        />
      </div>
    </div>
  )
}