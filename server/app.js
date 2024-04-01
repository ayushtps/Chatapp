import express from "express";
import userRoute from './routes/user.js';
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
const app = express()
const port = process.env.PORT || 3000
dotenv.config()
connectDB()
app.use('/user', userRoute)

app.get('/', (req, res) => {
    res.send('hello word');
})

app.listen(port, () => {
    console.log(`server is running port ${port}`);
})