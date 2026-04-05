import express, { Application, Request, Response } from "express";
import cors from 'cors';
import router from "./routes";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

//applicaiton routes
app.use('/api/v1', router)

//Testing route
app.get('/', (req: Request, res: Response) => {
    res.send("Florist Backend Server is Running")
});


// not found route
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});


export default app;