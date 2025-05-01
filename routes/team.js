import { Router } from "express";
import * as Team from "../controller/Team.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const route = Router();

route.post("/create", asyncHandler(Team.createTeam));
route.delete("/delete/:id", asyncHandler(Team.deleteTeam));
route.get("/getAll", asyncHandler(Team.getAllTeams));
route.get("/getById/:id", asyncHandler(Team.getTeamById));

export default route;