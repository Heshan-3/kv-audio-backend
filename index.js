import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use((req, res, next)=>{
    let token = req.header("Authorization");

    if(token != null){
        token = token.replace("Bearer ", "");
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{

            if(!err){
                req.user = decoded;
            }
        })
    }
    next()
})

let mongoUrl = process.env.MONGO_URL

mongoose.connect(mongoUrl)

let connection = mongoose.connection
connection.once("open", ()=>{
    console.log("MongoDB connection estabilished successfull")
})

app.use("/api/users", userRoute)
app.use("/api/products",productRouter)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
});
