import React, { useState } from 'react';
import { TbCalendarFilled } from "react-icons/tb";

const TabRendezvous = ({ patient }) => {
  // Données initiales
  const initialRendezvous = [
    {
      id: 1,
      motif: "Consultation générale",
      patient: `${patient.nom} ${patient.prenom}`,
      email: patient.email,
      date: "2024-05-04",
      status: "programmé"
    }
  ];

  const [rendezvous, setRendezvous] = useState(initialRendezvous);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRdv, setNewRdv] = useState({
    motif: '',
    date: new Date().toISOString().split('T')[0],
    status: 'programmé'
  });

  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'terminé': return 'bg-green-100 text-green-800';
      case 'annulé': return 'bg-red-100 text-red-800';
      case 'programmé': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddRendezvous = () => {
    const newId = Math.max(0, ...rendezvous.map(r => r.id)) + 1;
    const addedRdv = {
      id: newId,
      motif: newRdv.motif || `Nouveau motif ${newId}`,
      patient: `${patient.nom} ${patient.prenom}`,
      email: patient.email,
      date: newRdv.date,
      status: newRdv.status
    };
    
    setRendezvous([...rendezvous, addedRdv]);
    setShowAddModal(false);
    setNewRdv({
      motif: '',
      date: new Date().toISOString().split('T')[0],
      status: 'programmé'
    });
  };

  return (
    <div className='flex flex-col gap-6'>
      {/* Nouveau Rendez-vous */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div className='flex flex-col justify-center items-start gap-2'>
            <h2 className="text-xl text-[#2E3D40] font-semibold">Nouveau Rendez-vous</h2>
            <p className="text-gray-500 text-sm">
              Programmer un nouveau rendez-vous pour {patient.nom} {patient.prenom}
            </p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center text-white py-1 px-4 rounded-[8px] hover:bg-[linear-gradient(to_left,#2E3D40,transparent)] shadow-xl bg-[#679294]"
          >
            Ajouter
          </button>
        </div>
      </div>

      {/* Modal d'ajout */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center text-[#679294]">
              Ajouter un rendez-vous pour {patient.nom} {patient.prenom}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Motif</label>
                <input
                  type="text"
                  value={newRdv.motif}
                  onChange={(e) => setNewRdv({...newRdv, motif: e.target.value})}
                  className="w-full p-2 border rounded"
                  placeholder="Motif du rendez-vous"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={newRdv.date}
                  onChange={(e) => setNewRdv({...newRdv, date: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Statut</label>
                <select
                  value={newRdv.status}
                  onChange={(e) => setNewRdv({...newRdv, status: e.target.value})}
                  className="w-full p-2 border rounded"
                >
                  <option value="programmé">Programmé</option>
                  <option value="terminé">Terminé</option>
                  <option value="annulé">Annulé</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={handleAddRendezvous}
                className="px-4 py-2 bg-[#679294] text-white rounded hover:bg-[#5a7d7e]"
              >
                Confirmer
              </button>
              
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Liste des rendez-vous */}
      {rendezvous.map((rdv) => (
        <div key={rdv.id} className='bg-white flex p-6 rounded-2xl shadow-lg justify-between items-start'>
          <div className='flex flex-col'>
            <h1 className='font-semibold text-[22px]'>Motif : {rdv.motif}</h1>
            <h1 className='text-gray-500 capitalize font-medium'>{rdv.patient}</h1>
            <h1 className='text-gray-500 text-sm'>{rdv.email}</h1>
          </div>
          <div className='flex flex-col'>
            <div className='flex items-center gap-1'>
              <TbCalendarFilled className='text-[#F4A261]' />
              <h1 className='text-[16px] text-gray-500 font-medium'>{rdv.date}</h1>
            </div>
            <span className={`text-sm py-1 px-3 rounded-full mt-2 ${getStatusClass(rdv.status)}`}>
              {rdv.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TabRendezvous;