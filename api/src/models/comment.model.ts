import mongoose, { Connection, Schema, Document } from "mongoose";
import database from "../dbs/database.connection";
import { UserDocument } from "./user.model";

const conn: Connection = database.getConnection();
const [DOC, COL] = ["comment", "comments"];

export interface CommentDocument extends Document {
    original_comment: CommentDocument["_id"];
    content: string;
    user: UserDocument["_id"];
    reply: CommentDocument["_id"][];
    likes: UserDocument["_id"][];
}

const commentSchema = new Schema<CommentDocument>(
    {
        original_comment: {
            type: mongoose.Types.ObjectId,
            ref: DOC
        },
        content: {
            type: String,
            required: true,
            maxlength: 500
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: true
        },
        reply: {
            type: [
                {
                    type: mongoose.Types.ObjectId,
                    ref: DOC
                }
            ],
            default: []
        },
        likes: {
            type: [
                {
                    type: mongoose.Types.ObjectId,
                    ref: "User"
                }
            ],
            default: []
        }
    },
    {
        collection: COL,
        timestamps: true
    }
);

const Comment = conn.model<CommentDocument>(DOC, commentSchema);

export default Comment;
