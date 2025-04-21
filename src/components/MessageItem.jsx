import React from 'react'

const MessageItem = ({ msg, isOwn, showName, avatarUrl }) => (
  <div className={`mb-2 flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
    {!isOwn && (
      <img
        src={avatarUrl || '/default-avatar.png'}
        alt="avatar"
        className="mr-2 h-8 w-8 self-end rounded-full"
      />
    )}
    <div className="max-w-xs break-words md:max-w-md">
      <div
        className={`relative rounded-xl px-4 py-2 text-sm shadow ${
          isOwn ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'
        }`}
      >
        {showName && !isOwn && (
          <div className="mb-1 text-xs font-semibold text-gray-600">
            {msg.sender?.fullName}
          </div>
        )}
        <div>{msg.content}</div>
        <div className="mt-1 text-right text-[10px] text-gray-400">
          {msg.createdAt &&
            new Date(msg.createdAt).toLocaleTimeString('vi-VN', {
              hour: '2-digit',
              minute: '2-digit',
            })}
        </div>
      </div>
    </div>
    {/* Không hiển thị avatar cho tin nhắn của bản thân */}
  </div>
)

export default MessageItem
