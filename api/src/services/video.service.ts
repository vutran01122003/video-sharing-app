import createHttpError from "http-errors";
import Video, { VideoDocument } from "../models/video.model";
import { UpdateVideoInput, UploadVideoInput } from "../schema/video.schema";

class VideoService {
    static async uploadVideo(videoUploadData: UploadVideoInput): Promise<VideoDocument> {
        try {
            const video = await Video.create(videoUploadData);
            return video.toObject();
        } catch (error) {
            throw error;
        }
    }

    static async findAllVideoByUserId(user_id: string): Promise<VideoDocument[]> {
        try {
            const videos = await Video.find({ user_id });
            return videos;
        } catch (error) {
            throw error;
        }
    }

    static async findVideoById(video_id: string): Promise<VideoDocument> {
        try {
            const video: VideoDocument | null = await Video.findById(video_id);

            if (!video) throw createHttpError.NotFound("Video doesn't exist");

            return video?.toObject();
        } catch (error) {
            throw error;
        }
    }

    static async updateVideoById(video_id: string, updatedVideoData: UpdateVideoInput): Promise<VideoDocument> {
        try {
            const updatedVideo: VideoDocument | null = await Video.findByIdAndUpdate(video_id, updatedVideoData, {
                new: true
            });

            if (!updatedVideo) throw createHttpError.NotFound("Video doesn't exist");

            return updatedVideo?.toObject();
        } catch (error) {
            throw error;
        }
    }

    static async deleteVideoById(video_id: string): Promise<void> {
        try {
            const result = await Video.findByIdAndDelete(video_id);
            if (!result) throw createHttpError.NotFound("Video doesn't exist");
        } catch (error) {
            throw error;
        }
    }
}

export default VideoService;
