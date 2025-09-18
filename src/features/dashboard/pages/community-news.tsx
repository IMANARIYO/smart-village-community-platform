"use client"

import { useState } from "react"
import { Newspaper, MessageCircle, Heart, Share2, Plus } from "lucide-react"

const CommunityNews = () => {
  const [posts] = useState([
    {
      id: 1,
      title: "Village Water System Maintenance",
      content:
        "The water system will undergo maintenance this Saturday from 8 AM to 2 PM. Please store water in advance.",
      author: "Village Administrator",
      date: "2024-12-20",
      likes: 23,
      comments: 5,
      image: "/water-maintenance.jpg",
    },
    {
      id: 2,
      title: "Community Meeting - December 25th",
      content: "Join us for our monthly community meeting to discuss upcoming projects and budget allocation.",
      author: "Community Leader",
      date: "2024-12-19",
      likes: 45,
      comments: 12,
      image: null,
    },
    {
      id: 3,
      title: "New Health Worker Introduction",
      content:
        "We are pleased to welcome Dr. Sarah Mukamana as our new community health worker. She will be available every Tuesday and Thursday.",
      author: "Health Committee",
      date: "2024-12-18",
      likes: 67,
      comments: 8,
      image: "/health-worker-introduction.jpg",
    },
  ])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Community News Feed</h2>
          <p className="text-gray-600">Stay updated with village announcements and updates</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          <span>New Post</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-3">
            <Newspaper className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="text-2xl font-bold text-blue-900">24</h3>
              <p className="text-sm text-blue-700">Total Posts</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center space-x-3">
            <Heart className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="text-2xl font-bold text-green-900">135</h3>
              <p className="text-sm text-green-700">Total Likes</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-8 h-8 text-purple-600" />
            <div>
              <h3 className="text-2xl font-bold text-purple-900">25</h3>
              <p className="text-sm text-purple-700">Comments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{post.author}</h3>
                  <span className="text-gray-500 text-sm">•</span>
                  <span className="text-gray-500 text-sm">{post.date}</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h4>
                <p className="text-gray-700 mb-4">{post.content}</p>

                {post.image && (
                  <div className="mb-4">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt="Post image"
                      className="w-full max-w-md h-48 object-cover rounded-lg"
                    />
                  </div>
                )}

                <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommunityNews
