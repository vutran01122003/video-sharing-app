import { isValidObjectId } from "mongoose";
import { z, TypeOf } from "zod";

export const userIdSchema = z.object({
    params: z
        .object({
            user_id: z.string({
                required_error: "user_id is required"
            })
        })
        .refine((data) => isValidObjectId(data.user_id), {
            path: ["user_id"],
            message: "Invalid user_id"
        })
});

export const videoIdSchema = z.object({
    params: z
        .object({
            video_id: z.string({
                required_error: "video_id is required"
            })
        })
        .refine((data) => isValidObjectId(data.video_id), {
            path: ["video_id"],
            message: "Invalid video_id"
        })
});

export const audioIdSchema = z.object({
    params: z
        .object({
            audio_id: z.string({
                required_error: "audio_id is required"
            })
        })
        .refine((data) => isValidObjectId(data.audio_id), {
            path: ["audio_id"],
            message: "Invalid audio_id"
        })
});

export const commentIdSchema = z.object({
    params: z
        .object({
            comment_id: z.string({
                required_error: "comment_id is required"
            })
        })
        .refine((data) => isValidObjectId(data.comment_id), {
            path: ["comment_id"],
            message: "Invalid comment_id"
        })
});

export type UserIdInput = TypeOf<typeof userIdSchema>["params"];
export type VideoIdInput = TypeOf<typeof videoIdSchema>["params"];
export type AudioIdInput = TypeOf<typeof audioIdSchema>["params"];
export type CommentIdInput = TypeOf<typeof commentIdSchema>["params"];
