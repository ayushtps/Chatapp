import mongoose from "mongoose"

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("MongoDB Database connection successfully..!");
    } catch (error) {
      console.log(`MongoDB database connection error :-> ${error.message}`);
    }
  };

export { connectDB }