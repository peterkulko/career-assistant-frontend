"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { statusVariant } from "@/lib/job-application";

interface JobApplicationDialogProps {
  jobApplication: {
    position: string;
    company: string;
    status: string;
    appliedAt: string;
    url: string | null;
    notes: string | null;
  };
}

export function JobApplicationDialog({
  jobApplication,
}: JobApplicationDialogProps) {
  const router = useRouter();
  const { position, company, status, appliedAt, url, notes } = jobApplication;

  return (
    <Dialog open onOpenChange={(open) => !open && router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{position}</DialogTitle>
          <DialogDescription>@ {company}</DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Applied {new Date(appliedAt).toLocaleDateString("en-US")}
          </span>
          <Badge
            variant={
              statusVariant[status as keyof typeof statusVariant] ?? "outline"
            }
          >
            {status}
          </Badge>
        </div>

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            {url}
          </a>
        )}

        {notes && <p className="text-sm text-muted-foreground">{notes}</p>}
      </DialogContent>
    </Dialog>
  );
}
