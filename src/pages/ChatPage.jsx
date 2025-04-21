import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const ChatPage = () => {
  const user = useSelector((state) => state.user.user)
  const location = useLocation()
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return <div>Chat Page (Home)</div>
}

export default ChatPage
