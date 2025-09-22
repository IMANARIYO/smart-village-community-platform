import React from 'react'
import ResidentsNavbar from '../components/ResidentsNavbar'

interface ResidentsLayoutProps {
  children: React.ReactNode
}

const ResidentsLayout: React.FC<ResidentsLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ResidentsNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

export default ResidentsLayout

