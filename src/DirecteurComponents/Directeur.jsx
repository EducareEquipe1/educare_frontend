import React, { useState } from 'react';
import SidebarDirecteur from './SidebarDirecteur';
import Stat from './Stat';
import Card from './Card';
import TableConsultation from './TableConsultation';

const Directeur = () => {
  const [activeTab, setActiveTab] = useState('consultations');

  return (
    <div className="relative flex  bg-[#EFEFEF]">
        <div className=''>
      <SidebarDirecteur />

        </div>
      <div className="flex flex-col w-full ">
        {/* Header */}
        <div className="flex h-[40px] md:max-h-[60px] justify-between items-center px-4 md:px-12 shadow-md bg-gradient-to-r from-[#A9C2C3] to-[#BED1D1]">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#679294] text-l md:text-2xl font-bold">
            Statistiques
          </h1>
        </div>
        <Stat />
        
        {/* Tab Navigation */}
        <div className="flex justify-between border-b border-gray-300 bg-[#EAF0F1] m-2 rounded-[20px] shadow-[0_0_10px_2px_rgba(0,0,0,0.1)]">
          <button
            className={`px-6 py-3  text-sm font-bold focus:outline-none ${
              activeTab === 'consultations'
                ? 'text-[#679294] border-b-2 rounded-l-[20px] border-[#679294]'
                : 'text-black  hover:text-[#679294]'
            }`}
            onClick={() => setActiveTab('consultations')}
          >
            Consultations
          </button>
          <button
            className={`px-6 py-3  text-sm font-bold focus:outline-none ${
              activeTab === 'contagieuses'
                ? 'text-[#679294] border-b-2 border-[#679294]'
                : 'text-black hover:text-[#679294]'
            }`}
            onClick={() => setActiveTab('contagieuses')}
          >
            Maladies Contagieuses
          </button>
          <button
            className={`px-6 py-3  text-sm font-bold focus:outline-none ${
              activeTab === 'chroniques'
                ? 'text-[#679294] border-b-2 rounded-r-[20px] border-[#679294]'
                : 'text-black  hover:text-[#679294]'
            }`}
            onClick={() => setActiveTab('chroniques')}
          >
            Maladies Chroniques
          </button>
        </div>
        
        {/* Content based on active tab */}
        <div className="p-4">
          {activeTab === 'consultations' && (
            <div>
              <div className=" ">
                <TableConsultation/>
                 
              </div>
            </div>
          )}
          
          {activeTab === 'contagieuses' && (
            <div>
              
            </div>
          )}
          
          {activeTab === 'chroniques' && (
            <div>
              <p className="text-gray-500">No data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Directeur;