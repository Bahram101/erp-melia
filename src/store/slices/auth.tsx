import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../http";

export const login = createAsyncThunk(
  "auth/login",
  async (params: { username: string; password: string }) => {
    try {
      const { data } = await axios.post("/users/auth", params);
      return data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

const initialState = {
  data: null,
  status: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: any) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(login.fulfilled, (state, action: any) => {
      state.status = "loaded";
      state.data = action.payload;
    });
    builder.addCase(login.rejected, (state, action: any) => {
      state.status = "error";
      state.data = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
