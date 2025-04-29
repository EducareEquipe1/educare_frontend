import React from 'react';

const ExamenAppareil = ({ formData, handleChange }) => {
  return (
    <div className="space-y-8 p-6 bg-white rounded-lg shadow-md text-black">
      
      {/* Première Row : Ophtalmologique + Audition */}
      <div className="grid grid-cols-2 gap-8">

        {/* Colonne Ophtalmologique */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-[#679294]">Ophtalmologique</h2>
          
          {/* Acuité visuelle */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold">Acuité Visuelle</label>
            <input 
              type="text" 
              name="vision_d" 
              value={formData.vision_d}
              onChange={handleChange}
              placeholder="OD" 
              className="w-full p-2 border rounded" 
            />
            <input 
              type="text" 
              name="vision_g" 
              value={formData.vision_g}
              onChange={handleChange}
              placeholder="OG" 
              className="w-full p-2 border rounded" 
            />
          </div>

          {/* Symptômes pour les yeux */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold">Symptômes pour les yeux</label>
            <div className="flex flex-col space-y-1">
              <label>
                <input 
                  type="checkbox" 
                  name="larmoiement"
                  checked={formData.larmoiement === "true"}
                  onChange={handleChange}
                  className="mr-2"
                /> Larmoiement
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="douleur"
                  checked={formData.douleur === "true"}
                  onChange={handleChange}
                  className="mr-2"
                /> Douleur
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="taches_yeux"
                  checked={formData.taches_yeux === "true"}
                  onChange={handleChange}
                  className="mr-2"
                /> Tache devant les yeux
              </label>
            </div>
          </div>
        </div>

        {/* Colonne Audition */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-[#679294]">Audition</h2>

          {/* Audition OD / OG */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold">Audition</label>
            <input 
              type="text" 
              name="audition_d"
              value={formData.audition_d}
              onChange={handleChange}
              placeholder="OD" 
              className="w-full p-2 border rounded" 
            />
            <input 
              type="text" 
              name="audition_g"
              value={formData.audition_g}
              onChange={handleChange}
              placeholder="OG" 
              className="w-full p-2 border rounded" 
            />
          </div>

          {/* Symptômes pour l'audition */}
          <div className="flex flex-col space-y-1">
            <label>
              <input 
                type="checkbox" 
                name="sifflements"
                checked={formData.sifflements === "true"}
                onChange={handleChange}
                className="mr-2"
              /> Sifflements
            </label>
            <label>
              <input 
                type="checkbox" 
                name="angines"
                checked={formData.angines === "true"}
                onChange={handleChange}
                className="mr-2"
              /> Angine répétée
            </label>
            <label>
              <input 
                type="checkbox" 
                name="epistaxis"
                checked={formData.epistaxis === "true"}
                onChange={handleChange}
                className="mr-2"
              /> Épistaxis
            </label>
            <label>
              <input 
                type="checkbox" 
                name="rhinorrhee"
                checked={formData.rhinorrhee === "true"}
                onChange={handleChange}
                className="mr-2"
              /> Rhinorrhée
            </label>
          </div>
        </div>

      </div>

      <hr className="border-gray-300" />

      {/* Deuxième Row : Neurologique et Peau */}
      <div className="grid grid-cols-2 gap-8">

        {/* Neurologique et Psychique */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#679294]">Neurologique et Psychique</h2>
          <div className="flex flex-col space-y-1">
            <label>
              <input 
                type="checkbox" 
                name="cephalees"
                checked={formData.cephalees === "true"}
                onChange={handleChange}
                className="mr-2"
              /> Céphalées
            </label>
            <label>
              <input 
                type="checkbox" 
                name="vertiges"
                checked={formData.vertiges === "true"}
                onChange={handleChange}
                className="mr-2"
              /> Vertiges
            </label>
            <label>
              <input 
                type="checkbox" 
                name="troubles_sommeil"
                checked={formData.troubles_sommeil === "true"}
                onChange={handleChange}
                className="mr-2"
              /> Troubles du sommeil
            </label>
          </div>
        </div>

        {/* Peau et Muqueuse */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#679294]">Peau et Muqueuse</h2>
          <div className="flex flex-col space-y-1">
            <label>
              <input 
                type="checkbox" 
                name="peau_normale"
                checked={formData.peau_normale === "true"}
                onChange={handleChange}
                className="mr-2"
              /> Normal
            </label>
            <label>
              <input 
                type="checkbox" 
                name="peau_anormale"
                checked={formData.peau_anormale === "true"}
                onChange={handleChange}
                className="mr-2"
              /> Anormal
            </label>
          </div>
        </div>

      </div>

      <hr className="border-gray-300" />

      {/* Troisième Row : Appareil Locomoteur et Respiratoire */}
      <div className="grid grid-cols-2 gap-8">

        {/* Appareil Locomoteur */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#679294]">Appareil Locomoteur</h2>
          <div className="flex flex-col space-y-1">
            <label>
              <input
                type="checkbox"
                name="douleur_musculaire"
                checked={formData.douleur_musculaire === "true"}
                onChange={handleChange}
                className="mr-2"
              /> Douleur musculaire
            </label>
            <label>
              <input
                type="checkbox"
                name="douleur_articulaire"
                checked={formData.douleur_articulaire === "true"}
                onChange={handleChange}
                className="mr-2"
              /> Douleur articulaire
            </label>
            <label>
              <input
                type="checkbox"
                name="douleur_neurologique"
                checked={formData.douleur_neurologique === "true"}
                onChange={handleChange}
                className="mr-2"
              /> Douleur neurologique
            </label>
          </div>
        </div>

        {/* Appareil Respiratoire */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#679294]">Appareil Respiratoire</h2>
          <div className="flex flex-col space-y-1">
            <label>
              <input
                type="checkbox"
                name="toux"
                checked={formData.toux === "true"}
                onChange={handleChange}
                className="mr-2"
              /> Toux
            </label>
            <label>
              <input
                type="checkbox"
                name="dyspnee"
                checked={formData.dyspnee === "true"}
                onChange={handleChange}
                className="mr-2"
              /> Dyspnée
            </label>
            <label>
              <input
                type="checkbox"
                name="douleurs_thoracique"
                checked={formData.douleurs_thoracique === "true"}
                onChange={handleChange}
                className="mr-2"
              /> Douleurs thoraciques
            </label>
          </div>
        </div>

      </div>

      <hr className="border-gray-300" />

      {/* Quatrième Row : Appareil Cardio-Vasculaire et Digestif */}
      <div className="grid grid-cols-2 gap-8">

        {/* Appareil Cardio-Vasculaire */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#679294]">Appareil Cardio-Vasculaire</h2>
          <div className="flex flex-col space-y-1">
            <label>
              <input
                type="checkbox"
                name="palpitation"
                checked={formData.palpitation === "true"}
                onChange={handleChange}
                className="mr-2"
              /> Palpitation
            </label>
            <label>
              <input
                type="checkbox"
                name="oedeme"
                checked={formData.oedeme === "true"}
                onChange={handleChange}
                className="mr-2"
              /> Œdème
            </label>
            <label>
              <input
                type="checkbox"
                name="cyanose"
                checked={formData.cyanose === "true"}
                onChange={handleChange}
                className="mr-2"
              /> Cyanose
            </label>
          </div>
        </div>

        {/* Appareil Digestif */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#679294]">Appareil Digestif</h2>
          <div className="flex flex-col space-y-1">
            <label>
              <input
                type="checkbox"
                name="pyrosis"
                checked={formData.pyrosis === "true"}
                onChange={handleChange}
                className="mr-2"
              /> Pyrosis
            </label>
            <label>
              <input
                type="checkbox"
                name="vomissements"
                checked={formData.vomissements === "true"}
                onChange={handleChange}
                className="mr-2"
              /> Vomissements
            </label>
            <label>
              <input
                type="checkbox"
                name="douleurs_abdominales"
                checked={formData.douleurs_abdominales === "true"}
                onChange={handleChange}
                className="mr-2"
              /> Douleurs abdominales
            </label>
          </div>
        </div>

      </div>

      <hr className="border-gray-300" />

      {/* Cinquième et dernière Row : Appareil Génitaux-Urinaire */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#679294]">Appareil Génitaux-Urinaire</h2>
        <div className="flex flex-col space-y-1">
          <label>
            <input
              type="checkbox"
              name="dysurie"
              checked={formData.dysurie === "true"}
              onChange={handleChange}
              className="mr-2"
            /> Dysurie
          </label>
          <label>
            <input
              type="checkbox"
              name="hematurie"
              checked={formData.hematurie === "true"}
              onChange={handleChange}
              className="mr-2"
            /> Hématurie
          </label>
          <label>
            <input
              type="checkbox"
              name="cycles_irreguliers"
              checked={formData.cycles_irreguliers === "true"}
              onChange={handleChange}
              className="mr-2"
            /> Cycles irréguliers
          </label>
        </div>
      </div>

    </div>
  );
};

export default ExamenAppareil;



