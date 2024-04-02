import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddlewares } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

import userRoute from './routes/user.js';
import chatRoute from './routes/chat.js';

const port = process.env.PORT || 3000
dotenv.config()
connectDB()
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/user', userRoute)
app.use('/chat', chatRoute)

app.get('/', (req, res) => {
    res.send('hello word');
})

app.use(errorMiddlewares)

app.listen(port, () => {
    console.log(`server is running port ${port}`);
})