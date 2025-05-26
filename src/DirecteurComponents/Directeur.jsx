import React, { useState, useRef } from 'react';
import SidebarDirecteur from './SidebarDirecteur';
import Stat from './Stat';
import TableConsultation from './TableConsultation';
import TableMaladies from './TableMaladies';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import logoImage from './logo.png';

const Directeur = () => {
  const [activeTab, setActiveTab] = useState('consultations');
  const [selectedYear, setSelectedYear] = useState('2024-2025');
  const tableConsultationRef = useRef();
  const tableMaladiesRef = useRef();

  // Generate year pairs from 2014-2015 to 2024-2025
  const generateYearPairs = () => {
    const years = [];
    for (let i = 2014; i <= 2024; i++) {
      years.push(`${i}-${i + 1}`);
    }
    return years;
  };

  const yearPairs = generateYearPairs();

  // Données des consultations
  const consultationsData = [
    { mois: 'Septembre', total: 42, etudiants: 35, enseignants: 5, ats: 2, jourDePointe: 'Lundi' },
    { mois: 'Octobre', total: 58, etudiants: 48, enseignants: 7, ats: 3, jourDePointe: 'Mardi' },
    { mois: 'Novembre', total: 65, etudiants: 52, enseignants: 9, ats: 4, jourDePointe: 'Mercredi' },
    { mois: 'Décembre', total: 78, etudiants: 65, enseignants: 10, ats: 3, jourDePointe: 'Lundi' },
    { mois: 'Janvier', total: 45, etudiants: 38, enseignants: 5, ats: 2, jourDePointe: 'Jeudi' },
    { mois: 'Février', total: 52, etudiants: 42, enseignants: 8, ats: 2, jourDePointe: 'Mardi' },
    { mois: 'Mars', total: 48, etudiants: 35, enseignants: 9, ats: 4, jourDePointe: 'Mercredi' },
    { mois: 'Avril', total: 39, etudiants: 30, enseignants: 6, ats: 3, jourDePointe: 'Lundi' },
  ];

  // Données des maladies
  const maladiesData = [
    { maladie: 'Orippe', cas: 87, categorie: 'Respiratoire', males: 42, females: 45, statut: 'Étudiant', picMensuel: 'Déc', severite: 'Élevé' },
    { maladie: 'Gastro-entérite', cas: 46, categorie: 'Digestif', males: 22, females: 24, statut: 'Étudiant', picMensuel: 'Nov', severite: 'Moyen' },
    { maladie: 'Varicelle', cas: 23, categorie: 'Cutané', males: 10, females: 13, statut: 'Étudiant', picMensuel: 'Oct', severite: 'Faible' },
    { maladie: 'Conjonctivite', cas: 19, categorie: 'Oculaire', males: 8, females: 11, statut: 'Enseignant', picMensuel: 'Sep', severite: 'Faible' },
    { maladie: 'Angine', cas: 15, categorie: 'Respiratoire', males: 7, females: 8, statut: 'ATS', picMensuel: 'Jan', severite: 'Faible' },
  ];

  const handleExportAll = () => {
    const doc = new jsPDF();
    
    // Entête
    doc.addImage(logoImage, 'PNG', 160, 10, 30, 15);
    const now = new Date();
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Généré le: ${now.toLocaleDateString()} à ${now.toLocaleTimeString()}`, 14, 25);
    doc.setFontSize(18);
    doc.text(`Rapport Complet - Statistiques Médicales (${selectedYear})`, 14, 15);

    // Récupération des données filtrées
    const consultations = tableConsultationRef.current?.getFilteredData() || consultationsData;
    const maladies = tableMaladiesRef.current?.getFilteredData() || maladiesData;

    // Tableau des consultations
    doc.setFontSize(16);
    doc.text('Détails des Consultations', 14, 35);
    autoTable(doc, {
      startY: 45,
      head: [['Mois', 'Total', 'Étudiants', 'Enseignants', 'ATS', 'Jour de Pointe']],
      body: consultations.map(c => [
        c.mois,
        c.total.toString(),
        c.etudiants.toString(),
        c.enseignants?.toString() || '',
        c.ats.toString(),
        c.jourDePointe
      ]),
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: { fillColor: [234, 240, 241] },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    });

    // Tableau des maladies
    doc.setFontSize(16);
    doc.text('Détails des Maladies Contagieuses', 14, doc.lastAutoTable.finalY + 15);
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 25,
      head: [['Maladie', 'Cas', 'Catégorie', 'Males', 'Females', 'Statut', 'Pic Mensuel', 'Sévérité']],
      body: maladies.map(m => [
        m.maladie,
        m.cas.toString(),
        m.categorie,
        m.males.toString(),
        m.females.toString(),
        m.statut,
        m.picMensuel,
        m.severite
      ]),
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: { fillColor: [234, 240, 241] },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    });

    // Statistiques
    const totalConsultations = consultations.reduce((sum, c) => sum + c.total, 0);
    const totalMaladies = maladies.reduce((sum, m) => sum + m.cas, 0);
    const totalMales = maladies.reduce((sum, m) => sum + m.males, 0);
    const totalFemales = maladies.reduce((sum, m) => sum + m.females, 0);

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 15,
      body: [
        ['Total consultations', totalConsultations],
        ['Total maladies', totalMaladies],
        ['Répartition par genre', `${totalMales} males / ${totalFemales} females`],
        ['Dernière mise à jour', now.toLocaleString()]
      ],
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: [234, 240, 241] }
    });

    doc.save(`rapport_medical_complet_${selectedYear}.pdf`);
  };

  return (
    <div className="relative flex bg-[#EFEFEF]">
      <SidebarDirecteur />
      <div className="flex flex-col w-full">
        <div className="flex h-[40px] md:max-h-[60px] justify-between items-center px-4 md:px-12 shadow-md bg-gradient-to-r from-[#A9C2C3] to-[#BED1D1]">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#679294] text-l md:text-2xl font-bold">
            Statistiques
          </h1>
        </div>
        
        <div className='justify-end flex mt-4 mr-5 gap-4 items-center'>
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className='shadow-xl text-[#5D5F60] rounded-[10px] px-2 py-1 bg-white'
          >
            {yearPairs.map((year) => (
              <option key={year} value={year}>
                Année {year}
              </option>
            ))}
          </select>
          <button 
            onClick={handleExportAll}
            className='flex px-4 hover:bg-gray-100 text-[#5D5F60] bg-[#FFFEFE] rounded-[10px] shadow-xl p-1'
          >
            Exporter tout
          </button>
        </div>

        <Stat />
        
        <div className="flex justify-between border-b border-gray-300 bg-[#EAF0F1] m-2 rounded-[20px] shadow-[0_0_10px_2px_rgba(0,0,0,0.1)]">
          <button
            className={`px-6 py-3 text-sm font-bold focus:outline-none ${
              activeTab === 'consultations' ? 'text-[#679294] border-b-2 rounded-l-[20px] border-[#679294]' : 'text-black hover:text-[#679294]'
            }`}
            onClick={() => setActiveTab('consultations')}
          >
            Consultations
          </button>
          <button
            className={`px-6 py-3 text-sm font-bold focus:outline-none ${
              activeTab === 'contagieuses' ? 'text-[#679294] border-b-2 border-[#679294]' : 'text-black hover:text-[#679294]'
            }`}
            onClick={() => setActiveTab('contagieuses')}
          >
            Maladies Contagieuses
          </button>
          <button
            className={`px-6 py-3 text-sm font-bold focus:outline-none ${
              activeTab === 'chroniques' ? 'text-[#679294] border-b-2 rounded-r-[20px] border-[#679294]' : 'text-black hover:text-[#679294]'
            }`}
            onClick={() => setActiveTab('chroniques')}
          >
            Maladies Chroniques
          </button>
        </div>
        
        <div className="p-4">
          {activeTab === 'consultations' && (
            <TableConsultation ref={tableConsultationRef} consultations={consultationsData} />
          )}
          {activeTab === 'contagieuses' && (
            <TableMaladies ref={tableMaladiesRef} maladies={maladiesData} />
          )}
          {activeTab === 'chroniques' && (
            <p className="text-gray-500">Aucune donnée disponible</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Directeur;