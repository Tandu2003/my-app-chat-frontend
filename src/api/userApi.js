import api from '../utils/axios'

// Lấy tất cả người dùng
export const apiFetchAllUsers = async () => {
  const res = await api.get('/api/users')
  return res.data
}

// Lấy người dùng theo id
export const apiFetchUserById = async (id) => {
  const res = await api.get(`/api/users/${id}`)
  return res.data
}

// Tạo người dùng mới
export const apiCreateUser = async (data) => {
  const res = await api.post('/api/users', data)
  return res.data
}

// Cập nhật thông tin người dùng
export const apiUpdateUser = async (id, data) => {
  const res = await api.put(`/api/users/${id}`, data)
  return res.data
}

// Xóa người dùng
export const apiDeleteUser = async (id) => {
  const res = await api.delete(`/api/users/${id}`)
  return res.data
}

// Đổi mật khẩu (yêu cầu đăng nhập)
export const apiChangePassword = async (data) => {
  const res = await api.put('/api/users/change-password', data)
  return res.data
}

// Tìm kiếm người dùng theo email hoặc tên (chỉ bạn bè)
export const apiSearchUsers = async (params) => {
  const res = await api.get('/api/users/search', { params })
  return res.data
}

// Lấy thông tin người dùng hiện tại (yêu cầu đăng nhập)
export const apiFetchCurrentUser = async () => {
  const res = await api.get('/api/users/me')
  return res.data
}
