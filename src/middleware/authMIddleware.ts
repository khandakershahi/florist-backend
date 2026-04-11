import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Define expected payload shape
interface CustomJwtPayload extends JwtPayload {
    userId?: string;
    name?: string;
    id?: string;
    _id?: string;
}

// Extend Request type
export interface AuthRequest extends Request {
    user?: string;
    name?: string;
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as CustomJwtPayload;

        const userId = decoded.userId || decoded.id || decoded._id;

        if (!userId) {
            return res.status(401).json({
                message: "Token missing user id",
            });
        }

        // safely assign values
        req.user = userId;
        req.name = decoded.name;

        next();
    } catch (error: any) {
        return res.status(401).json({
            message: "Unauthorized",
            error: error.message,
        });
    }
};


// import jwt from "jsonwebtoken";
// const jwt = require("jsonwebtoken");

// const checkLogin = (req, res, next) => {
//     const { authorization } = req.headers;
//     try {
//         const token = authorization.split(" ")[1];
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const { username, userId } = decoded;
//         req.username = username;
//         req.userId = userId;
//         next();
//     } catch {
//         next("Authentication Failed");
//     }
// };

// module.exports = checkLogin;
