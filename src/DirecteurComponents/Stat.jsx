import React, { useEffect, useState } from 'react'
import Card from './Card'

const Stat = () => {
  const [patientsCount, setPatientsCount] = useState(0)
  const [consultationsCount, setConsultationsCount] = useState(0)
  const [casContagieuxCount, setCasContagieuxCount] = useState(0)

  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }

        const fetchWithCheck = async (url) => {
          const res = await fetch(url, { headers })
          if (!res.ok) {
            const errorText = await res.text()
            throw new Error(`Erreur ${res.status} sur ${url}: ${errorText}`)
          }
          return res.json()
        }

        const [patientsData, consultationsData, casData] = await Promise.all([
          fetchWithCheck('https://educare-backend-l6ue.onrender.com/directeur/patientCount'),
          fetchWithCheck('https://educare-backend-l6ue.onrender.com/directeur/countConsultations'),
          fetchWithCheck('https://educare-backend-l6ue.onrender.com/directeur/casContagieuse')
        ])

        // ✅ Utilise bien .total pour chaque réponse
        setPatientsCount(patientsData.total || 0)
        setConsultationsCount(consultationsData.total || 0)
        setCasContagieuxCount(casData.total || 0)

      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error)
      }
    }

    if (token) {
      fetchStats()
    } else {
      console.warn("Token d'authentification manquant.")
    }
  }, [token])

  return (
    <div className='flex m-4 p-4 rounded-[10px] min-h-[120px] bg-gradient-to-l from-[#A9C2C3]/50 to-[#679291]/90 flex flex-col gap-2 items-end shadow-xl'>
      <div className='w-full flex gap-2 justify-between items-center'>
        <Card title='Total Patients' number={patientsCount.toString()} />
        <Card title='Consultations' number={consultationsCount.toString()} />
        <Card title='Cas Contagieux' number={casContagieuxCount.toString()} />
        <Card title='Annee Academique' number='2014-2015' />
      </div>
    </div>
  )
}

export default Stat
