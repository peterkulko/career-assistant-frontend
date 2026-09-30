"use server";

import { createJobApplicationSchema } from "./scema";

export type CreateJobApplicationState = {
  errors?: Record<string, string[] | undefined>;
  success?: boolean;
};

export async function createJobApplication(
  _prevState: CreateJobApplicationState,
  formData: FormData,
): Promise<CreateJobApplicationState> {
  const parsed = createJobApplicationSchema.safeParse({
    company: formData.get("company"),
    position: formData.get("position"),
    status: formData.get("status"),
    appliedAt: formData.get("appliedAt"),
    url: formData.get("url"),
    notes: formData.get("notes"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  let response: Response;
  try {
    response = await fetch(`${process.env.API_BASE_URL}/api/job-applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...parsed.data,
        appliedAt: new Date(parsed.data.appliedAt).toISOString(),
        url: parsed.data.url || undefined,
        notes: parsed.data.notes || undefined,
      }),
    });
  } catch {
    return {
      errors: { form: ["Unable to reach the server. Please try again later."] },
    };
  }

  if (!response.ok) {
    return {
      errors: {
        form: [`Failed to create job application: ${response.status}`],
      },
    };
  }

  return { success: true };
}
