import type { Metadata } from "next";

import CreateJobApplicationForm from "./CreateJobApplicationForm";

export const metadata: Metadata = {
  title: "Career Assistant - Create Job Application",
  description:
    "Create a new job application entry in your Career Assistant account.",
};

export default function CreateJobApplicationPage() {
  return <CreateJobApplicationForm />;
}
