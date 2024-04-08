import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../../environment";


export const getMyProfile = createAsyncThunk('authCheck', async () => {
    try {
        let response = await axios.get('http://localhost:3000/user/me');
        return response.data
    }
    catch (error) {
        throw error
    }
})

const AuthSlice = createSlice({
    name: 'Auth',
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
        errorMessage: ''
    },
    extraReducers: (builder) => {
        builder.addCase(getMyProfile.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getMyProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload
        })
        builder.addCase(getMyProfile.rejected, (state, action) => {
            state.isError = true;
            state.data = action.error.message;
            state.isLoading = true
        })
    }
})

export default AuthSlice.reducer