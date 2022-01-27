import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export interface AuthState {
  isAuth: boolean;
  roomID: string;
  userName: string;
}

const initialState: AuthState = {
  isAuth: false,
  roomID: "",
  userName: "",
}

interface IAuthData {
  roomID: string;
  userName: string;
}

export const joinNewUser = createAsyncThunk(
  '/auth',
  async (payload: IAuthData) => {
    await axios.post('/auth', payload)
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    auth: (state, {payload}: PayloadAction<IAuthData>) => {
      state.isAuth = true
      state.roomID = payload.roomID
      state.userName = payload.userName
    }
  }
})

export const { auth } = authSlice.actions

export default authSlice.reducer