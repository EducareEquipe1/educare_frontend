// src/components/Dashboard.jsx
import React from 'react';
import SideBar from './SideBar';
import PieChartCom from '../ChartsComponents/PieChart';
import StackedBarComponent from '../ChartsComponents/stackedBar';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const apiUrl = "https://educare-backend-l6ue.onrender.com/directeur/getConsultationsParCategorieAnnuelle/2025";
  const title = "Répartition des patients par roles";
  const navigate = useNavigate();


  return (
    <div className="flex h-screen bg-[#EFEFEF] overflow-y-auto">
      {/* Sidebar */}
      <div className="z-11 w-[100px] bg-white shadow-md fixed top-0 left-0 bottom-0 z-10">
        <SideBar />
      </div>

      {/* Main content */}
      <div className="flex flex-col w-full ml-[100px]">
        {/* Header */}
        <div className="h-[60px] ml-[37px] flex items-center px-8 shadow bg-gradient-to-r from-[#A9C2C3] to-[#BED1D1] z-10">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#679294] text-xl md:text-2xl font-bold">
            Patients
          </h1>
        </div>

        {/* Greeting Message */}
       <div
  className="relative ml-[120px] mt-4 px-8 py-4 bg-gradient-to-r from-[#679294] to-[#CFE3E4] shadow-md"
  style={{
    width: '985px',
    height: '177px',
    borderRadius: '10px',
  }}
>
  {/* Image in top-right corner */}
  <img
    src="/medecin1.png"
    alt="Doctor illustration"
    className="absolute -top-4 right-4 h-[200px] w-[183px] object-contain"
  />

  {/* Text and button */}
  <p className="text-xl font-semibold text-white">Bonjour Docteur!</p>
  <p className="text-white mt-[5px]">
    Prêt à prendre soin de vos patients aujourd'hui ?
  </p>
  <button   onClick={() => navigate('/user')} className="mt-[30px] w-[168px] h-[28px] bg-white text-black rounded-[8px] font-medium shadow hover:bg-gray-100 transition">
    Consulter utilisateurs
  </button>
</div>

        {/* Charts */}
        <div className='mt-[20px] ml-[120px] flex flex-row gap-10'>
          {/* Pie Chart */}
          <div className='w-[315px] h-[180px]'>
            <PieChartCom apiUrl={apiUrl} title={title} />
          </div>

          {/* Stacked Bar Chart */}
          <div className=' w-[540px] h-[150px]'>
            <StackedBarComponent
              dataUrl="https://educare-backend-l6ue.onrender.com/medecins/getMedicamentsPlusPrescrits"
              title="Médicaments les plus Prescrits"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
