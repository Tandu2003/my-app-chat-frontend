import api from '../utils/axios'

// Lấy tất cả message của 1 chat
export const apiFetchMessages = async (chatId) => {
  const res = await api.get(`/api/messages/chat/${chatId}`)
  return res.data
}

// Gửi message mới vào chat
export const apiSendMessage = async (chatId, content) => {
  const res = await api.post(`/api/messages/chat/${chatId}`, { content })
  return res.data
}

// Xóa message
export const apiDeleteMessage = async (id) => {
  const res = await api.delete(`/api/messages/${id}`)
  return res.data
}
