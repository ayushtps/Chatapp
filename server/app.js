import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { errorMiddlewares } from "./middlewares/error.js";
import { connectDB } from "./utils/features.js";

import chatRoute from './routes/chat.js';
import userRoute from './routes/user.js';
import adminRoute from './routes/admin.js';

const port = process.env.PORT || 3000
dotenv.config()
connectDB()

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/user', userRoute)
app.use('/chat', chatRoute)
app.use('/admin', adminRoute)

app.get('/', (req, res) => {
    res.send('hello word');
})

app.use(errorMiddlewares)

app.listen(port, () => {
    console.log(`server is running port ${port}`);
})