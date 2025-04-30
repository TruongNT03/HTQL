import * as ProductController from "../controller/product.js";

import { Router } from "express";

const router = Router();

router.post("", ProductController.insertProduct);
router.get("", ProductController.getAllProduct);

export default router;
