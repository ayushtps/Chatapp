import jwt from 'jsonwebtoken';
import { ErrorHandler } from "../utils/utilitys.js";
import { TryCatch } from './error.js';

const isAuthenticated = TryCatch((req, res, next) => {
    const token = req.cookies['chatt-token'];
    if (!token) return next(new ErrorHandler("please login to access this route", 401))

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decodedData._id
    next()
})

const adminOnly = (req, res, next) => {
    const token = req.cookies['chatt-admin-token'];
    if (!token) return next(new ErrorHandler("Only Admin can access this route", 401))

    const secretKey = jwt.verify(token, process.env.JWT_SECRET)
    const adminSecretKey = process.env.ADMIN_SECRET_KEY || "ayushpaghadal"
    const isMatched = secretKey == adminSecretKey

    if (!isMatched) return next(new ErrorHandler("Invalid Admin key", 401))
    next()
}

export { isAuthenticated, adminOnly } 