import React from 'react';

const DetailsPersonnels = ({ formData, handleChange,readOnly }) => (
  <div>
    {/* Détails personnels */}
    <div className="bg-white shadow-md rounded-xl p-6 space-y-6 text-black">
      <h2 className="text-2xl font-bold text-gray-800">Détails Personnels</h2>

      {/*  First Row (N° Dossier, Sécurité Sociale, Groupe Sanguin) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "N° de Dossier", name: "id", type: "text" },
          { label: "N° Sécurité Sociale", name: "numSecuriteSociale", type: "text" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-[14px] text-gray-600 font-semibold mb-1">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              readOnly={readOnly}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        ))}

        {/* Groupe Sanguin (Dropdown) */}
        <div>
          <label className="block text-[14px] text-gray-600 font-semibold mb-1">
            Groupe Sanguin
          </label>
          <select
            name="bloodGroup"
            value={formData.groupeSanguin}
            onChange={handleChange}
            disabled={readOnly} 
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 🔹 Second Row (Nom de l'Établissement) */}
      <div>
        <label className="block text-[14px] text-gray-600 font-semibold mb-1">
          Nom de l'Établissement
        </label>
        <input
          type="text"
          name="etablissement"
          value="Ecole Supérieure d'Informatique de Sidi-Bel-Abbès"
          readOnly
          className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
        />
      </div>

      {/* 🔹 Third Row (Nom, Prénom, Date Naissance, Lieu Naissance) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Nom", name: "nom", type: "text" },
          { label: "Prénom", name: "prenom", type: "text" },
          { label: "Date de Naissance", name: "date_naissance", type: "date" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-[14px] text-gray-600 font-semibold mb-1">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              readOnly={readOnly}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        ))}
      </div>

      {/* 🔹 Fourth Row (Situation Familiale, Sexe) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      <div>
          <label className="block text-[14px] text-gray-600 font-semibold mb-1">
            Adresse
          </label>
          <input
            type="text"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            readOnly={readOnly}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-[14px] text-gray-600 font-semibold mb-1">
            Téléphone
          </label>
          <input
            type="tel"
            name="telephone"
            value={formData.num_tel}
            onChange={handleChange}
            readOnly={readOnly}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>


        {[
          { label: "Situation Familiale", name: "situation_familiale", options: ["Célibataire", "Marié(e)", "Divorcé(e)", "Veuf(ve)"] },

        ].map(({ label, name, options }) => (
          <div key={name}>
            <label className="block text-[14px] text-gray-600 font-semibold mb-1">
              {label}
            </label>
            <select
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* 🔹 Fifth Row (Date Admission, Filière, Statut) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Filière (default value) */}
        <div>
          <label className="block text-[14px] text-gray-600 font-semibold mb-1">
            Filière
          </label>
          <input
            type="text"
            name="filiere"
            value="Informatique"
            readOnly
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-[14px] text-gray-600 font-semibold mb-1">Statut</label>
          <input
            name="statut"
            value={formData.statut}
            readOnly={readOnly}
            readonly
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
      </div>
    </div>
  </div>
);

export default DetailsPersonnels;
