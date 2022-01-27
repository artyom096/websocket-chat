import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import authSlice from './AuthSlice'
import chatSlice from './ChatSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        chat: chatSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()