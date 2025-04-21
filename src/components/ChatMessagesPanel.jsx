import React from 'react'

const ChatMessagesPanel = ({ selectedChatId, showMessagesMobile, onBack }) => (
  <div
    className={`flex flex-1 flex-col bg-gray-50 ${
      showMessagesMobile ? 'flex w-full' : 'hidden'
    } md:flex md:w-auto`}
  >
    {/* Nút quay lại trên mobile */}
    {showMessagesMobile && (
      <button
        className="px-4 py-2 text-left font-medium text-blue-600 md:hidden"
        onClick={onBack}
      >
        ← Quay lại
      </button>
    )}
    {!selectedChatId ? (
      <div className="flex flex-1 items-center justify-center text-xl text-gray-400">
        Vui lòng chọn cuộc hội thoại để bắt đầu chat
      </div>
    ) : (
      <div className="flex flex-1 flex-col">
        {/* TODO: Hiển thị danh sách tin nhắn của chat selectedChatId */}
        <div className="flex flex-1 items-center justify-center text-gray-500">
          Đang phát triển giao diện chat...
        </div>
      </div>
    )}
  </div>
)

export default ChatMessagesPanel
