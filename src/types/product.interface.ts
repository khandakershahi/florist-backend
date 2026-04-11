import { Types } from "mongoose";

export interface TProduct {
    title: string;
    description: string;
    price: number;
    feature_image: string;
    product_images: string[];
    category: string[];
    available_quantity: number;
    user: Types.ObjectId;
}