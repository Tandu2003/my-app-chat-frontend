import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../utils/axios' // Thêm dòng này

// Async thunk: lấy messages của 1 chat
export const fetchMessages = createAsyncThunk(
  'message/fetchMessages',
  async (chatId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/messages/chat/${chatId}`)
      return res.data.messages // trả về mảng messages
    } catch (err) {
      return rejectWithValue(err.message)
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

export const { addMessage } = messageSlice.actions
export default messageSlice.reducer
