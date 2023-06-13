import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ChatState, IMessages } from "../utils/types";

const initialState: ChatState = {
  users: [],
  messages: [],
};

export const getAllUsers = createAsyncThunk(
  "/rooms/:id",
  async (id: string) => {
    const { data } = await axios.get(`/rooms/${id}`);
    return data;
  }
);

export const getAllMessages = createAsyncThunk(
  "/messages/:id",
  async (id: string) => {
    const { data } = await axios.get(`/messages/${id}`);
    return data;
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllUsers.fulfilled,
        (state: ChatState, { payload }: PayloadAction<string[]>) => {
          state.users = payload;
        }
      )
      .addCase(
        getAllMessages.fulfilled,
        (state: ChatState, { payload }: PayloadAction<IMessages[]>) => {
          state.messages = payload;
        }
      );
  },
});

export default chatSlice.reducer;
