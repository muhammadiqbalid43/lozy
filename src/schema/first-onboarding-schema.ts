import { z } from "zod";

export const firstOnboardingSchema = z.object({
  name: z
    .string()
    .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
      message: "Username must only contain letters and digits",
    })
    .optional(),
});

export type FirstOnboardingSchema = z.infer<typeof firstOnboardingSchema>;
