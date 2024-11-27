import { TypeOf, z } from "zod";

export const audioSchema = z.object({
    body: z.object({
        thumbnail: z.string().optional(),
        audio_url: z.string({ required_error: "audio_url is required" }),
        title: z.string().max(500, "Title should be max 500 characters"),
        duration: z.number({ required_error: "duration is required" })
    })
});

export type AudioInput = TypeOf<typeof audioSchema>["body"];
