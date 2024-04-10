import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { createServer } from 'http'
import { errorMiddlewares } from "./middlewares/error.js";
import { connectDB } from "./utils/features.js";
import { v4 as uuid } from 'uuid'
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary'
import chatRoute from './routes/chat.js';
import userRoute from './routes/user.js';
import adminRoute from './routes/admin.js';
import { Server } from "socket.io";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./modals/message.js";

dotenv.config()
const port = process.env.PORT || 3000
connectDB()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const userSocketIDs = new Map()

const app = express()
const server = createServer(app)
const io = new Server(server, {})

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

app.use('/user', userRoute)
app.use('/chat', chatRoute)
app.use('/admin', adminRoute)

app.get('/', (req, res) => {
    res.send('hello word');
})

io.use((socket, next) => {

})

io.on("connection", (socket) => {
    const user = {
        _id: "sjakbn",
        name: "Namgon"
    }
    userSocketIDs.set(user._id.toString(), socket.id)

    console.log(userSocketIDs);

    socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
        const messageForRealTime = {
            content: message,
            _id: uuid(),
            sender: {
                _id: user._id,
                name: user.name
            },
            chat: chatId,
            createdAt: new Date().toISOString(),
        }

        const messageForDB = {
            content: message,
            sender: user._id,
            chat: chatId
        }

        const membersSockets = getSockets(members)
        io.to(membersSockets).emit(NEW_MESSAGE, {
            chatId,
            message: messageForRealTime
        });
        io.to(membersSockets).emit(NEW_MESSAGE_ALERT, {
            chatId
        })

        try {
            await Message.create(messageForDB)
        } catch (error) {
            console.log(error);
        }
    })

    socket.on("disconnect", () => {
        console.log("user disconnected");
        userSocketIDs.delete(user._id.toString());
    })
})

app.use(errorMiddlewares)

server.listen(port, () => {
    console.log(`server is running port ${port}`);
})
