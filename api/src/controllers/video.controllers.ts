import { type Request, type Response, type NextFunction } from "express";
import { keywordVideoSchema, UpdateVideoInput, UploadVideoInput } from "../schema/video.schema";
import VideoService from "../services/video.service";
import { VideoDocument } from "../models/video.model";
import { UserIdInput, VideoIdInput } from "../schema";
import { CommentDocument } from "../models/comment.model";
import { CommentIdListInput, CommentInput, UpdateCommentInput } from "../schema/comment.schema";

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

    async getVideos(req: Request<{}, {}, {}, keywordVideoSchema>, res: Response, next: NextFunction) {
        try {
            const keyword = req.query.keyword as string;
            const videos: VideoDocument[] = await VideoService.findAllVideo(keyword);

            res.status(200).json({
                message: "Get videos by keyword successfully",
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

    async likeVideo(req: Request<VideoIdInput>, res: Response, next: NextFunction) {
        try {
            const video_id: string = req.params.video_id;
            const { _id: user_id }: { _id: string } = res.locals.userData;

            const updatedVideo: VideoDocument | null = await VideoService.likeVideo(video_id, user_id);

            res.status(200).json({
                message: "Like video successful",
                data: updatedVideo
            });
        } catch (error) {
            next(error);
        }
    }

    async unlikeVideo(req: Request<VideoIdInput>, res: Response, next: NextFunction) {
        try {
            const video_id: string = req.params.video_id;
            const { _id: user_id }: { _id: string } = res.locals.userData;

            const updatedVideo: VideoDocument | null = await VideoService.unlikeVideo(video_id, user_id);

            res.status(200).json({
                message: "Unlike video successful",
                data: updatedVideo
            });
        } catch (error) {
            next(error);
        }
    }

    async createComment(req: Request<VideoIdInput, {}, CommentInput>, res: Response, next: NextFunction) {
        try {
            const video_id: string = req.params.video_id;
            const commentData: CommentInput = req.body;

            const comment: CommentDocument = await VideoService.createComment(video_id, commentData);

            res.status(201).json({ message: "Comment on video successfully", data: comment });
        } catch (error) {
            next(error);
        }
    }

    async getComments(req: Request<VideoIdInput, {}, {}>, res: Response, next: NextFunction) {
        try {
            const video_id: string = req.params.video_id;

            const comments: CommentDocument[] = await VideoService.getComments(video_id);

            res.status(200).json({ message: "Get Comments successfully", data: comments });
        } catch (error) {
            next(error);
        }
    }

    async updateCommentById(
        req: Request<CommentIdListInput, {}, UpdateCommentInput>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const comment_id: string = req.params.comment_id;
            const updatedCommentData: UpdateCommentInput = req.body;

            const updatedComment: CommentDocument = await VideoService.updateCommentById(
                comment_id,
                updatedCommentData
            );

            res.status(200).json({
                message: "Update comment successfully",
                data: updatedComment
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteCommentById(req: Request<CommentIdListInput, {}, {}>, res: Response, next: NextFunction) {
        try {
            const comment_id: string = req.params.comment_id;
            const video_id: string = req.params.video_id;

            await VideoService.deleteCommentById(comment_id, video_id);

            res.status(200).json({ message: "Delete comment successfully" });
        } catch (error) {
            next(error);
        }
    }
}

export default new VideoController();
