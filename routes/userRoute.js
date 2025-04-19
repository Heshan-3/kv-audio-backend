import express from "express";
import { getAllUsers, getUser, loginUser ,loginWithGoogle,registerUser, sendOTP, verifyOTP } from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post("/",registerUser);

userRoute.post("/login",loginUser);

userRoute.get("/",getUser);

userRoute.get("/all",getAllUsers);

userRoute.post("/google",loginWithGoogle)

userRoute.get("/sendOTP",sendOTP)

userRoute.post("/verifyEmail",verifyOTP)

export default userRoute;