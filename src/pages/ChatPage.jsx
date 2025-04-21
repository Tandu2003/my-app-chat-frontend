import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { fetchChats } from '../slices/chatSlice'
import ChatListPanel from '../components/ChatListPanel'
import ChatMessagesPanel from '../components/ChatMessagesPanel'
import { apiSearchUsers } from '../api/userApi'
import { apiCreateChat } from '../api/chatApi'

const ChatPage = () => {
  const user = useSelector((state) => state.user.user)
  const chats = useSelector((state) => state.chat.chats)
  const chatLoading = useSelector((state) => state.chat.loading)
  const location = useLocation()
  const dispatch = useDispatch()
  const [selectedChatId, setSelectedChatId] = useState(null)
  const [showMessagesMobile, setShowMessagesMobile] = useState(false)
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState(null)
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState(null)

  useEffect(() => {
    if (user) {
      dispatch(fetchChats())
    }
  }, [user, dispatch])

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId)
    if (window.innerWidth < 768) setShowMessagesMobile(true)
  }

  const handleBackToChats = () => {
    setShowMessagesMobile(false)
  }

  const handleSearch = async (value) => {
    setSearchError(null)
    setSearchResult(null)
    if (!value) return
    setSearchLoading(true)
    try {
      // Kiểm tra nếu value là email
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      const params = isEmail ? { email: value } : { name: value }
      const res = await apiSearchUsers(params)
      if (isEmail) {
        setSearchResult(res.user)
      } else {
        setSearchResult(null)
        // Có thể xử lý res.users nếu muốn hiển thị danh sách bạn bè theo tên
        // Ví dụ: setSearchResult(res.users)
      }
    } catch (err) {
      setSearchResult(null)
      setSearchError(
        err?.response?.data?.message ||
          (typeof err === 'string' ? err : 'Không tìm thấy người dùng'),
      )
    } finally {
      setSearchLoading(false)
    }
  }

  const handleSelectSearchUser = async (userObj) => {
    if (!userObj || !user) return
    const existingChat = chats.find(
      (chat) =>
        chat.participants.some((u) => u._id === userObj._id) &&
        chat.participants.some((u) => u._id === user._id),
    )
    if (existingChat) {
      setSelectedChatId(existingChat._id)
      setSearch('')
      setSearchResult(null)
      if (window.innerWidth < 768) setShowMessagesMobile(true)
    } else {
      try {
        // Sử dụng apiCreateChat đã import ở trên
        const res = await apiCreateChat(userObj._id)
        dispatch(fetchChats())
        setSelectedChatId(res.chat._id)
        setSearch('')
        setSearchResult(null)
        if (window.innerWidth < 768) setShowMessagesMobile(true)
      } catch (err) {
        setSearchError(err?.message || 'Không thể tạo cuộc trò chuyện mới')
      }
    }
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1">
        <ChatListPanel
          chats={chats}
          chatLoading={chatLoading}
          user={user}
          selectedChatId={selectedChatId}
          onSelectChat={handleSelectChat}
          showMessagesMobile={showMessagesMobile}
          search={search}
          setSearch={setSearch}
          searchResult={searchResult}
          searchLoading={searchLoading}
          searchError={searchError}
          onSearch={handleSearch}
          onSelectSearchUser={handleSelectSearchUser}
        />
        <ChatMessagesPanel
          selectedChatId={selectedChatId}
          showMessagesMobile={showMessagesMobile}
          onBack={handleBackToChats}
        />
      </div>
    </div>
  )
}

export default ChatPage
