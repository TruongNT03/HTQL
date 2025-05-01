import { Router } from "express";

import * as DistributorController from "../controller/distributer.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import verifyToken from "../middlewares/verifyToken.js";
import authorization from "../middlewares/authorization.js";

const router = Router();

router.post(
  "",
  verifyToken,
  authorization(["admin"]),
  asyncHandler(DistributorController.insertDistributor)
);

export default router;
