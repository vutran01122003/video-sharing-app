import { z, TypeOf } from "zod";

export const uploadedVideoSchema = z.object({
    body: z.object({
        thumbnail: z.string().optional(),
        audio_id: z.string().optional(),
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
