import { body, param, validationResult } from "express-validator"
import { ErrorHandler } from "../utils/utilitys.js"

const validateHandler = (req, res, next) => {
    const errors = validationResult(req)
    const errorMessage = errors.array().map((error) => error.msg).join(",")

    if (errors.isEmpty()) return next()
    else next(new ErrorHandler(errorMessage, 400))
}

const registerValidator = () => [
    body("name", "Please Enter Name").notEmpty(),
    body("username", "Please Enter Username").notEmpty(),
    body("bio", "Please Enter Bio").notEmpty(),
    body("password", "Please Enter Password").notEmpty(),
]

const loginValidator = () => [
    body("username", "Please Enter Username").notEmpty(),
    body("password", "Please Enter Password").notEmpty(),
]

const newGroupChatValidator = () => [
    body("name", "Please Enter Name").notEmpty(),
    body("members").notEmpty().withMessage("Please Enter Members").isArray({ min: 2, max: 100 }).withMessage("Member Must be 2-100"),
]

const addMemberValidator = () => [
    body("chatId", "Please Enter chatId").notEmpty(),
    body("members").notEmpty().withMessage("Please Enter Members").isArray({ min: 1, max: 97 }).withMessage("Member Must be 1-97"),
]

const removeMemberValidator = () => [
    body("chatId", "Please Enter chatId").notEmpty(),
    body("userId").notEmpty().withMessage("Please Enter UserId")
]

const sendAttachmentValidator = () => [
    body("chatId", "Please Enter chatId").notEmpty(),
]

const ChatIdValidator = () => [
    param("id", "Please Enter chatId").notEmpty(),
]

const renameValidator = () => [
    param("id", "Please Enter chatId").notEmpty(),
    body("name", "Please Enter New Name").notEmpty(),
]

const sendReqestValidator = () => [
    body("userId", "Please Enter userId").notEmpty(),
]

const acceptReqestValidator = () => [
    body("requestId", "Please Enter Request ID").notEmpty(),
    body("accept").notEmpty().withMessage("Please Add Accept").isBoolean().withMessage("Accept Must be Boleen"),
]

const adminLoginValidator = () => [
    body("secretKey", "Please Enter Secret Key").notEmpty(),
]


export { ChatIdValidator, acceptReqestValidator, addMemberValidator, adminLoginValidator, loginValidator, newGroupChatValidator, registerValidator, removeMemberValidator, renameValidator, sendAttachmentValidator, sendReqestValidator, validateHandler }
