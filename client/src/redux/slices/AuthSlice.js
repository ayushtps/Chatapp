import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../../environment";


export const getMyProfile = createAsyncThunk('authCheck', async () => {
    try {
        let response = await axios.get('http://localhost:5000/user/me');
        return response.data
    }
    catch (error) {
        if (error.response) {
            throw error.response.data.message
        }
        else {
            throw error
        }
    }
})

const AuthSlice = createSlice({
    name: 'Auth',
    initialState: {
        isLoading: false,
        user: null,
        isError: false,
        errorMessage: ''
    },
    extraReducers: (builder) => {
        builder.addCase(getMyProfile.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getMyProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload
        })
        builder.addCase(getMyProfile.rejected, (state, action) => {
            // console.log(action);
            state.isError = true;
            state.data = action.error.message;
            state.isLoading = false
        })
    }
})

export default AuthSlice.reducer