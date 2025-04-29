import { Router } from "express";

import * as AuthController from "../controller/auth.js";

const router = Router();

router.get("", AuthController.login);

export default router;
