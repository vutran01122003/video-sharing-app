import { isValidObjectId } from "mongoose";
import { TypeOf, z } from "zod";

export const commentSchema = z.object({
    body: z.object({
        original_comment: z
            .string()
            .refine((data) => isValidObjectId(data), {
                path: ["original_comment"],
                message: "Invalid original_comment"
            })
            .optional(),
        content: z.string({ required_error: "Content is required" }).max(500, "Content should be max 500 characters"),
        user: z.string({ required_error: "UserId is required" }).refine((data) => isValidObjectId(data), {
            path: ["user"],
            message: "Invalid userId"
        })
    })
});

export const updateCommentSchema = z.object({
    body: z.object({
        content: z.string({ required_error: "Content is required" }).max(500, "Content should be max 500 characters")
    })
});

export const commentIdListSchema = z.object({
    params: z.object({
        video_id: z
            .string({ required_error: "video_id is required" })
            .refine((data) => isValidObjectId(data), { path: ["video_id"], message: "Invalid video_id" }),
        comment_id: z.string({ required_error: "comment_id is required" }).refine((data) => isValidObjectId(data), {
            path: ["comment_id"],
            message: "Invalid comment_id"
        })
    })
});

export type CommentInput = TypeOf<typeof commentSchema>["body"];
export type UpdateCommentInput = TypeOf<typeof updateCommentSchema>["body"];
export type CommentIdListInput = TypeOf<typeof commentIdListSchema>["params"];
