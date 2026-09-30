import Link from "next/link";
import { AlertCircleIcon, ArrowLeftIcon } from "lucide-react";
import { statusVariant } from "@/app/page";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface JobApplicationPageProps {
  params: Promise<{ id: string }>;
}

export default async function JobApplicationPage({ params }: JobApplicationPageProps) {
  const { id } = await params;

  const response = await fetch(`${process.env.API_BASE_URL}/api/job-applications/${id}`);
  const jobApplication = await response.json();

  if (!jobApplication) {
    return (
      <main className="mx-auto w-full max-w-2xl p-6">
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Job application not found</AlertTitle>
        </Alert>
      </main>
    );
  }

  const { position, company, status, appliedAt, url, notes } = jobApplication;

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4 -ml-2"
        render={<Link href="/" />}
        nativeButton={false}
      >
        <ArrowLeftIcon />
        Back to applications
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{position}</CardTitle>
          <CardDescription>@ {company}</CardDescription>
          <CardAction>
            <Badge variant={statusVariant[status as keyof typeof statusVariant] ?? "outline"}>
              {status}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-4">
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
            <dt className="text-muted-foreground">Applied</dt>
            <dd>{new Date(appliedAt).toLocaleDateString()}</dd>

            {url && (
              <>
                <dt className="text-muted-foreground">Posting</dt>
                <dd>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {url}
                  </a>
                </dd>
              </>
            )}
          </dl>

          {notes && (
            <div className="border-t pt-4">
              <p className="mb-1 text-sm font-medium">Notes</p>
              <p className="text-sm text-muted-foreground">{notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
