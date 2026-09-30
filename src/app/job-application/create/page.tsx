'use client'

import { startTransition, useActionState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeftIcon, CircleXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { createJobApplication, type CreateJobApplicationState } from "./actions";
import { createJobApplicationSchema, type CreateJobApplicationFormValues } from "./scema";

const initialState: CreateJobApplicationState = {};

const statuses: Array<{ label: string; value: CreateJobApplicationFormValues["status"] }> = [
  { label: "Applied", value: "Applied" },
  { label: "Interview", value: "Interview" },
  { label: "Offer", value: "Offer" },
  { label: "Rejected", value: "Rejected" },
];

const today = new Date().toISOString().split("T")[0];

export default function CreateJobApplicationPage() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(createJobApplication, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success("Job application created");
      router.push("/");
    }
  }, [state.success, router]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateJobApplicationFormValues>({
    resolver: zodResolver(createJobApplicationSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      company: "",
      position: "",
      status: "Applied",
      appliedAt: today,
      url: "",
      notes: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    const formData = new FormData();
    formData.set("company", values.company);
    formData.set("position", values.position);
    formData.set("status", values.status);
    formData.set("appliedAt", values.appliedAt);
    formData.set("url", values.url ?? "");
    formData.set("notes", values.notes ?? "");

    startTransition(() => formAction(formData));
  });

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
      <form className="mt-6" onSubmit={onSubmit} noValidate>
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
                  placeholder="Raccoon Gang"
                  {...register("company")}
                />
                <FieldError
                  errors={errors.company ? [{ message: errors.company.message }] : undefined}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="job-application-position">Position</FieldLabel>
                <Input
                  id="job-application-position"
                  placeholder="Frontend Developer"
                  {...register("position")}
                />
                <FieldError
                  errors={errors.position ? [{ message: errors.position.message }] : undefined}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="job-application-status">Status</FieldLabel>
                  <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <Select
                        items={statuses}
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
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
                    )}
                  />
                  <FieldError
                    errors={errors.status ? [{ message: errors.status.message }] : undefined}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="job-application-applied-at">
                    Applied on
                  </FieldLabel>
                  <Input
                    id="job-application-applied-at"
                    type="date"
                    {...register("appliedAt")}
                  />
                  <FieldError
                    errors={errors.appliedAt ? [{ message: errors.appliedAt.message }] : undefined}
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
                  type="url"
                  placeholder="https://example.com/careers/frontend-developer"
                  {...register("url")}
                />
                <FieldDescription>Optional</FieldDescription>
                <FieldError errors={errors.url ? [{ message: errors.url.message }] : undefined} />
              </Field>
              <Field>
                <FieldLabel htmlFor="job-application-notes">Notes</FieldLabel>
                <Textarea
                  id="job-application-notes"
                  placeholder="Add any additional comments"
                  className="resize-none"
                  {...register("notes")}
                />
                <FieldDescription>Optional</FieldDescription>
                <FieldError errors={errors.notes ? [{ message: errors.notes.message }] : undefined} />
              </Field>
            </FieldGroup>
          </FieldSet>
          {state.errors?.form && (
            <Alert variant="destructive">
              <CircleXIcon />
              <AlertTitle>Failed to save job application</AlertTitle>
              <AlertDescription>{state.errors.form.join(" ")}</AlertDescription>
            </Alert>
          )}
          <Field orientation="horizontal">
            <Button type="submit" disabled={pending || Object.keys(errors).length > 0}>
              Save application
            </Button>
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
