import React from 'react'
import Card from './Card'

const Stat = () => {
  return (
    <div className='flex m-4 p-4 rounded-[10px] min-h-[120px] bg-gradient-to-l from-[#A9C2C3]/50 to-[#679291]/90 flex flex-col gap-2 justify- items-end shadow-xl'>
        <div className='mb-2'>
            <button className='flex text-[#5D5F60] bg-[#FFFEFE] rounded-[10px] shadow-xl p-1'>Exporter</button>
        </div>
        <div className=' w-full flex gap-2 justify-between  items-center '>
            <Card title='Total Patients' number='4,671'/>
            <Card title='Consultations' number='671'/>
            <Card title='Cas Contagieux' number='2,050'/>
            <Card title='Annee Academique' number='2014-2015'/>
            </div>
        </div>
  )
}

export default Stat
