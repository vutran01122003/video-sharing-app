import User, { UserDocument } from "../models/user.model";
import { UserInput } from "../schema/createUser.schema";

class UserService {
    static async create(userData: UserInput) {
        try {
            const createdUser: UserDocument = new User(userData);
            await createdUser.save();

            return createdUser.toObject();
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;
