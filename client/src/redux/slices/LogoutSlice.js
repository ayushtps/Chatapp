import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../../environment";
import { getMyProfile } from "./AuthSlice";

export const logOutUser = createAsyncThunk("logout", async () => {
  try {
    let response = await axios.get(`${API_KEY}/user/logout`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    } else {
      throw error;
    }
  }
});

const LogoutSlice = createSlice({
  name: "logout",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    errorMessage: "",
  },
  extraReducers: (builder) => {
    builder.addCase(logOutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logOutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(logOutUser.rejected, (state, action) => {
      state.isError = true;
      state.data = action.error.message;
      state.isLoading = false;
    });
  },
});

export default LogoutSlice.reducer;
