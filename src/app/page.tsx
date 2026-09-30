import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { components } from "@/types/api";

export const statusVariant = {
  Rejected: "destructive",
  Offer: "default",
  Interview: "secondary",
} as const;

type jobApplicationDto = components["schemas"]["JobApplicationEntity"];

export default async function Home() {
  const response = await fetch(`${process.env.API_BASE_URL}/api/job-applications`);
  const jobApplications: jobApplicationDto[] = await response.json();

  return (
    <main className="p-6">
      <Link href="/job-application/create" className="mb-4 inline-block">
        <Button>
          Create job application
        </Button>
      </Link>
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
                <Badge variant={statusVariant[status as keyof typeof statusVariant] ?? "outline"}>
                  {status}
                </Badge>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Link href={`/job-application/view/${id}`} className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
                <Button variant="destructive" className="w-full">Delete</Button>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </main>
  );
}
