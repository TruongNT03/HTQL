import { Router } from "express";
import * as AuthController from "../controller/auth.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = Router();

router.post("/register", asyncHandler(AuthController.register));
router.post("/login", asyncHandler(AuthController.login));

export default router;
