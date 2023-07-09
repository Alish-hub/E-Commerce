import { Router } from "express";
import { createCategory } from "../controllers/categorie.controller";
const route1 = Router()

route1.post('/category',createCategory)

export default route1;