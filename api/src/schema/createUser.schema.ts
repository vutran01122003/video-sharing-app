import { UserDocument } from "../models/user.model";
import z, { TypeOf } from "zod";

export const createUserSchema = z.object({
    body: z.object({
        user_name: z
            .string({
                required_error: "username is required"
            })
            .min(5, "username should be least 5 characters")
            .max(30, "username should be max 30 characters"),
        email: z
            .string({
                required_error: "email is required"
            })
            .email(),
        password: z
            .string({
                required_error: "password is required"
            })
            .min(5, "password should be least 5 characters")
            .max(30, "password should be max 30 characters")
    })
});

export type UserInput = TypeOf<typeof createUserSchema>["body"];