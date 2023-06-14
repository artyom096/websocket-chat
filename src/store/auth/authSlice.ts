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
    auth: (state, { payload: { roomID, userName } }) => {
      state.isAuth = true;
      state.roomID = roomID;
      state.userName = userName;
    },
  },
});

export const { auth } = authSlice.actions;

export default authSlice.reducer;
