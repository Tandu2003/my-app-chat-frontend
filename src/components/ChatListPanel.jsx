import React from 'react'
import { Input, Spin, Alert } from 'antd'

const ChatListPanel = ({
  chats,
  chatLoading,
  user,
  selectedChatId,
  onSelectChat,
  showMessagesMobile,
  search,
  setSearch,
  searchResult,
  searchLoading,
  searchError,
  onSearch,
  onSelectSearchUser,
}) => (
  <div
    className={`flex flex-col border-r bg-white ${
      showMessagesMobile ? 'hidden' : 'flex w-full'
    } md:block md:w-80`}
  >
    <div className="border-b p-4 text-lg font-bold">Cuộc hội thoại</div>
    {/* Ô tìm kiếm nằm bên trong panel */}
    <div className="border-b bg-white px-4 py-2">
      <Input.Search
        placeholder="Tìm bạn qua email..."
        allowClear
        enterButton="Tìm"
        size="middle"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onSearch={onSearch}
        loading={searchLoading}
        style={{ maxWidth: 320 }}
      />
      {searchLoading && <Spin className="mt-2" />}
      {searchError && (
        <Alert className="mt-2" type="error" message={searchError} showIcon />
      )}
      {searchResult && (
        <div
          className="mt-2 cursor-pointer rounded border p-2 hover:bg-blue-50"
          onClick={() => onSelectSearchUser(searchResult)}
        >
          <div className="font-medium">{searchResult.fullName}</div>
          <div className="text-xs text-gray-500">{searchResult.email}</div>
        </div>
      )}
    </div>
    <div className="flex-1 overflow-y-auto">
      {chatLoading ? (
        <div className="p-4 text-gray-500">Đang tải...</div>
      ) : chats && chats.length > 0 ? (
        chats.map((chat) => {
          const other = chat.participants.find((u) => u._id !== user._id)
          return (
            <div
              key={chat._id}
              className={`cursor-pointer border-b px-4 py-3 hover:bg-blue-50 ${
                selectedChatId === chat._id ? 'bg-blue-100' : ''
              }`}
              onClick={() => onSelectChat(chat._id)}
            >
              <div className="font-medium">
                {other?.fullName || 'Không xác định'}
              </div>
              {/* Có thể hiển thị tin nhắn cuối cùng ở đây */}
            </div>
          )
        })
      ) : (
        <div className="p-4 text-gray-500">Không có cuộc hội thoại nào.</div>
      )}
    </div>
  </div>
)

export default ChatListPanel
