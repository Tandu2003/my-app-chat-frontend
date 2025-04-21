import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiFetchMessages } from '../api/messageApi'

// Async thunk: lấy messages của 1 chat
export const fetchMessages = createAsyncThunk(
  'message/fetchMessages',
  async (chatId, { rejectWithValue }) => {
    try {
      const res = await apiFetchMessages(chatId)
      return res.messages // trả về mảng messages từ backend
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || err.message || 'Lỗi lấy tin nhắn',
      )
    }
  },
)

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload)
    },
    clearMessages(state) {
      state.messages = []
      state.error = null
      state.loading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false
        state.messages = action.payload
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { addMessage, clearMessages } = messageSlice.actions
export default messageSlice.reducer
