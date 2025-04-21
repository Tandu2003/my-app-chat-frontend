import api from '../utils/axios'

// Lấy tất cả chat của user (yêu cầu đăng nhập)
export const apiFetchChats = async () => {
  const res = await api.get('/api/chats')
  return res.data
}

// Lấy chi tiết 1 chat
export const apiFetchChatById = async (id) => {
  const res = await api.get(`/api/chats/${id}`)
  return res.data
}

// Tạo chat mới (1-1)
export const apiCreateChat = async (participantId) => {
  const res = await api.post('/api/chats', { participantId })
  return res.data
}
