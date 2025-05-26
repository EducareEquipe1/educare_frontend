import { React, useState, useEffect } from 'react';
import { PiListDashesFill } from "react-icons/pi";
import { IoMdCalendar, IoMdCreate } from "react-icons/io";
import { FaSearch, FaFilter, FaPlus, FaTrash } from 'react-icons/fa';
import CalendarR from './CalendarR';
import { format } from 'date-fns';

const RendezVouscomponent = () => {
  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800'; 
    switch (status.toLowerCase().trim()) {
      case 'terminé':
        return 'bg-green-100 text-green-800';
      case 'annulé':
        return 'bg-red-100 text-red-800';
      case 'programmé':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const [activeTab, setActiveTab] = useState('list');
  const [query, setQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newRdv, setNewRdv] = useState({
    nom: '',
    prenom: '',
    email: '',
    motif: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    heure: '09:00',
    statut: 'Programmé'
  });
  const [editingId, setEditingId] = useState(null);
  const [rendezVous, setRendezVous] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patients, setPatients] = useState([]);
  const [patientSearch, setPatientSearch] = useState('');
  const [showPatientList, setShowPatientList] = useState(false);

  // Charger les rendez-vous et les patients
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Charger les rendez-vous
        const rdvResponse = await fetch('https://educare-backend-l6ue.onrender.com/medecins/listedesrendezvous', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!rdvResponse.ok) throw new Error('Failed to fetch rendezvous');
        
        const rdvData = await rdvResponse.json();
        const rendezvousWithIds = rdvData.map((rdv, index) => ({
          ...rdv,
          id: index + 1
        }));
        setRendezVous(rendezvousWithIds);

        // Charger les patients
        const patientsResponse = await fetch('https://educare-backend-l6ue.onrender.com/admin/get-all-patients/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!patientsResponse.ok) throw new Error('Failed to fetch patients');
        
        const patientsData = await patientsResponse.json();
        setPatients(patientsData);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => setQuery(event.target.value);

  const handleAddRdv = async () => {
    try {
      const token = localStorage.getItem('token');
      let response;
  
      if (editingId) {
        const rdvToEdit = rendezVous.find(rdv => rdv.id === editingId);
  
        if (!rdvToEdit) {
          alert("Rendez-vous introuvable pour modification.");
          return;
        }
  
        if (rdvToEdit.statut?.toLowerCase() !== 'programmé') {
          alert('Seuls les rendez-vous avec le statut "Programmé" peuvent être modifiés.');
          return;
        }
  
        const rdvData = {
          date_rdv: newRdv.date,
          heure_rdv: newRdv.heure,
          motif: newRdv.motif,
          statut: newRdv.statut.toLowerCase().trim()
        };
  
        response = await fetch(`https://educare-backend-l6ue.onrender.com/medecins/modifierrdv/${rdvToEdit.id_rendezVous}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(rdvData)
        });
  
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Échec de la modification: ${errorMessage}`);
        }
  
        const updatedRdv = await response.json();
        setRendezVous(rendezVous.map(rdv =>
          rdv.id === editingId ? { ...rdv, ...updatedRdv } : rdv
        ));
      } else {
        const rdvData = {
          email: newRdv.email,
          nom: newRdv.nom,
          prenom: newRdv.prenom,
          date_rdv: newRdv.date,
          heure_rdv: newRdv.heure,
          motif: newRdv.motif,
          statut: 'Programmé'
        };
  
        response = await fetch('https://educare-backend-l6ue.onrender.com/medecins/programmerrdvdirect', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(rdvData)
        });
  
        if (!response.ok) throw new Error('Échec de l\'ajout du rendez-vous');
  
        const addedRdv = await response.json();
        const newId = Math.max(...rendezVous.map(rdv => rdv.id), 0) + 1;
        setRendezVous([...rendezVous, { ...addedRdv, id: newId }]);
      }
  
      setShowAddModal(false);
      setNewRdv({
        nom: '',
        prenom: '',
        email: '',
        motif: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        heure: '09:00',
        statut: 'Programmé'
      });
    } catch (err) {
      console.error('Error:', err);
      alert(`L'opération a échoué: ${err.message}`);
    }
  };

  const handleDeleteRdv = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://educare-backend-l6ue.onrender.com/medecins/rendezvous/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to delete rendezvous');
      setRendezVous(rendezVous.filter(rdv => rdv.id !== id));
    } catch (err) {
      console.error('Error:', err);
      alert(`Delete failed: ${err.message}`);
    }
  };

  const handleEditRdv = (rdv) => {
    if (rdv.statut?.toLowerCase() !== 'programmé') {
      alert('Seuls les rendez-vous avec le statut "Programmé" peuvent être modifiés.');
      return;
    }
  
    setNewRdv({
      ...rdv, // Conserve toutes les propriétés existantes
      motif: rdv.motif || '',
      date: rdv.date.includes('T') ? rdv.date.split('T')[0] : rdv.date,
      heure: rdv.heure ? rdv.heure.substring(0, 5) : '09:00',
      statut: rdv.statut || 'Programmé'
    });
    setEditingId(rdv.id);
    setShowAddModal(true);
    setPatientSearch(`${rdv.nom} ${rdv.prenom}`);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handlePatientSelect = (patient) => {
    setNewRdv({
      ...newRdv,
      nom: patient.nom,
      prenom: patient.prenom,
      email: patient.email
    });
    setPatientSearch(`${patient.nom} ${patient.prenom}`);
    setShowPatientList(false);
  };

  const filteredPatients = patients.filter(patient => 
    `${patient.nom} ${patient.prenom}`.toLowerCase().includes(patientSearch.toLowerCase())
  );

  const filteredRendezVous = rendezVous.filter(rdv => 
    (rdv.nom && rdv.nom.toLowerCase().includes(query.toLowerCase())) ||
    (rdv.prenom && rdv.prenom.toLowerCase().includes(query.toLowerCase())) ||
    (rdv.email && rdv.email.toLowerCase().includes(query.toLowerCase())) ||
    (rdv.motif && rdv.motif.toLowerCase().includes(query.toLowerCase())) ||
    (rdv.date && rdv.date.includes(query)) ||
    (rdv.heure && rdv.heure.includes(query)) ||
    (rdv.statut && rdv.statut.toLowerCase().includes(query.toLowerCase()))
  );

  if (loading) return <div className="flex justify-center items-center h-64">Chargement en cours...</div>;
  if (error) return <div className="flex justify-center items-center h-64 text-red-500">Erreur: {error}</div>;

  return (
    <div className="flex w-full flex-col">
      <div className="flex sticky top-0 z-10 justify-between w-full bg-white p-2">
        <div className='flex mb-2 gap-2 text-xl'>
          <button 
            onClick={() => setActiveTab('list')}
            className={`hover:text-[#679294] hover:rounded hover:shadow-lg hover:p-1 
            ${activeTab === 'list' ? 'text-[#679294] rounded shadow-lg p-1' : ''}`}>
            <PiListDashesFill />
          </button>
          <button 
            onClick={() => setActiveTab('calendar')}
            className={`hover:text-[#679294] hover:rounded hover:shadow-lg hover:p-1 
            ${activeTab === 'calendar' ? 'text-[#679294] rounded shadow-lg p-1' : ''}`}>
            <IoMdCalendar />
          </button>
        </div>
        
        <div className="flex mb-3 justify-center items-center gap-2">
          <div className="flex items-center border border-gray-300 rounded-[10px] bg-gray-100 px-2 py-1">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={query}
              onChange={handleChange}
              className="w-full text-[14px] focus:outline-none bg-transparent"
            />
          </div>

          
          
          <button 
            onClick={() => {
              setShowAddModal(true);
              setEditingId(null);
              setNewRdv({
                nom: '',
                prenom: '',
                email: '',
                motif: '',
                date: format(activeTab === 'calendar' ? selectedDate : new Date(), 'yyyy-MM-dd'),
                heure: '09:00',
                statut: 'Programmé'
              });
              setPatientSearch('');
            }}
            className="flex items-center justify-center text-white py-1 px-4 rounded-[8px] hover:bg-[linear-gradient(to_left,#2E3D40,transparent)] shadow-xl bg-[#679294]"
          >
            <FaPlus className="mr-1" /> Ajouter
          </button>
        </div>
      </div>

      {activeTab === 'list' && (
        <div className="flex flex-col">
          <div className="w-full">
            <div className="overflow-hidden max-h-[350px] overflow-y-auto rounded-lg w-full">
              <table className="w-full overflow-y-auto max-h-[calc(100vh-200px)] divide-y divide-gray-300">
                <thead>
                  <tr className="bg-white w-full sticky top-0 z-10">
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-500">Nom</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500">Motif</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500">Date</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500">Heure</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500">Statut</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredRendezVous.map((rdv) => (
                    <tr key={rdv.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm capitalize">{rdv.nom} {rdv.prenom}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">{rdv.motif || 'Non spécifié'}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">{new Date(rdv.date).toLocaleDateString('fr-FR')}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">{rdv.heure ? rdv.heure.substring(0, 5) : ''}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(rdv.statut)}`}>
                          {rdv.statut}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm flex gap-2">
                        <button 
                          onClick={() => handleEditRdv(rdv)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Modifier"
                        >
                          <IoMdCreate />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'calendar' && (
        <div className="flex flex-col">
          <CalendarR 
            rendezVous={filteredRendezVous}
            onEdit={handleEditRdv}
            onDateSelect={handleDateSelect}
          />
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center text-[#679294] justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 flex justify-center">
              {editingId ? 'Modifier Rendez-vous' : 'Ajouter un nouveau rendez-vous'}
            </h2>
            
            <div className="space-y-3">
              {editingId ? (
                <>
                  <div>
                    <input
                      type="text"
                      value={newRdv.nom}
                      readOnly
                      className="w-full p-2 border rounded bg-gray-100"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={newRdv.prenom}
                      readOnly
                      className="w-full p-2 border rounded bg-gray-100"
                    />
                  </div>
                </>
              ) : (
                <div className="relative">
                  <input
                    type="text"
                    value={patientSearch}
                    onChange={(e) => {
                      setPatientSearch(e.target.value);
                      setShowPatientList(true);
                    }}
                    onFocus={() => setShowPatientList(true)}
                    className="w-full p-2 border rounded"
                    placeholder="Rechercher un patient..."
                  />
                  {showPatientList && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {filteredPatients.length > 0 ? (
                        filteredPatients.map((patient) => (
                          <div
                            key={patient.email}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handlePatientSelect(patient)}
                          >
                            {patient.nom} {patient.prenom} ({patient.email})
                          </div>
                        ))
                      ) : (
                        <div className="p-2 text-gray-500">Aucun patient trouvé</div>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              <div>
                <input
                  type="text"
                  name="motif"
                  value={newRdv.motif}
                  onChange={(e) => setNewRdv({...newRdv, motif: e.target.value})}
                  className="w-full p-2 border rounded"
                  placeholder="Motif"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="date"
                    name="date"
                    value={newRdv.date}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    onChange={(e) => setNewRdv({...newRdv, date: e.target.value})}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <input
                    type="time"
                    name="heure"
                    value={newRdv.heure}
                    min={newRdv.date === format(new Date(), 'yyyy-MM-dd') ? format(new Date(), 'HH:mm') : '00:00'}
                    onChange={(e) => setNewRdv({...newRdv, heure: e.target.value})}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
              
              <div>
                <select
                  name="statut"
                  value={newRdv.statut}
                  onChange={(e) => setNewRdv({...newRdv, statut: e.target.value})}
                  className="w-full p-2 border rounded"
                >
                  <option value="Programmé">Programmé</option>
                  <option value="Terminé">Terminé</option>
                  <option value="Annulé">Annulé</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-col justify-center gap-2 mt-6">
              <button
                onClick={handleAddRdv}
                className="px-4 py-2 bg-[#679294] text-white rounded hover:bg-[#5a7d7e]"
                disabled={!newRdv.nom || !newRdv.prenom || !newRdv.email}
              >
                {editingId ? 'Mettre à jour' : 'Ajouter'}
              </button>

              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowPatientList(false);
                }}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RendezVouscomponent;