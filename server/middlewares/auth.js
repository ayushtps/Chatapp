import jwt from 'jsonwebtoken';
import { ErrorHandler } from "../utils/utilitys.js";

const isAuthenticated = (req, res, next) => {
    const token = req.cookies['chatt-token'];
    if (!token) return next(new ErrorHandler("please login to access this route", 401))

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decodedData._id
    next()
}

export { isAuthenticated } 