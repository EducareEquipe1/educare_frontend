import React, { useState, useEffect } from 'react'
import { FaSearch, FaFilter } from 'react-icons/fa';
import Onedemande from './Onedemande';

const Demandes = () => {
  const [showRdvModal, setShowRdvModal] = useState(false);
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [rdvData, setRdvData] = useState({
    nom: '',
    prenom: '',
    email: '',
    motif: '',
    date: '',
    heure: '',
    status: 'Programmé'
  });
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // Ajouté pour la recherche
  const [filteredDemandes, setFilteredDemandes] = useState([]); // Ajouté pour stocker les résultats filtrés

  useEffect(() => {
    fetchDemandes();
  }, []);

  useEffect(() => {
    // Filtrer les demandes lorsque searchTerm ou demandes changent
    if (searchTerm === '') {
      setFilteredDemandes(demandes);
    } else {
      const filtered = demandes.filter(demande =>
        demande.nomPrenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        demande.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        demande.motif.toLowerCase().includes(searchTerm.toLowerCase()) ||
        demande.date.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDemandes(filtered);
    }
  }, [searchTerm, demandes]);

  const fetchDemandes = async () => {
    try {
      const response = await fetch('https://educare-backend-l6ue.onrender.com/medecins/listedesdemandes');
      const data = await response.json();
      console.log("Demandes récupérées:", data);

      const mappedDemandes = data.map(demande => ({
        id: demande.id_rendezVous,
        motif: demande.motif,
        nomPrenom: `${demande.nom} ${demande.prenom}`,
        email: demande.email || '',
        date: demande.date_depot ? demande.date_depot.split('T')[0] : ''
      }));

      setDemandes(mappedDemandes);
      setFilteredDemandes(mappedDemandes); // Initialiser les demandes filtrées
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des demandes :", error);
      setLoading(false);
    }
  };

  const handleProgrammerClick = (demande) => {
    setSelectedDemande(demande);
    const [nom, prenom] = demande.nomPrenom.split(' ');
    setRdvData({
      nom: nom || '',
      prenom: prenom || '',
      email: demande.email || '',
      motif: demande.motif,
      date: '',
      heure: '',
      status: 'Programmé'
    });
    setShowRdvModal(true);
  };

  const handleRefuserClick = async (demandeId) => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir refuser cette demande ?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem('token');
      console.log("Token:", token);
      console.log("ID de la demande à refuser:", demandeId);

      const response = await fetch(`https://educare-backend-l6ue.onrender.com/medecins/refuserdv/${demandeId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Réponse serveur :", response.status, errorText);
        throw new Error("Échec du refus de la demande.");
      }

      setDemandes(demandes.filter(d => d.id !== demandeId));
      alert("Demande refusée avec succès.");
    } catch (error) {
      console.error("Erreur lors du refus de la demande :", error);
      alert("Une erreur est survenue lors du refus de la demande.");
    }
  };

  const handleAddRdv = async () => {
    if (!selectedDemande) return;

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`https://educare-backend-l6ue.onrender.com/medecins/programmerdv/${selectedDemande.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: rdvData.email,
          nom: rdvData.nom,
          prenom: rdvData.prenom,
          date_rdv: rdvData.date,
          heure_rdv: rdvData.heure,
          motif: rdvData.motif
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la programmation du rendez-vous');
      }

      console.log('Rendez-vous programmé avec succès !');

      setDemandes(demandes.filter(d => d.id !== selectedDemande.id));
      setShowRdvModal(false);
      setSelectedDemande(null);
      setRdvData({
        nom: '',
        prenom: '',
        email: '',
        motif: '',
        date: '',
        heure: '',
        status: 'Programmé'
      });
    } catch (error) {
      console.error('Erreur lors de la programmation:', error);
      alert('Erreur lors de la programmation du rendez-vous.');
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='flex justify-end items-center gap-2'>
        <div className="flex items-center border border-gray-300 rounded-full bg-gray-100 px-2 py-1">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full text-[14px] focus:outline-none bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center mt-10">Chargement des demandes...</div>
      ) : filteredDemandes.length === 0 ? (
        <div className="flex justify-center mt-10">
          {searchTerm ? "Aucune demande ne correspond à votre recherche." : "Aucune demande trouvée."}
        </div>
      ) : (
        filteredDemandes.map(demande => (
          <Onedemande
            key={demande.id}
            demande={demande}
            onProgrammerClick={handleProgrammerClick}
            onRefuserClick={handleRefuserClick}
          />
        ))
      )}

      {/* Modal pour programmer le RDV (inchangé) */}
      {showRdvModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center text-[#679294] justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 flex justify-center">
              Programmer un rendez-vous
            </h2>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    name="nom"
                    value={rdvData.nom}
                    onChange={(e) => setRdvData({ ...rdvData, nom: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="Nom"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="prenom"
                    value={rdvData.prenom}
                    onChange={(e) => setRdvData({ ...rdvData, prenom: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="Prénom"
                  />
                </div>
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={rdvData.email}
                  onChange={(e) => setRdvData({ ...rdvData, email: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="Email"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="motif"
                  value={rdvData.motif}
                  onChange={(e) => setRdvData({ ...rdvData, motif: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="Motif"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="date"
                    name="date"
                    value={rdvData.date}
                    onChange={(e) => setRdvData({ ...rdvData, date: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <input
                    type="time"
                    name="heure"
                    value={rdvData.heure}
                    onChange={(e) => setRdvData({ ...rdvData, heure: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <div>
                <select
                  name="status"
                  value={rdvData.status}
                  onChange={(e) => setRdvData({ ...rdvData, status: e.target.value })}
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
                disabled={!rdvData.nom || !rdvData.prenom || !rdvData.email || !rdvData.motif || !rdvData.date || !rdvData.heure}
              >
                Programmer
              </button>

              <button
                onClick={() => setShowRdvModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Demandes;