import Link from "next/link";
import { AlertCircleIcon, InfoIcon } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ConfirmDialog } from "@/components/ConfirmDialog";

import type { components } from "@/types/api";
import { deleteJobApplication } from "@/app/actions";
import { statusVariant } from "@/lib/job-application";

export const metadata: Metadata = {
  title: "Career Assistant - Job Applications",
  description: "Track and manage your job applications in one place.",
};

type jobApplicationDto = components["schemas"]["JobApplicationEntity"];

async function getJobApplications(): Promise<jobApplicationDto[] | null> {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/job-applications`,
    );
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

function JobApplicationList({
  jobApplications,
}: {
  jobApplications: jobApplicationDto[];
}) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {jobApplications.map(({ id, company, position, status, appliedAt }) => (
        <li key={id}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>{position}</CardTitle>
              <CardDescription>@ {company}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Applied {new Date(appliedAt).toLocaleDateString()}
              </span>
              <Badge
                variant={
                  statusVariant[status as keyof typeof statusVariant] ??
                  "outline"
                }
              >
                {status}
              </Badge>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Link href={`/job-application/view/${id}`} className="w-full">
                <Button className="w-full">View Details</Button>
              </Link>
              <ConfirmDialog
                title="Delete this job application?"
                description={`This will permanently delete your application for ${position} at ${company}. This action cannot be undone.`}
                trigger={
                  <Button className="w-full" variant="destructive">
                    Delete
                  </Button>
                }
                cancelLabel="Keep application"
                confirmLabel="Delete"
                pendingLabel="Deleting..."
                onConfirm={deleteJobApplication.bind(null, id)}
              />
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export default async function Home() {
  const jobApplications = await getJobApplications();

  return (
    <main>
      <Link href="/job-application/create" className="mb-4 inline-block">
        <Button>Create job application</Button>
      </Link>
      {jobApplications === null ? (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Unable to load job applications</AlertTitle>
          <AlertDescription>
            Something went wrong while contacting the server. Please try again
            later.
          </AlertDescription>
        </Alert>
      ) : jobApplications.length === 0 ? (
        <Alert>
          <InfoIcon />
          <AlertTitle>No job applications yet</AlertTitle>
          <AlertDescription>
            Create your first job application to start tracking your job search.
          </AlertDescription>
        </Alert>
      ) : (
        <JobApplicationList jobApplications={jobApplications} />
      )}
    </main>
  );
}
