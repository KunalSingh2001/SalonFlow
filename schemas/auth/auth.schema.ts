import { z } from "zod";

export const registerSchema = z.object({
    busniess_name: z
        .string()
        .min(3, "First name must be at least 3 characters"),

    owner_name: z
        .string()
        .min(3, "Last name must be at least 3 characters"),

    email: z
        .string()
        .email("Please enter a valid email address"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
});

export type RegisterBody = z.infer<typeof registerSchema>;