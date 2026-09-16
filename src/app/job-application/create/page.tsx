import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { statusVariant } from "@/app/page";

interface JobApplicationFormValues {
  company: string;
  position: string;
  status: keyof typeof statusVariant | "Applied";
  appliedAt: string;
  url: string | null;
  notes: string | null;
}

const statuses: Array<{ label: string; value: JobApplicationFormValues["status"] }> = [
  { label: "Applied", value: "Applied" },
  { label: "Interview", value: "Interview" },
  { label: "Offer", value: "Offer" },
  { label: "Rejected", value: "Rejected" },
];

const today = new Date().toISOString().split("T")[0];

export default function CreateJobApplicationPage() {
  return (
    <div className="mx-auto w-full max-w-2xl p-6">
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

      <h1 className="text-2xl font-semibold">Create Job Application</h1>
      <form className="mt-6">
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Position</FieldLegend>
            <FieldDescription>
              Who you applied to and what role you applied for
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="job-application-company">Company</FieldLabel>
                <Input
                  id="job-application-company"
                  name="company"
                  placeholder="Raccoon Gang"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="job-application-position">Position</FieldLabel>
                <Input
                  id="job-application-position"
                  name="position"
                  placeholder="Frontend Developer"
                  required
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="job-application-status">Status</FieldLabel>
                  <Select items={statuses} name="status" defaultValue="Applied">
                    <SelectTrigger id="job-application-status" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {statuses.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="job-application-applied-at">
                    Applied on
                  </FieldLabel>
                  <Input
                    id="job-application-applied-at"
                    name="appliedAt"
                    type="date"
                    defaultValue={today}
                    required
                  />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="job-application-url">Job posting URL</FieldLabel>
                <Input
                  id="job-application-url"
                  name="url"
                  type="url"
                  placeholder="https://example.com/careers/frontend-developer"
                />
                <FieldDescription>Optional</FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="job-application-notes">Notes</FieldLabel>
                <Textarea
                  id="job-application-notes"
                  name="notes"
                  placeholder="Add any additional comments"
                  className="resize-none"
                />
                <FieldDescription>Optional</FieldDescription>
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit">Save application</Button>
            <Button
              variant="outline"
              render={<Link href="/" />}
              nativeButton={false}
            >
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
