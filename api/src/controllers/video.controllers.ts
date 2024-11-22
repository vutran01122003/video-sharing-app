import { type Request, type Response, type NextFunction } from "express";
import { UpdateVideoInput, UploadVideoInput } from "../schema/video.schema";
import VideoService from "../services/video.service";
import { VideoDocument } from "../models/video.model";
import { UserIdInput, VideoIdInput } from "../schema";

class VideoController {
    async uploadVideo(req: Request<{}, {}, UploadVideoInput>, res: Response, next: NextFunction) {
        try {
            const uploadVideoData: UploadVideoInput = req.body;
            const video: VideoDocument = await VideoService.uploadVideo(uploadVideoData);

            res.status(201).json({
                message: "Upload video successfully",
                data: video
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllVideoByUserId(req: Request<UserIdInput, {}, {}>, res: Response, next: NextFunction) {
        try {
            const user_id: string = req.params.user_id;
            const videos: VideoDocument[] = await VideoService.findAllVideoByUserId(user_id);

            res.status(200).json({
                message: "Get videos by user id successfully",
                data: videos
            });
        } catch (error) {
            next(error);
        }
    }

    async getVideoById(req: Request<VideoIdInput, {}, {}>, res: Response, next: NextFunction) {
        try {
            const video_id: string = req.params.video_id;

            const video: VideoDocument = await VideoService.findVideoById(video_id);

            res.status(200).json({
                message: "Get videos by user id successfully",
                data: video
            });
        } catch (error) {
            next(error);
        }
    }

    async updateVideoById(req: Request<VideoIdInput, {}, UpdateVideoInput>, res: Response, next: NextFunction) {
        try {
            const video_id: string = req.params.video_id;
            const updatedVideoData: UpdateVideoInput = req.body;

            const updatedVideo: VideoDocument = await VideoService.updateVideoById(video_id, updatedVideoData);

            res.status(200).json({
                message: "Update video successfully",
                data: updatedVideo
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteVideoById(req: Request<VideoIdInput, {}, {}>, res: Response, next: NextFunction) {
        try {
            const video_id: string = req.params.video_id;

            await VideoService.deleteVideoById(video_id);

            res.status(200).json({
                message: "Delete video successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new VideoController();
