import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiLogin, apiFetchCurrentUser } from '../api/userApi'

// Async thunk: đăng nhập
export const login = createAsyncThunk(
  'user/login',
  async (data, { rejectWithValue }) => {
    try {
      const user = await apiLogin(data)
      return user
    } catch (err) {
      return rejectWithValue(err.message)
    }
  },
)

// Async thunk: lấy user hiện tại
export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const user = await apiFetchCurrentUser()
      return user
    } catch (err) {
      return rejectWithValue(err.message)
    }
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload
      })
  },
})

export const { logout } = userSlice.actions
export default userSlice.reducer
