import express from "express";
import { userRoutes } from "./user.route";
import { productRoutes } from "./product.route";

const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/products',
        route: productRoutes
    },
]



moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;