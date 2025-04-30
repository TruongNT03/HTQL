import { Router } from "express";
import * as User from "../controller/User.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const route = Router();

route.post("/register", asyncHandler(User.register));
route.post("/login", asyncHandler(User.login));

export default route;