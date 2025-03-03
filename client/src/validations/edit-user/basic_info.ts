import { z } from "zod";

export const basicInfoSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  bio: z.string().max(200, "Bio must be less than 200 characters").trim().optional(),

  gender: z.enum(["male", "female", "other"]).optional(),
  birthDate: z.date().optional(),
  country: z.string().optional(),

  college: z.string().optional(),
  degree: z.string().optional(),
});