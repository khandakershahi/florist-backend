import config from "../config";
import jwt, { Secret, SignOptions } from "jsonwebtoken";

type JwtUserPayload = {
    email: string,
    role: string
}


export const tokenGenerate = (user: JwtUserPayload): string => {

    const payload = {
        email: user.email,
        role: user.role
    };

    const secret: Secret = config.jwt_secret as string;


    const options: SignOptions = {
        expiresIn: config.jwt_expires_in as SignOptions["expiresIn"],
    };

    //generate token
    const token = jwt.sign(payload, secret, options);

    return token;
}

