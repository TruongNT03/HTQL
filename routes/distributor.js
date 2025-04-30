import { Router } from "express";

import * as DistributorController from "../controller/distributer.js";

const router = Router();

router.post("", DistributorController.insertDistributor);

export default router;
