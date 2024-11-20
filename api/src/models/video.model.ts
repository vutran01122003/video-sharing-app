import mongoose, { Connection, Schema, Document, CallbackWithoutResultAndOptionalError } from "mongoose";
import database from "../dbs/database.connection";
import { UserDocument } from "./user.model";
import { CommentDocument } from "./comment.model";
import { AudioDocument } from "./audio.model";

const conn: Connection = database.getConnection();
const [DOC, COL] = ["video", "videos"];

export interface VideoDocument extends Document {
    thumbnail: String;
    user: UserDocument["_id"];
    video_id: string;
    video_url: string;
    title: string;
    description: string;
    audio_id: AudioDocument["_id"];
    hashtags: string[];
    tagLink: UserDocument["_id"][];
    is_private: boolean;
    is_comment_allowed: boolean;
    likes: UserDocument["_id"][];
    views: number;
    comments: CommentDocument["id"][];
}

const videoSchema = new Schema<VideoDocument>(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "user"
        },
        thumbnail: {
            type: String,
            default:
                "https://res.cloudinary.com/dzm0nupxy/image/upload/v1732095694/video_sharing_app/default/dchhsrpvkachmjmcv6bv.jpg"
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
            ref: "audio"
        },
        hashtags: {
            type: [String],
            default: []
        },
        tagLink: {
            type: [
                {
                    type: mongoose.Types.ObjectId,
                    ref: "user"
                }
            ],
            default: []
        },
        likes: {
            type: [
                {
                    type: mongoose.Types.ObjectId,
                    ref: "user"
                }
            ],
            default: []
        },
        views: {
            type: Number,
            default: 0
        },
        comments: {
            type: [
                {
                    type: mongoose.Types.ObjectId,
                    ref: "comment"
                }
            ],
            default: []
        },
        is_comment_allowed: {
            type: Boolean,
            default: true
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
