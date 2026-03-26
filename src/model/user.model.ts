import bcrypt from 'bcrypt';
import { model, Schema, CallbackError } from "mongoose";
import { TUser } from "../types/user.interface";
import config from '../config';

const userSchema = new Schema<TUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },
        avatar: { type: String, default: "https://i.ibb.co.com/V0cgmZBJ/avatar.png" },
        role: { type: String, enum: ["admin", "manager", "customer"], default: "customer" },
        bio: { type: String },
    },
    { timestamps: true }
);

// ✅ Pre-save: async style — NO next parameter (Mongoose awaits the promise)
userSchema.pre('save', async function () {
    // 'this' is typed via the Schema<TUser> generic above — no alias needed
    if (!this.isModified('password')) {
        return;
    }

    this.password = await bcrypt.hash(
        this.password as string,
        Number(config.bcrypt_salt_rounds)
    );
});

// ✅ Post-save: callback style — type next explicitly
userSchema.post('save', function (user: TUser, next: (err?: CallbackError) => void) {
    console.log(`[Post-Save Hook]: A new user was created with email: ${user.email}`);
    user.password = '';
    next();
});

export const User = model<TUser>("User", userSchema);