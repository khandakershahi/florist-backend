import { Response } from "express";
import { Product } from "../model/prodduct.model";
import { AuthRequest } from "../middleware/authMIddleware";

const createProduct = async (req: AuthRequest, res: Response) => {
    try {
        const saveProduct = await Product.create({
            ...req.body,
            user: req.user, // ✅ correct (string ObjectId)
        });

        const populatedProduct = await Product.findById(saveProduct._id).populate(
            "user",
            "name"
        );

        res.status(201).json({
            success: true,
            message: "Product saved successfully",
            data: populatedProduct ?? saveProduct,
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);

        res.status(500).json({
            success: false,
            message: "Failed to save product",
            error: message,
        });
    }
};

export const productControllers = {
    createProduct,
};
