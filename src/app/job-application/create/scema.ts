import { z } from "zod";

export const createJobApplicationSchema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  status: z.enum(["Applied", "Interview", "Offer", "Rejected"]),
  appliedAt: z.string().min(1, "Date is required"),
  url: z.string().url("Invalid URL").optional().or(z.literal("")),
  notes: z.string().optional(),
});

export type CreateJobApplicationFormValues = z.infer<
  typeof createJobApplicationSchema
>;
