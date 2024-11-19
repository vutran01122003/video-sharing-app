import mongoose, { Connection, Schema, Document, CallbackWithoutResultAndOptionalError } from "mongoose";
import database from "../dbs/database.connection";
import { UserDocument } from "./user.model";
import { CommentDocument } from "./comment.model";
import { AudioDocument } from "./audio.model";

const conn: Connection = database.getConnection();
const [DOC, COL] = ["video", "videos"];

export interface VideoDocument extends Document {
    user_id: UserDocument["_id"];
    video_id: string;
    video_url: string;
    title: string;
    description: string;
    audio_id: AudioDocument["_id"];
    hashtags: string[];
    tagLink: UserDocument["_id"][];
    is_private: boolean;
    likes: UserDocument["_id"][];
    comments: CommentDocument["id"][];
}

const videoSchema = new Schema<VideoDocument>(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        video_id: {
            type: String,
            required: true
        },
        video_url: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
            maxLength: 500
        },
        description: {
            type: String,
            maxLength: 500
        },
        audio_id: {
            type: mongoose.Types.ObjectId,
            ref: "Audio"
        },
        hashtags: {
            type: [String],
            default: []
        },
        tagLink: {
            type: [
                {
                    type: mongoose.Types.ObjectId,
                    ref: "User"
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
        },
        comments: {
            type: [
                {
                    type: mongoose.Types.ObjectId,
                    ref: "Comment"
                }
            ],
            default: []
        },
        is_private: {
            type: Boolean,
            default: false
        }
    },
    {
        collection: COL,
        timestamps: true
    }
);

const Video = conn.model<VideoDocument>(COL, videoSchema);

export default Video;
