import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from '../slices/AuthSlice'
import LoginSlice from '../slices/LoginSlice'
import LogoutSlice from '../slices/LogoutSlice'
import RegisterSlice from '../slices/RegisterSlice'
export const store = configureStore({
    reducer:{
        auth:AuthSlice,
        loginUser:LoginSlice,
        registerUser:RegisterSlice,
        logout:LogoutSlice,
    }
})