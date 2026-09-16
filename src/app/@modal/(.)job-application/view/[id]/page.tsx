import { jobApplicationsMockData } from "@/app/page";
import { JobApplicationDialog } from "./JobApplicationDialog";

interface JobApplicationModalProps {
  params: Promise<{ id: string }>;
}

export default async function JobApplicationModal({
  params,
}: JobApplicationModalProps) {
  const { id } = await params;
  const jobApplication = jobApplicationsMockData.find((item) => item.id === id);

  if (!jobApplication) {
    return null;
  }

  return <JobApplicationDialog jobApplication={jobApplication} />;
}
