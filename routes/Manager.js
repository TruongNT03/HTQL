import { Router } from "express";
import * as Manager from "../controller/Manager.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const route = Router();

route.post("/create", asyncHandler(Manager.createManager));
route.get("/getAll", asyncHandler(Manager.getAllManagers));

export default route;