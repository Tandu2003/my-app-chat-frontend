import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunk: lấy danh sách chat
export const fetchChats = createAsyncThunk(
  'chat/fetchChats',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/chats', { credentials: 'include' })
      const result = await res.json()
      if (!res.ok) throw new Error(result.message)
      return result
    } catch (err) {
      return rejectWithValue(err.message)
    }
  },
)

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false
        state.chats = action.payload
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default chatSlice.reducer
