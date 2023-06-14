import { createSlice } from "@reduxjs/toolkit";

import { AuthState } from "../../utils/types";

const initialState: AuthState = {
  isAuth: false,
  roomID: "",
  userName: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth: (state, { payload }) => {
      state.isAuth = true;
      state.roomID = payload.roomID;
      state.userName = payload.userName;
    },
  },
});

export const { auth } = authSlice.actions;

export default authSlice.reducer;
