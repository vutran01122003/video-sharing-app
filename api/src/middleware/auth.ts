import { type Request, type Response, type NextFunction } from "express";
import createHttpError from "http-errors";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { VerifyTokenResult } from "../shared";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string = req.headers["x-token"] as string;
        if (!token) throw createHttpError.Unauthorized("Login again");

        const { data, isExpired }: VerifyTokenResult = await AuthService.verifyToken(token);

        if (!data) throw createHttpError.BadRequest();
        if (isExpired) throw createHttpError.Unauthorized("Login again");

        const userId = data.userId as string;
        const user = await UserService.getUserById(userId);
        res.locals.userData = user;

        next();
    } catch (error) {
        next(error);
    }
};
