'use server'

import { revalidatePath } from "next/cache";

export async function deleteJobApplication(jobApplicationId: string): Promise<{ error: string } | undefined> {
    if (!jobApplicationId) {
        return { error: "Missing job application id." };
    }

    try {
        const response = await fetch(`${process.env.API_BASE_URL}/api/job-applications/${encodeURIComponent(jobApplicationId)}`, {
            method: "DELETE",
            signal: AbortSignal.timeout(10_000),
        });

        if (!response.ok) {
            return { error: "Unable to delete the job application. Please try again." };
        }
    } catch {
        return { error: "Unable to reach the server. Please try again later." };
    }

    revalidatePath('/');
}
