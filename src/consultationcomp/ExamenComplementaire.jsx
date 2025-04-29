import React from "react"

const ExamenComplementaire =({ formData, handleChange })=>{
    return (
        <div className="bg-white shadow-md rounded-xl p-6 space-y-6 text-black">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Examens Complémentaires</h2>
    
          {/* Ligne 1 : Sanguin et Urinaire */}
          <div className="space-y-4 border-b border-gray-300 pb-4">
  <p className="text-black font-bold text-lg">Biologique</p>

  <div className="grid grid-cols-2 gap-6">
    {/* Résultat Sanguin */}
    <div>
      <label className="block text-[#F4A261] font-semibold mb-1">Sanguin</label>
      <input
        type="text"
        name="sanguin"
        value={formData.sanguin}
        onChange={handleChange}
        placeholder="Résultats sanguins"
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>

    {/* Résultat Urinaire */}
    <div>
      <label className="block text-[#F4A261] font-semibold mb-1">Urinaire</label>
      <input
        type="text"
        name="urinaire"
        value={formData.urinaire}
        onChange={handleChange}
        placeholder="Résultats urinaires"
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  </div>
</div>

    
          {/* Ligne 2 : Radiologiques */}
          <div className="border-b border-gray-300 pb-4">
            <label className="block text-black font-semibold mb-1">Radiologiques</label>
            <input
              type="text"
              name="radiologiques"
              value={formData.radiologiques}
              onChange={handleChange}
              placeholder="Résultats radiologiques"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
    
          {/* Ligne 3 : Hépatite Virale / Syphilis / VIH */}
          <div className="grid grid-cols-2 gap-6">
            {/* Colonne 1 */}
            <div>
              <label className="block font-semibold mb-2">Hépatite virale</label>
              <div className="flex items-center gap-4 mb-2">
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="hepatite_virale"
                    value="hepatite_pos"
                    checked={formData.hepatite_virale === "positif"}
                    onChange={handleChange}
                  />
                  Positif
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="hepatite_virale"
                    value="hapatite_neg"
                    checked={formData.hepatite_virale === "negatif"}
                    onChange={handleChange}
                  />
                  Négatif
                </label>
              </div>
    
              <label className="block font-semibold mb-2">Syphilis</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="syphilis"
                    value="syphilis_pos"
                    checked={formData.syphilis === "positif"}
                    onChange={handleChange}
                  />
                  Positif
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="syphilis"
                    value="syphilis_neg"
                    checked={formData.syphilis === "negatif"}
                    onChange={handleChange}
                  />
                  Négatif
                </label>
              </div>
            </div>
    
            {/* Colonne 2 */}
            <div>
              <label className="block font-semibold mb-2">VIH</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="vih"
                    value="vih_pos"
                    checked={formData.vih === "positif"}
                    onChange={handleChange}
                  />
                  Positif
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="vih"
                    value="vih_neg"
                    checked={formData.vih === "negatif"}
                    onChange={handleChange}
                  />
                  Négatif
                </label>
              </div>
            </div>
          </div>
        </div>
      );
} 

export default ExamenComplementaire;