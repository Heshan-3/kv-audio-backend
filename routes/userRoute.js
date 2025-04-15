import express from "express";
import { getAllUsers, getUser, loginUser ,registerUser } from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post("/",registerUser);

userRoute.post("/login",loginUser);

userRoute.get("/",getUser);

userRoute.get("/all",getAllUsers);

export default userRoute;