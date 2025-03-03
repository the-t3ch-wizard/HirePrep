import { z } from "zod";

export const accountsInfoSchema = z.object({
  profileName: z.string().min(6, "Profile name must be atleast 6 characters long"),
});