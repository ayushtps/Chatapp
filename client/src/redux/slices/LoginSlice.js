import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../../environment";


export const UserLogin = createAsyncThunk('login', async (formData) => {
    try {
        let response = await axios.post('http://localhost:5000/user/login', formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",         
            }
        });
        return response.data
    }
    catch (error) {
        if(error.response){
            throw error.response.data.message
        }
        else{
            throw error
        }
    }
})

const LoginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
        errorMessage: ''
    },
    extraReducers: (builder) => {
        builder.addCase(UserLogin.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(UserLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload
        })
        builder.addCase(UserLogin.rejected, (state, action) => {
            state.isError = true;
            state.data = action.error.message;
            state.isLoading = true
        })
    }
})

export default LoginSlice.reducer