import { type Request, type Response, type NextFunction } from "express";
import { UserInput } from "../schema/createUser.schema";
import { UserDocument } from "../models/user.model";
import UserService from "../services/user.service";
import { omit } from "lodash";

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
            console.log(error);
            next(error);
        }
    }
}

export default new UserController();
