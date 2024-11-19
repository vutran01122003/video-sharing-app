import { Connection, Schema, Document } from "mongoose";
import database from "../dbs/database.connection";

const conn: Connection = database.getConnection();
const [DOC, COL] = ["audio", "audios"];

export interface AudioDocument extends Document {
    thumbnail: string;
    audio_url: string;
    title: string;
    duration: number;
}

const audioSchema = new Schema<AudioDocument>(
    {
        thumbnail: String,
        audio_url: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
            maxlength: 500
        },
        duration: Number
    },
    {
        collection: COL,
        timestamps: true
    }
);

const Audio = conn.model<AudioDocument>(COL, audioSchema);

export default Audio;
