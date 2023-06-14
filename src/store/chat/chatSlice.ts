import { createSlice } from "@reduxjs/toolkit";

import { ChatState } from "../../utils/types";
import { getAllMessages, getAllUsers } from "./chatActions";

const initialState: ChatState = {
  users: [],
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllUsers.fulfilled,
        (state, { payload }) => {
          state.users = payload;
        }
      )
      .addCase(
        getAllMessages.fulfilled,
        (state, { payload }) => {
          state.messages = payload;
        }
      );
  },
});

export default chatSlice.reducer;
