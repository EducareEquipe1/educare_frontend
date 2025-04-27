import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paperclip, Link as LinkIcon } from 'lucide-react';

const Ordonnance = () => {
  const { email } = useParams();
  const [patientData, setPatientData] = useState({
    nom: 'ines',
    prenom: 'aini',
    adresse: '123 Main Street',
    dateNaissance: '2005-01-01',
    age: 35
  });

  const [prescriptions, setPrescriptions] = useState([]);
  const [newPrescription, setNewPrescription] = useState('');

  const handlePrescriptionChange = (e) => {
    setNewPrescription(e.target.value);
  };

  const addPrescription = () => {
    if (newPrescription) {
      setPrescriptions([...prescriptions, newPrescription]);
      setNewPrescription('');
    }
  };

  const saveOrdonnance = () => {
    // Here you can handle saving the ordonnance logic, for example, making an API call
    console.log('Ordonnance saved');
  };

  const printOrdonnance = () => {
    window.print();  // A simple way to print the ordonnance
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-10 w-10 mr-4" />
          <div>
            <h1 className="text-2xl font-bold">Cabinet Médical Esi-Sba</h1>
            <p className="text-sm text-gray-600">{email}</p>
            <p className="text-sm text-gray-600">Téléphone: 123-456-789</p>
            <p className="text-sm text-gray-600">Lieu: Ecole Supérieure d'Informatique</p>
          </div>
        </div>
      </div>

      {/* Patient Info */}
      <hr />
      <div className="my-4">
        <p><strong>Nom:</strong> {patientData.nom} {patientData.prenom}</p>
        <p><strong>Adresse:</strong> {patientData.adresse}</p>
        <p><strong>Date de Naissance:</strong> {patientData.dateNaissance}</p>
        <p><strong>Âge:</strong> {patientData.age} ans</p>
      </div>
      <hr />

      {/* Prescription */}
      <div className="my-4">
        <label className="block text-sm font-bold text-gray-700 mb-2">Prescriptions</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newPrescription}
            onChange={handlePrescriptionChange}
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="Enter prescription (e.g., Paracetamol)"
          />
          <button
            type="button"
            onClick={addPrescription}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Ajouter
          </button>
        </div>

        <div className="mt-4">
          {prescriptions.map((prescription, index) => (
            <div key={index} className="flex justify-between items-center py-1">
              <span>{prescription}</span>
              <button className="text-red-500">Supprimer</button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        {/* Modify and Save/Print Buttons */}
        <button
          onClick={() => console.log('Modify ordonnance')}
          className="bg-gray-300 text-gray-800 p-2 rounded-md"
        >
          Modifier
        </button>
        <button
          onClick={saveOrdonnance}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Sauvegarder
        </button>
        <button
          onClick={printOrdonnance}
          className="bg-green-500 text-white p-2 rounded-md"
        >
          Imprimer
        </button>
      </div>
    </div>
  );
};

export default Ordonnance;
