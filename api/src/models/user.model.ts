import dotenv from "dotenv";
import bcrypt from "bcrypt";
import mongoose, { Connection, Schema, Document, CallbackWithoutResultAndOptionalError } from "mongoose";
import database from "../dbs/database.connection";
dotenv.config();

const conn: Connection = database.getConnection();
const { SALT_ROUND } = process.env;

export interface UserDocument extends Document {
    user_name: string;
    email: string;
    password: string;
    follower: [];
    following: [];
    comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>({
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    follower: {
        type: [{ ref: "user", type: mongoose.Types.ObjectId }],
        default: []
    },
    following: {
        type: [{ ref: "user", type: mongoose.Types.ObjectId }],
        default: []
    }
});

userSchema.methods.comparePassword = async function (this: UserDocument, candidatePassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

userSchema.pre("save", async function (this: UserDocument, next: CallbackWithoutResultAndOptionalError) {
    try {
        const round = SALT_ROUND as unknown as number;
        const salt = await bcrypt.genSalt(+round);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error as Error);
    }
});

const User = conn.model<UserDocument>("users", userSchema);

export default User;
