import express from "express";
import { loginUser ,registerUser } from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post("/",registerUser);

userRoute.post("/login",loginUser);

export default userRoute;