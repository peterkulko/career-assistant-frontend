import { JobApplicationDialog } from "./JobApplicationDialog";

interface JobApplicationModalProps {
  params: Promise<{ id: string }>;
}

export default async function JobApplicationModal({
  params,
}: JobApplicationModalProps) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.API_BASE_URL}/api/job-applications/${id}`,
  );
  const jobApplication = await response.json();

  if (!jobApplication) {
    return null;
  }

  return <JobApplicationDialog jobApplication={jobApplication} />;
}
