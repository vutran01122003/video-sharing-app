import createHttpError from "http-errors";
import Video, { VideoDocument } from "../models/video.model";
import { UpdateVideoInput, UploadVideoInput } from "../schema/video.schema";
import Comment, { CommentDocument } from "../models/comment.model";
import { CommentInput, UpdateCommentInput } from "../schema/comment.schema";
import User from "../models/user.model";
import { checkObjectId } from "../utils";

class VideoService {
    static async uploadVideo(videoUploadData: UploadVideoInput): Promise<VideoDocument> {
        try {
            const video = await Video.create(videoUploadData);
            await video.populate([
                {
                    path: "user",
                    model: "user",
                    select: "-password"
                },
                {
                    path: "audioData",
                    populate: {
                        path: "audio"
                    }
                }
            ]);
            return video.toObject();
        } catch (error) {
            throw error;
        }
    }

    static async findAllVideoByUserId(user_id: string): Promise<VideoDocument[]> {
        try {
            const videos = await Video.find({ user: user_id })
                .sort({ createdAt: -1 })
                .populate([
                    {
                        path: "user",
                        model: "user",
                        select: "-password"
                    },
                    {
                        path: "audioData",
                        populate: {
                            path: "audio"
                        }
                    }
                ]);
            return videos;
        } catch (error) {
            throw error;
        }
    }

    static async findAllVideo(keyword: string): Promise<VideoDocument[]> {
        try {
            const filterData = !keyword ? {} : { title: { $regex: keyword, $options: "i" } };

            const videos = await Video.find(filterData)
                .sort({ createdAt: -1 })
                .populate([
                    {
                        path: "user",
                        model: "user",
                        select: "-password"
                    },
                    {
                        path: "audioData",
                        populate: {
                            path: "audio"
                        }
                    }
                ]);
            return videos;
        } catch (error) {
            throw error;
        }
    }

    static async findVideoById(video_id: string): Promise<VideoDocument> {
        try {
            const video: VideoDocument | null = await Video.findById(video_id).populate([
                {
                    path: "user",
                    model: "user",
                    select: "-password"
                },
                {
                    path: "audioData",
                    populate: {
                        path: "audio"
                    }
                }
            ]);

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

            const populatedVideo = await updatedVideo.populate([
                {
                    path: "user",
                    model: "user",
                    select: "-password"
                },
                {
                    path: "audioData",
                    populate: {
                        path: "audio"
                    }
                }
            ]);

            return populatedVideo?.toObject();
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

    static async likeVideo(video_id: string, user_id: string): Promise<VideoDocument | null> {
        try {
            if (!checkObjectId(user_id)) throw createHttpError.BadRequest("Invalid user_id");

            const updatedVideo: VideoDocument | null = await Video.findOneAndUpdate(
                {
                    _id: video_id,
                    likes: { $nin: video_id }
                },
                {
                    $push: {
                        likes: user_id
                    }
                },
                { new: true }
            );

            let populatedVideo = null;
            if (updatedVideo) populatedVideo = await updatedVideo.populate("user", "-password");

            return populatedVideo;
        } catch (error) {
            throw error;
        }
    }

    static async unlikeVideo(video_id: string, user_id: string): Promise<VideoDocument | null> {
        try {
            if (!checkObjectId(user_id)) throw createHttpError.BadRequest("Invalid user_id");

            const updatedVideo = await Video.findOneAndUpdate(
                {
                    _id: video_id,
                    likes: { $in: user_id }
                },
                {
                    $pull: {
                        likes: user_id
                    }
                },
                { new: true }
            );

            let populatedVideo = null;
            if (updatedVideo) populatedVideo = await updatedVideo.populate("user", "-password");

            return populatedVideo;
        } catch (error) {
            throw error;
        }
    }

    static async increaseView(video_id: string) {
        try {
            await Video.findByIdAndUpdate(video_id, {
                $inc: { views: 1 }
            });
        } catch (error) {
            throw error;
        }
    }

    static async createComment(video_id: string, commentData: CommentInput): Promise<CommentDocument> {
        try {
            const [video, user] = await Promise.all([Video.findById(video_id), User.findById(commentData.user)]);

            if (!video || !user) throw createHttpError.NotFound("Video doesn't exist");

            const comment: CommentDocument = await Comment.create({
                video: video_id,
                ...commentData
            });

            const populatedComment = await comment.populate("user", "avatar user_name");

            return populatedComment.toObject();
        } catch (error) {
            throw error;
        }
    }

    static async getComments(video_id: string): Promise<CommentDocument[]> {
        try {
            const comments = Comment.find({ video: video_id }).populate({
                path: "user",
                model: "user",
                select: "user_name avatar"
            });
            return comments;
        } catch (error) {
            throw error;
        }
    }

    static async updateCommentById(comment_id: string, commentData: UpdateCommentInput): Promise<CommentDocument> {
        try {
            const comment: CommentDocument | null = await Comment.findByIdAndUpdate(comment_id, commentData, {
                new: true
            });

            if (!comment) throw createHttpError.NotFound("Commnet doesn't exist");

            const populatedComment = await comment.populate("user", "user_name avatar");

            return populatedComment;
        } catch (error) {
            throw error;
        }
    }

    static async deleteCommentById(comment_id: string, video_id: string): Promise<void> {
        try {
            const video = await Video.findById(video_id);
            if (!video) throw createHttpError.NotFound("Video doesn't exist");

            const result = await Comment.findByIdAndDelete(comment_id);
            if (!result) throw createHttpError.NotFound("Comment doesn't exist");
        } catch (error) {
            throw error;
        }
    }
}

export default VideoService;
