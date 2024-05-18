import { log } from "console";
import { configDotenv } from "dotenv";
import express from "express"
import mongoose from "mongoose";


configDotenv()

const app = express();


mongoose.connect(process.env.MONGO).then(()=>console.log("Connected to DB")).catch((e)=>console.log(e))

app.listen(3000,()=>console.log("Server running at port 3000!!!"))