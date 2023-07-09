import { Router } from "express";
import { deleteOrder, placeOrder } from "../controllers/order.controller";
import { isUser } from "../middlewares/isUser";



const orderRoute =Router();
orderRoute.post('/place',isUser, placeOrder)
orderRoute.delete('/delete/:orderId',isUser, deleteOrder)


export default orderRoute;