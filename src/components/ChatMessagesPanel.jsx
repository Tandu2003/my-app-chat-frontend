import React, { useRef, useEffect, useState } from 'react'
import MessageItem from './MessageItem'

const TIME_GAP_MINUTES = 10 // Ngưỡng thời gian (phút) để hiển thị dòng thời gian

function shouldShowTimeDivider(prevMsg, currMsg) {
  if (!prevMsg || !currMsg) return false
  const prev = new Date(prevMsg.createdAt)
  const curr = new Date(currMsg.createdAt)
  return (curr - prev) / (60 * 1000) > TIME_GAP_MINUTES
}

const ChatMessagesPanel = ({
  selectedChatId,
  showMessagesMobile,
  onBack,
  messages = [],
  loading,
  error,
  user,
  otherUser,
}) => {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  // Scroll xuống cuối khi có tin nhắn mới
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Xử lý gửi tin nhắn (chưa thực hiện gửi thực tế)
  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    // TODO: Gửi tin nhắn qua API hoặc socket
    setInput('')
  }

  return (
    <div
      className={`flex flex-1 flex-col bg-gray-50 ${
        showMessagesMobile ? 'w/full flex' : 'hidden'
      } md:flex md:w-auto`}
    >
      {/* Navbar phía trên khung chat */}
      {selectedChatId && (
        <div className="flex items-center border-b bg-white px-4 py-3">
          {showMessagesMobile && (
            <button
              className="mr-2 rounded px-2 py-1 text-blue-600 hover:bg-blue-50 md:hidden"
              onClick={onBack}
            >
              ←
            </button>
          )}
          <div className="flex flex-col">
            <span className="text-base font-semibold">
              {otherUser?.fullName || 'Chưa chọn hội thoại'}
            </span>
            {otherUser?.email && (
              <span className="text-xs text-gray-500">{otherUser.email}</span>
            )}
            {/* Trạng thái hoạt động */}
            {otherUser && (
              <span className="mt-0.5 text-xs">
                {otherUser.status === 'online' ? (
                  <span className="text-green-500">● Đang hoạt động</span>
                ) : otherUser.lastOnline ? (
                  <span className="text-gray-400">
                    ● Offline
                    {` (lần cuối: ${new Date(
                      otherUser.lastOnline,
                    ).toLocaleString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit',
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })})`}
                  </span>
                ) : (
                  <span className="text-gray-400">● Offline</span>
                )}
              </span>
            )}
          </div>
        </div>
      )}
      {!selectedChatId ? (
        <div className="flex flex-1 items-center justify-center text-xl text-gray-400">
          Vui lòng chọn cuộc hội thoại để bắt đầu chat
        </div>
      ) : (
        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-2">
            {loading ? (
              <div className="text-center text-gray-500">
                Đang tải tin nhắn...
              </div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : messages && messages.length > 0 ? (
              messages.map((msg, idx) => {
                const prevMsg = idx > 0 ? messages[idx - 1] : null
                const showDivider =
                  prevMsg && shouldShowTimeDivider(prevMsg, msg)
                return (
                  <React.Fragment key={msg._id || idx}>
                    {showDivider && (
                      <div className="my-4 flex items-center justify-center">
                        <span className="rounded bg-gray-200 px-3 py-1 text-xs text-gray-600 shadow">
                          {new Date(msg.createdAt).toLocaleString('vi-VN', {
                            hour: '2-digit',
                            minute: '2-digit',
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    )}
                    <MessageItem
                      msg={msg}
                      isOwn={msg.sender?._id === user._id}
                      showName={
                        !idx ||
                        messages[idx - 1]?.sender?._id !== msg.sender?._id
                      }
                      // avatar chỉ truyền cho tin nhắn không phải của bản thân
                      avatarUrl={
                        !msg.sender || msg.sender._id === user._id
                          ? undefined
                          : msg.sender?.avatar
                      }
                    />
                  </React.Fragment>
                )
              })
            ) : (
              <div className="text-center text-gray-400">
                Chưa có tin nhắn nào.
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* Ô nhập tin nhắn */}
          <form
            className="flex items-center border-t bg-white px-4 py-2"
            onSubmit={handleSend}
            autoComplete="off"
          >
            <input
              type="text"
              className="flex-1 rounded border px-3 py-2 outline-none"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={!selectedChatId || loading}
            />
            <button
              type="submit"
              className="ml-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
              disabled={!input.trim() || loading}
            >
              Gửi
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default ChatMessagesPanel
