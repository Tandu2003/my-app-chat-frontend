import api from '../utils/axios'

// Đăng ký tài khoản mới
export const apiRegister = async (data) => {
  const res = await api.post('/api/auth/register', data)
  return res.data
}

// Xác thực email
export const apiVerifyEmail = async (token) => {
  const res = await api.get(`/api/auth/verify-email?token=${token}`)
  return res.data
}

// Đăng nhập
export const apiLogin = async (data) => {
  const res = await api.post('/api/auth/login', data)
  return res.data
}

// Đăng xuất
export const apiLogout = async () => {
  const res = await api.post('/api/auth/logout')
  return res.data
}
