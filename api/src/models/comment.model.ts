import mongoose, { Connection, Schema, Document } from "mongoose";
import database from "../dbs/database.connection";
import { UserDocument } from "./user.model";
import { VideoDocument } from "./video.model";

const conn: Connection = database.getConnection();
const [DOC, COL] = ["comment", "comments"];

export interface CommentDocument extends Document {
    video: VideoDocument["_id"];
    original_comment: CommentDocument["_id"];
    content: string;
    user: UserDocument["_id"];
    reply: CommentDocument["_id"][];
    likes: UserDocument["_id"][];
}

const commentSchema = new Schema<CommentDocument>(
    {
        video: {
            type: mongoose.Types.ObjectId,
            ref: "video",
            required: true
        },
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
