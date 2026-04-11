import config from "../config";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { Types } from "mongoose";

type JwtUserPayload = {
    _id: Types.ObjectId | string;
    name: string;
    email: string;
    role: string;
};

export const tokenGenerate = (user: JwtUserPayload): string => {
    const userId = typeof user._id === "string" ? user._id : user._id.toString();

    const payload = {
        userId,
        name: user.name,
        email: user.email,
        role: user.role,
    };

    const secret: Secret = config.jwt_secret as string;


    const options: SignOptions = {
        expiresIn: config.jwt_expires_in as SignOptions["expiresIn"],
    };

    //generate token
    const token = jwt.sign(payload, secret, options);

    return token;
}
