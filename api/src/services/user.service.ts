import createHttpError from "http-errors";
import User, { UserDocument } from "../models/user.model";
import { UserInput } from "../schema/createUser.schema";
import bcrypt from "bcrypt";

class UserService {
    static async create(userData: UserInput): Promise<UserDocument> {
        try {
            const createdUser: UserDocument = new User(userData);
            await createdUser.save();

            return createdUser.toObject();
        } catch (error) {
            throw error;
        }
    }

    static async getUserByUserName(user_name: string): Promise<UserDocument> {
        try {
            const user = await User.findOne({ user_name });

            if (!user) throw createHttpError.NotFound("User does not exist");

            return user;
        } catch (error) {
            throw error;
        }
    }

    static async getUserById(user_id: string): Promise<UserDocument> {
        try {
            const user = await User.findById(user_id).select("-password");

            if (!user) throw createHttpError.NotFound("User does not exist");

            return user;
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;
