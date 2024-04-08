import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../modals/chat.js";
import { User } from "../modals/user.js";
import { Message } from "../modals/message.js";
import { ErrorHandler } from "../utils/utilitys.js";
import jwt from 'jsonwebtoken'
import { CookieOption } from "../utils/features.js";

const adminLogin = TryCatch(async (req, res, next) => {
    const { secretKey } = req.body;
    const adminSecretKey = process.env.ADMIN_SECRET_KEY || "ayushpaghadal"
    const isMatched = secretKey == adminSecretKey

    if (!isMatched) return next(new ErrorHandler("Invalid Admin key", 401))

    const token = jwt.sign(secretKey, process.env.JWT_SECRET)

    return res.status(200).cookie("chatt-admin-token", token, { ...CookieOption, maxAge: 1000 * 60 * 15 }).json({
        success: true,
        message: "Authenticated Successfully,Welcome BOSS"
    })
})

const adminLogout = TryCatch(async (req, res, next) => {

    return res.status(200).cookie("chatt-admin-token", " ", { ...CookieOption, maxAge: 0 }).json({
        success: true,
        message: "Logged Out Successfully"
    })
})

const getAdminData = TryCatch(async (req, res, next) => {

    return res.status(200).json({
        admin:true,
    })
})

const allUser = TryCatch(async (req, res, next) => {
    const users = await User.find({})

    const transformedUsers = await Promise.all(users.map(async ({ name, username, avatar, _id }) => {
        const [groups, friends] = await Promise.all([
            Chat.countDocuments({ groupChat: true, members: _id }),
            Chat.countDocuments({ groupChat: false, members: _id })
        ])
        return {
            name,
            username,
            avatar: avatar.url,
            _id,
            groups,
            friends
        }
    }))
    res.status(200).json({
        status: "success",
        users: transformedUsers
    })
})

const allChats = TryCatch(async (req, res, next) => {
    const chats = await Chat.find({}).populate("members", "name avatar").populate("creator", "name avatar")
    const transformedChats = await Promise.all(chats.map(async ({ members, groupChat, name, _id, creator }) => {
        const totalMessages = await Message.countDocuments({ chat: _id })
        return {
            _id,
            groupChat,
            name,
            avatar: members.slice(0, 3).map((x) => x.avatar.url),
            members: members.map(({ _id, name, avatar }) => (
                {
                    _id,
                    name,
                    avatar: avatar.url,
                }
            )),
            creator: {
                name: creator?.name || "None",
                avatar: creator?.avatar.url || "",
            },
            totalMembers: members.length,
            totalMessages
        }
    }))
    res.status(200).json({
        status: "success",
        chats: transformedChats
    })
})

const allMessages = TryCatch(async (req, res, next) => {
    const messages = await Message.find({}).populate("sender", "name avatar").populate("chat", "groupChat")
    const transformedMessages = messages.map(({ _id, createdAt, content, sender, chat, attachments }) => (
        {
            _id,
            attachments,
            content,
            createdAt,
            chat: chat._id,
            groupChat: chat.groupChat,
            sender: {
                _id: sender._id,
                name: sender.name,
                avatar: sender.avatar.url
            }

        }
    ))
    res.status(200).json({
        status: true,
        messages: transformedMessages
    })
})

const getDashboardStats = TryCatch(async (req, res, next) => {
    const [groupsCount, userCount, messageCount, totalChatCount] =
        await Promise.all([
            Chat.countDocuments({ groupChat: true }),
            User.countDocuments(),
            Message.countDocuments(),
            Chat.countDocuments(),
        ])

    const today = new Date();
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const last7DaysMessages = await Message.find({
        createdAt: {
            $gte: last7Days,
            $lte: today,
        }
    }).select("createdAt")

    const messages = new Array(7).fill(0)
    const dayInMilliseconds = 1000 * 60 * 60 * 24
    last7DaysMessages.forEach(x => {
        const indexApprox = ((today.getTime() - x.createdAt.getTime()) / (dayInMilliseconds))
        const index = Math.floor(indexApprox)
        messages[6 - index]++;
    });
    const stats = {
        groupsCount,
        userCount,
        messageCount,
        totalChatCount,
        messageChart: messages

    }
    res.status(200).json({
        status: true,
        stats
    })
})



export { allUser, allChats, allMessages, getDashboardStats, adminLogin, adminLogout ,getAdminData}