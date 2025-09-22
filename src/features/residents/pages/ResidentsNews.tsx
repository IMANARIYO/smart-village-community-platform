import React from 'react'
import ResidentsLayout from '../layouts/ResidentsLayout'

const ResidentsNews: React.FC = () => {
  return (
    <ResidentsLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community News</h1>
          <p className="text-gray-600">Stay updated with the latest news from your community</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Latest News</h2>
          <p className="text-gray-600">News content will go here...</p>
        </div>
      </div>
    </ResidentsLayout>
  )
}

export default ResidentsNews
