import { type Request, type Response, type NextFunction } from "express";
import createHttpError from "http-errors";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { VerifyInput } from "../shared";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.headers["x-token"] as string;
        if (!token) createHttpError.Unauthorized("Login again!");

        const decode: VerifyInput = await AuthService.verifyToken(token);
        const userId = decode.userId as string;

        if (decode.isExpired) throw createHttpError.Unauthorized("Login again!");

        const user = await UserService.getUserById(userId);

        res.locals.userData = user;
        next();
    } catch (error) {
        next(error);
    }
};
