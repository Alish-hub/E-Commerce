import { Router } from "express";
import { giveRating } from "../controllers/rating.controller";
import { isUser } from "../middlewares/isUser";
const ratingRoute = Router();
ratingRoute.post("/save", isUser, giveRating);
export default ratingRoute;
