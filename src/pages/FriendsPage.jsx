import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const FriendsPage = () => {
  const user = useSelector((state) => state.user.user)
  const location = useLocation()
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-50">
        {/* Main friends content here */}
        Friends List Page
      </div>
    </div>
  )
}

export default FriendsPage
