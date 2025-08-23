'use client'

import dynamic from 'next/dynamic'

// Composant dashboard talent qui se charge dynamiquement
const DashboardTalent = dynamic(() => import('./DashboardTalent'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement du dashboard talent...</p>
      </div>
    </div>
  )
})

export default function TalentDashboardPage() {
  return <DashboardTalent />
}
