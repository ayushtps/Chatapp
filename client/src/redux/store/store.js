import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from '../slices/AuthSlice'
import LoginSlice from '../slices/LoginSlice'
export const store = configureStore({
    reducer:{
        auth:AuthSlice,
        loginUser:LoginSlice
    }
})