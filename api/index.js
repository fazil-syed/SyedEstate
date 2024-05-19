import { configDotenv } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"

configDotenv()

const app = express();

app.use(express.json())

mongoose.connect(process.env.MONGO).then(()=>console.log("Connected to DB")).catch((e)=>console.log(e))


app.use("/api/user",userRouter)

app.use('/api/auth',authRouter)

app.use((err,req,res,next)=>{
    const statuscode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    return res.status(statuscode).json({
        success: false,
        statuscode,
        message
    })
})



app.listen(3000,()=>console.log("Server running at port 3000!!!"))