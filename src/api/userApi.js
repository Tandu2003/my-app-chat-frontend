import axios from 'axios'

export const apiLogin = async (data) => {
  const res = await axios.post('/api/auth/login', data, {
    withCredentials: true,
  })
  return res.data.user
}

export const apiFetchCurrentUser = async () => {
  const res = await axios.get('/api/users/me', { withCredentials: true })
  return res.data
}
