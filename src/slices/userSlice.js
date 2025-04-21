import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiFetchCurrentUser } from '../api/userApi'

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
    setUser(state, action) {
      state.user = action.payload
    },
    logout(state) {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer
