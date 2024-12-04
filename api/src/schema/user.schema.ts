import z, { TypeOf } from "zod";

export const userSchema = z.object({
    body: z
        .object({
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
                .max(30, "password should be max 30 characters"),
            confirm: z.string({})
        })
        .refine((data) => data.password === data.confirm, {
            message: "Passwords don't match",
            path: ["confirm"]
        })
});

export const loginSchema = z.object({
    body: z.object({
        user_name: z
            .string({
                required_error: "username is required"
            })
            .min(5, "username should be least 5 characters")
            .max(30, "username should be max 30 characters"),

        password: z
            .string({
                required_error: "password is required"
            })
            .min(5, "password should be least 5 characters")
            .max(30, "password should be max 30 characters")
    })
});

export const usernameSchema = z.object({
    query: z.object({
        user_name: z.string().max(500, "user_name shoudle be max 500 characters")
    })
});

export type LoginInput = TypeOf<typeof loginSchema>["body"];

export type UserInput = Omit<TypeOf<typeof userSchema>["body"], "confirm">;

export type usernameSchema = TypeOf<typeof usernameSchema>["query"];
