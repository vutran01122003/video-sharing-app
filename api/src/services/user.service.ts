import createHttpError from "http-errors";
import User, { UserDocument } from "../models/user.model";
import { UserInput } from "../schema/user.schema";

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
            const user = await User.findOne({ user_name }).populate([
                {
                    path: "followers",
                    model: "user",
                    select: "avatar user_name"
                },
                {
                    path: "following",
                    model: "user",
                    select: "avatar user_name"
                }
            ]);

            if (!user) throw createHttpError.NotFound("User does not exist");

            return user;
        } catch (error) {
            throw error;
        }
    }

    static async getUsersByUserName(user_name: string): Promise<UserDocument[]> {
        try {
            const users = await User.find({
                user_name: {
                    $regex: user_name,
                    $options: "i"
                }
            }).populate([
                {
                    path: "followers",
                    model: "user",
                    select: "avatar user_name"
                },
                {
                    path: "following",
                    model: "user",
                    select: "avatar user_name"
                }
            ]);

            return users;
        } catch (error) {
            throw error;
        }
    }

    static async getUserById(user_id: string): Promise<UserDocument> {
        try {
            const user = await User.findById(user_id)
                .populate([
                    {
                        path: "followers",
                        model: "user",
                        select: "avatar user_name"
                    },
                    {
                        path: "following",
                        model: "user",
                        select: "avatar user_name"
                    }
                ])
                .select("-password");

            if (!user) throw createHttpError.NotFound("User does not exist");

            return user;
        } catch (error) {
            throw error;
        }
    }

    static async followUser(user_id: string, auth_id: string): Promise<UserDocument | null> {
        try {
            const user = await User.findById(user_id);

            if (!user) throw createHttpError.NotFound("User does not exist");

            const result = await Promise.all([
                User.findOneAndUpdate(
                    {
                        _id: auth_id,
                        following: { $nin: user_id }
                    },
                    {
                        $push: {
                            following: user_id
                        }
                    },
                    {
                        new: true
                    }
                )
                    .populate([
                        {
                            path: "followers",
                            model: "user",
                            select: "avatar user_name"
                        },
                        {
                            path: "following",
                            model: "user",
                            select: "avatar user_name"
                        }
                    ])
                    .select("-password"),
                User.findOneAndUpdate(
                    {
                        _id: user_id,
                        followers: { $nin: auth_id }
                    },
                    {
                        $push: {
                            followers: auth_id
                        }
                    },
                    {
                        new: true
                    }
                )
                    .populate([
                        {
                            path: "followers",
                            model: "user",
                            select: "avatar user_name"
                        },
                        {
                            path: "following",
                            model: "user",
                            select: "avatar user_name"
                        }
                    ])
                    .select("-password")
            ]);

            return result[0];
        } catch (error) {
            throw error;
        }
    }

    static async unfollowUser(user_id: string, auth_id: string): Promise<UserDocument | null> {
        try {
            const result = await Promise.all([
                User.findOneAndUpdate(
                    {
                        _id: auth_id,
                        following: { $in: user_id }
                    },

                    {
                        $pull: {
                            following: user_id
                        }
                    },
                    {
                        new: true
                    }
                )
                    .populate([
                        {
                            path: "followers",
                            model: "user",
                            select: "avatar user_name"
                        },
                        {
                            path: "following",
                            model: "user",
                            select: "avatar user_name"
                        }
                    ])
                    .select("-password"),
                User.findByIdAndUpdate(
                    {
                        _id: user_id,
                        followers: { $in: auth_id }
                    },
                    {
                        $pull: {
                            followers: auth_id
                        }
                    },
                    {
                        new: true
                    }
                )
                    .populate([
                        {
                            path: "followers",
                            model: "user",
                            select: "avatar user_name"
                        },
                        {
                            path: "following",
                            model: "user",
                            select: "avatar user_name"
                        }
                    ])
                    .select("-password")
            ]);

            return result[0];
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;
