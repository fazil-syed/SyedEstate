import { configDotenv } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";
configDotenv();

const app = express();

app.use(express.json());

app.use(cookieParser());

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.log(e));

const __dirname = path.resolve();

app.use("/api/user", userRouter);

app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
app.use((err, req, res, next) => {
  const statuscode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statuscode).json({
    success: false,
    statuscode,
    message,
  });
});

app.listen(3000, () => console.log("Server running at port 3000!!!"));
