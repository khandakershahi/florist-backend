import { model, Schema } from "mongoose";
import { TProduct } from "../types/product.interface";

const productSchema = new Schema<TProduct>({
    title: {
        type: String,
        required: true,
        default: "Product Tittle"
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    feature_image: {
        type: String,
        default: "https://i.ibb.co.com/tMXkyKvt/placeholder-1000x1000.jpg",
    },
    product_images: {
        type: [String],
        default: [],
    }
},
    {
        timestamps: true,
    }
)

export const Product = model<TProduct>("Product", productSchema);