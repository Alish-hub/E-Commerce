import { Router } from "express";
import { addWishList, getAllWishList } from "../controllers/wish_list.controller";
import { isUser } from "../middlewares/isUser";

const wishRoute = Router();
wishRoute.post('/add',isUser, addWishList)
wishRoute.get('/getall',isUser, getAllWishList)


export default wishRoute;