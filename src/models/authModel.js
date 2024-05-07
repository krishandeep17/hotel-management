import { z } from "zod";

export const SignUpSchema = z
  .object({
    fullName: z
      .string({ message: "Full name is required" })
      .trim()
      .min(3, { message: "Full name must be at least 3 characters" })
      .max(30, { message: "Full name must be at most 30 characters" }),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Invalid email address" })
      .trim()
      .toLowerCase(),
    password: z
      .string({ message: "Password is required" })
      .trim()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(20, { message: "Password must be at most 20 characters" }),
    confirmPassword: z.string({ message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" })
    .trim()
    .toLowerCase(),
  password: z
    .string({ message: "Password is required" })
    .trim()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password must be at most 20 characters" }),
});

export const UpdateUserDataSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" })
    .trim()
    .toLowerCase(),
  fullName: z
    .string({ message: "Full name is required" })
    .trim()
    .min(3, { message: "Full name must be at least 3 characters" })
    .max(30, { message: "Full name must be at most 30 characters" }),
  avatar: z.custom((val) => val instanceof File).or(z.string().optional()),
});
