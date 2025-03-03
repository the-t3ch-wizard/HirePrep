import { z } from "zod";

export const socialsSchema = z.object({
  linkedin: z.string().url("Invalid URL").optional(),
  twitter: z.string().url("Invalid URL").optional(),
  website: z.string().url("Invalid URL").optional(),
  mail: z.string().email("Invalid email").optional(),
  resume: z.string().url("Invalid URL").optional(),
});