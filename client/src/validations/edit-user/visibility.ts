import { z } from "zod";

export const profileVisibilityConfigSchema = z.object({
  profileVisibility: z.enum(["1", "0", "-1"]),
});

export const visibilitySchema = z.object({
  profileVisibilityConfig: profileVisibilityConfigSchema,
});