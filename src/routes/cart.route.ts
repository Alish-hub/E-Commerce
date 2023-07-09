import { Router } from "express";
import { createCart } from "../controllers/cart.controller";
import { isUser } from "../middlewares/isUser";



const cartRoute = Router();
cartRoute.post('/create',isUser, createCart);

export default cartRoute;