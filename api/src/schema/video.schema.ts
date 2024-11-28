import { isValidObjectId } from "mongoose";
import { z, TypeOf } from "zod";

export const uploadedVideoSchema = z.object({
    body: z.object({
        thumbnail: z.string().optional(),
        audioData: z
            .object({
                start_time: z.number(),
                end_time: z.number(),
                audio: z.string().refine((data) => isValidObjectId(data), {
                    path: ["audio_id"],
                    message: "Invalid audio_id"
                })
            })
            .refine((data) => data.end_time > data.start_time, {
                path: ["end_time", "start_time"],
                message: "End time must be greater than start time"
            })
            .optional(),
        user: z.string({ required_error: "user_id is required" }),
        video_id: z.string({ required_error: "video_id is required" }),
        video_url: z.string({ required_error: "video_url is required" }),
        title: z.string({ required_error: "title is required" }).max(500, "Title shoudle be max 500 characters"),
        description: z.string().max(500, "Description shoudle be max 500 characters").optional(),
        hashtags: z.array(z.string()).optional(),
        tagLink: z.array(z.string()).optional(),
        is_private: z.boolean().optional(),
        is_comment_allowed: z.boolean().optional()
    })
});

export const updatedVideoSchema = z.object({
    body: z.object({
        title: z.string().max(500, "Title shoudle be max 500 characters").optional(),
        description: z.string().max(500, "Description shoudle be max 500 characters").optional(),
        hashtags: z.array(z.string()).optional(),
        tagLink: z.array(z.string()).optional(),
        is_private: z.boolean().optional()
    })
});

export type UpdateVideoInput = TypeOf<typeof updatedVideoSchema>["body"];
export type UploadVideoInput = TypeOf<typeof uploadedVideoSchema>["body"];
