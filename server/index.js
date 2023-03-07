import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import connectDB from "./config/connectDB.js";
import userRoute from "./routes/user.route.js";
import reviewRoute from "./routes/review.route.js";
import orderRoute from "./routes/order.route.js";
import messageRoute from "./routes/message.route.js";
import gigRoute from "./routes/gig.route.js";
import conversationRoute from "./routes/conversation.route.js";
import authRoute from "./routes/auth.route.js";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";
import corsOptions from "./config/corsOptions.js";

const app = express();
dotenv.config();
connectDB();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("default"));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/review", reviewRoute);
app.use("/api/order", orderRoute);
app.use("/api/message", messageRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/conversation", conversationRoute);

app.use(errorHandler);
const PORT = process.env.PORT || 8080;

// * if everything is ok show this message
mongoose.connection.once("open", () => {
  console.log("Connected to database");
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
});

// * else show this error message
mongoose.connection.on("error", (err) => {
  console.log(`Error while connecting to database`);
});
