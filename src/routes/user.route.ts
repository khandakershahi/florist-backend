import express from "express";
import { userControllers } from "../controllers/user.controller";

const router = express.Router();

//register uesr
router.post('/register', userControllers.register)

// user login
router.post('/login', userControllers.login)

// user login
router.get('/allusers', userControllers.getUsers)


export const userRoutes = router;