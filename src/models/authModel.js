import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Enter a valid email" })
    .trim()
    .toLowerCase(),
  password: z
    .string({ message: "Password is required" })
    .trim()
    .min(8, { message: "Password must contain at least 8 characters" })
    .max(20, { message: "Password must contain at most 20 characters" }),
});
