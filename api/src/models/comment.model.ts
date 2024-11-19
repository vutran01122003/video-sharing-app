import mongoose, { Connection, Schema, Document } from "mongoose";
import database from "../dbs/database.connection";
import { UserDocument } from "./user.model";

const conn: Connection = database.getConnection();
const [DOC, COL] = ["comment", "comments"];

export interface CommentDocument extends Document {
    original_comment_id: CommentDocument["_id"];
    content: string;
    userId: UserDocument["_id"];
    reply: CommentDocument["_id"][];
    likes: UserDocument["_id"][];
}

const commentSchema = new Schema<CommentDocument>(
    {
        original_comment_id: {
            type: mongoose.Types.ObjectId,
            ref: DOC
        },
        content: {
            type: String,
            required: true,
            maxlength: 500
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
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

const Comment = conn.model<CommentDocument>(COL, commentSchema);

export default Comment;
