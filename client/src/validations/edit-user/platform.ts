import { z } from "zod";

export const platformSchema = z.object({
  leetcode: z.string().optional(),
  geeksforgeeks: z.string().optional(),
});