import { omit } from "lodash";
import createError from "http-errors";
import { type Request, type Response, type NextFunction } from "express";
import { UserInput } from "../schema/createUser.schema";
import { UserDocument } from "../models/user.model";
import UserService from "../services/user.service";
import { LoginInput } from "../schema/loginUser.schema";
import AuthService from "../services/auth.service";

class UserController {
    async createUser(req: Request<{}, {}, UserInput>, res: Response, next: NextFunction) {
        try {
            const userData: UserInput = req.body;

            const createdUser: UserDocument = await UserService.create(userData);

            res.status(200).json({
                msg: "Create user successfully",
                data: omit(createdUser, "password")
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

            const user: UserDocument | null = await UserService.getUserByUserName(user_name);

            if (!user) throw createError.NotFound("User doesn't exist");

            const isValidPassword = await user.comparePassword(password);
            if (!isValidPassword) throw createError.Unauthorized("Incorrect password");

            const userId = user._id as string;

            const token = await AuthService.signToken(userId);

            res.status(200).json({
                msg: "Login successfully",
                metadata: {
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
