import { omit } from "lodash";
import createError from "http-errors";
import { type Request, type Response, type NextFunction } from "express";
import { LoginInput, UserInput } from "../schema/user.schema";
import { UserDocument } from "../models/user.model";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

class UserController {
    async createUser(req: Request<{}, {}, UserInput>, res: Response, next: NextFunction) {
        try {
            const userData: UserInput = req.body;

            const createdUser: UserDocument = await UserService.create(userData);

            res.status(200).json({
                message: "Create user successfully",
                data: omit(createdUser, "password")
            });
        } catch (error) {
            next(error);
        }
    }

    async getUserInfo(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).json({
                message: "Get user data successful",
                data: res.locals.userData
            });
        } catch (error) {
            next(error);
        }
    }

    async loginUser(req: Request<{}, {}, LoginInput>, res: Response, next: NextFunction) {
        try {
            const loginData: LoginInput = req.body;
            const password: string = loginData.password;
            const user_name: string = loginData.user_name;

            const user: UserDocument = await UserService.getUserByUserName(user_name);

            const isValidPassword = await user.comparePassword(password);
            if (!isValidPassword) throw createError.Unauthorized("Incorrect password");

            const userId = user._id as string;

            const token = await AuthService.signToken(userId);

            res.status(200).json({
                message: "Login successfully",
                data: {
                    user: omit(user.toObject(), "password"),
                    token
                }
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
