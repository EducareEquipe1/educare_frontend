import {React , useState} from 'react'
import SideBar from '../medicalcomponents/SideBar'

const RendezVous = () => {
    const [activeTab, setActiveTab] = useState('utilisateur');
  
  return (
    <div className='h-screen flex flex-col items-start  bg-[#EFEFEF] border border-[#CACACA] shadow-md  ml-[150px]'>
    <SideBar />
    <div className='flex flex-col w-full'>

    <div className="flex  h-[40px] md:max-h-[60px] justify-between items-center px-4 md:px-12 shadow-md bg-gradient-to-r from-[#A9C2C3] to-[#BED1D1]">
          <h1 className="ml-[130px] text-transparent bg-clip-text bg-gradient-to-r from-[#000000] to-[#679294] text-l md:text-2xl font-bold">
            Rendez-vous
          </h1>
        </div>

    </div>
    {/* Tabs */}
    <div className="mt-8 mx-8 ">
          <ul className="flex gap-6 text-[15px] relative">
            <li>
              <button
                onClick={() => setActiveTab('utilisateur')}
                className={`transition-all duration-300 pb-2 border-b-2 ${activeTab === 'utilisateur' ? 'border-[#F4A261] font-semibold' : 'border-transparent hover:border-[#F4A261]'}`}
              >
                Utilisateur
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('dossiers')}
                className={`transition-all duration-300 pb-2 border-b-2 ${activeTab === 'dossiers' ? 'border-[#F4A261] font-semibold' : 'border-transparent hover:border-[#F4A261]'}`}
              >
                Dossiers Medicaux
              </button>
            </li>
          </ul>
          <div className="h-[1.5px]   bg-[rgba(146,154,155,0.35)] mt-[-2px]"></div>
        </div>
    
</div>
  )
}

export default RendezVous
