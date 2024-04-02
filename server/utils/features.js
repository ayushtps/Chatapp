import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const CookieOption = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: 'none',
  httpOnly: true,
  secure: true,
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Database connection successfully..!");
  } catch (error) {
    console.log(`MongoDB database connection error :-> ${error.message}`);
  }
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
  return res.status(code).cookie("chatt-token", token, CookieOption).json({
    success: true,
    message,
  })
}

export { connectDB, sendToken, CookieOption }