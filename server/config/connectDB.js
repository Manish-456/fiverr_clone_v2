import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.log(err.message);
  }
};

export default connectDB;
