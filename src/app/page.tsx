import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const jobApplicationsMockData = [
    {
        "id": "9a25040d-b40f-4a82-8ba4-1189460fd9d4",
        "company": "Raccoon gang",
        "position": "Frontend Developer",
        "status": "Rejected",
        "appliedAt": "2025-10-12T00:00:00.000Z",
        "url": null,
        "notes": null,
        "createdAt": "2026-09-02T10:25:05.407Z"
    },
    {
        "id": "f70dff21-6b10-4b71-9e2d-74938afb3892",
        "company": "GlobalLogic",
        "position": "Backend Developer",
        "status": "Rejected",
        "appliedAt": "2025-11-12T00:00:00.000Z",
        "url": null,
        "notes": null,
        "createdAt": "2026-09-03T07:03:54.852Z"
    },
    {
        "id": "794a64cb-d03d-4c19-85e5-3fa48997a7b3",
        "company": "P2H",
        "position": "PHP Developer",
        "status": "Rejected",
        "appliedAt": "2025-11-13T00:00:00.000Z",
        "url": null,
        "notes": null,
        "createdAt": "2026-09-03T07:31:15.160Z"
    },
    {
        "id": "b15dc611-0393-4420-8f26-2174fea63e74",
        "company": "SoftServe",
        "position": "Java Developer",
        "status": "Rejected",
        "appliedAt": "2025-11-16T00:00:00.000Z",
        "url": null,
        "notes": null,
        "createdAt": "2026-09-03T07:32:01.352Z"
    },
    {
        "id": "9a505f65-f072-40aa-b7cf-d4db4338dfc1",
        "company": "Vipagent",
        "position": "Rust Developer",
        "status": "Rejected",
        "appliedAt": "2025-11-18T00:00:00.000Z",
        "url": null,
        "notes": null,
        "createdAt": "2026-09-03T08:35:35.592Z"
    }
];

export const statusVariant = {
  Rejected: "destructive",
  Offer: "default",
  Interview: "secondary",
} as const;

export default function Home() {
  return (
    <main className="p-6">
      <Link href="/job-application/create" className="mb-4 inline-block">
        <Button>
          Create job application
        </Button>
      </Link>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobApplicationsMockData.map(({ id, company, position, status, appliedAt }) => (
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
              <CardFooter>
                <Link href={`/job-application/view/${id}`} className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </main>
  );
}
