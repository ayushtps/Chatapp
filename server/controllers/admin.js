import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../modals/chat.js";
import { User } from "../modals/user.js";
import { ErrorHandler } from "../utils/utilitys.js";

const allUser = TryCatch(async (req, res, next) => {
    const users = await User.find({})

    const transformedUsers = users.map(async ({ name, username, avatar, _id }) => {
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
    })
    res.status(200).json({
        status: "success",
        users: transformedUsers
    })
})

export { allUser }