import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../../environment";


export const UserRegister = createAsyncThunk('register', async (formData) => {
    try {
        let response = await axios.post('http://localhost:5000/user/new', formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",         
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

const RegisterSlice = createSlice({
    name: 'register',
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
        errorMessage: ''
    },
    extraReducers: (builder) => {
        builder.addCase(UserRegister.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(UserRegister.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload
        })
        builder.addCase(UserRegister.rejected, (state, action) => {
            state.isError = true;
            state.data = action.error.message;
            state.isLoading = true
        })
    }
})

export default RegisterSlice.reducer