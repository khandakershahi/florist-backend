// register user
import bcrypt from "bcrypt"
import { Request, Response } from "express";
import { User } from "../model/user.model";
import { tokenGenerate } from "../Utility/tokenGenerate.utility";

// user register function
const register = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        // check if user already exists
        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            return res.status(400).json({
                success: false,
                message: 'User already exists!',
            })
        }

        const savedUser = await User.create(req.body);

        // const payload = {
        //     email: savedUser.email,
        //     role: savedUser.role
        // };

        // const secret: Secret = config.jwt_secret as string;


        // const options: SignOptions = {
        //     expiresIn: config.jwt_expires_in as SignOptions["expiresIn"],
        // };

        // //generate token
        // const token = jwt.sign(payload, secret, options);

        //generate token
        const token = tokenGenerate(savedUser);

        // omit password from response
        const userResponse = savedUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: userResponse,
            token,
        });
    } catch (error: unknown) {

        const message = error instanceof Error ? error.message : String(error);

        res.status(500).json({
            success: false,
            message: "Failed to register User",
            error: message || 'Something went wrong',
        })
    }
}

// user login function

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // existing user check
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or passowrd"
            });
        }

        // check password
        const matchPassword = await bcrypt.compare(password, user.password as string);
        if (!matchPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            })
        }

        //generate token
        const token = tokenGenerate(user);

        // omit password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            message: 'User sigin successfully',
            data: userResponse,
            token,
        });

    } catch (error: unknown) {

        const message = error instanceof Error ? error.message : String(error);

        res.status(500).json({
            success: false,
            message: "Failed to login",
            error: message || 'Something went wrong',
        })
    }
}


// get all user for admin
const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select('-password');

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    } catch (error: unknown) {

        const message = error instanceof Error ? error.message : String(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: message,
        });
    }
};

export const userControllers = {
    register,
    login,
    getUsers
}