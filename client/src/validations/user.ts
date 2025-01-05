import { z } from 'zod';

export const userSignupSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required"),
  email: z.
    string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters long"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: z
    .string()
    .min(6, "Confirm Password must match the password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

export const userLoginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
});

// Types inferred from schemas
export type UserSignup = z.infer<typeof userSignupSchema>;
export type UserLogin = z.infer<typeof userLoginSchema>;
