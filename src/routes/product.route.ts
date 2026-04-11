import express from "express";
import { productControllers } from "../controllers/product.controller";
import { authMiddleware } from "../middleware/authMIddleware";

const router = express.Router();

//product save
router.post('/createproduct', authMiddleware, productControllers.createProduct)



export const productRoutes = router;