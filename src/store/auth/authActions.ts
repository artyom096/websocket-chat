import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { IAuthData } from "../../utils/types";

export const joinNewUser = createAsyncThunk<void, IAuthData>(
  "/auth",
  async (payload: IAuthData) => {
    await axios.post("/auth", payload);
  }
);
