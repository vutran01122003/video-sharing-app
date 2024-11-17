import mongoose, {
    Connection,
    Mongoose,
    Schema,
    Document,
    ObjectId,
    CallbackWithoutResultAndOptionalError
} from "mongoose";
import database from "../dbs/database.connection";
import bcrypt from "bcrypt";

const conn: Connection = database.getConnection();

export interface UserDocument extends Document {
    user_name: string;
    email: string;
    password: string;
    follower: [];
    following: [];
}

const userSchema = new Schema({
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        lowercase: true
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

userSchema.pre("save", function (this: UserDocument, next: CallbackWithoutResultAndOptionalError) {
    try {
        this.password = bcrypt.hashSync(this.password, 10);
        next();
    } catch (error: any) {
        next(error);
    }
});
const User = conn.model<UserDocument>("users", userSchema);

export default User;
