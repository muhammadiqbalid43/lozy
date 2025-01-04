import { z } from "zod";

export const secondOnboardingSchema = z.object({
  useCase: z.enum(["WORK", "STUDY", "PERSONAL_USER"], {
    required_error: "You need to select a notification type.",
  }),
});

export type SecondOnboardingSchema = z.infer<typeof secondOnboardingSchema>;
