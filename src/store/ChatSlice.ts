import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface ChatState {
  users: string[],
  messages: string[];
}

const initialState: ChatState = {
    users: [],
    messages: []
}

export const getAllUsers = createAsyncThunk(
  '/rooms/:id',
  async (id: string) => {
    const { data } = await axios.get(`/rooms/${id}`)
    return data
  }
)

export const getAllMessages = createAsyncThunk(
  '/messages/:id',
  async (id: string) => {
    const { data } = await axios.get(`/messages/${id}`)
    return data
  }
)

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getAllUsers.fulfilled, (state: ChatState, {payload}: PayloadAction<string[]>) => {
        state.users = payload
    })
    .addCase(getAllMessages.fulfilled, (state: ChatState, {payload}: PayloadAction<string[]>) => {
        state.messages = payload
    })
  },
})

export default chatSlice.reducer