import { Router } from "express";

import * as ProductController from "../controller/product.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import verifyToken from "../middlewares/verifyToken.js";
import authorization from "../middlewares/authorization.js";

const router = Router();

router.post(
  "",
  verifyToken,
  authorization(["admin"]),
  asyncHandler(ProductController.insertProduct)
);
router.get("", verifyToken, asyncHandler(ProductController.getAllProduct));

export default router;
