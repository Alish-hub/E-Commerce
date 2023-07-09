 import { Router } from "express";
import { createProduct, deleteProduct, getProductByCategory, updateProduct } from "../controllers/product.controller";
import { isUser } from "../middlewares/isUser";
import { authorize1 } from "../middlewares/authorization";

const route= Router();
route.post('/createProduct',isUser,authorize1, createProduct)
route.get('/getProducts',isUser,authorize1,getProductByCategory)
route.put('/update/:id',updateProduct)
route.delete('/delete/:id',deleteProduct)




export default route;