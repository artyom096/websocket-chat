import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import authSlice from "./authSlice";
import chatSlice from "./chatSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
