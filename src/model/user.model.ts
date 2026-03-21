import { Schema } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    avatar: { type: String, default: "https://i.ibb.co.com/V0cgmZBJ/avatar.png" },
    role: { type: String, enum: ["admin", "manager", "customer"], default: "customer" },
    bio: { type: String },

},
    {
        timestamps: true,
    }
)

