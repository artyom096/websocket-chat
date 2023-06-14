import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
