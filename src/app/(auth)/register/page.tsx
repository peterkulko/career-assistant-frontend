import { EyeOffIcon } from "lucide-react";
import type { Metadata } from "next";

import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Career Assistant - Register",
  description: "Create a new Career Assistant account.",
};

export default function RegisterPage() {
  return (
    <div>
      <h1 className="mb-5 text-2xl font-semibold">Register Page</h1>

      <Field className="mb-5 max-w-sm">
        <FieldLabel htmlFor="inline-end-input">Full Name</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="inline-end-input"
            type="text"
            placeholder="Enter full name"
          />
        </InputGroup>
      </Field>

      <Field className="mb-5 max-w-sm">
        <FieldLabel htmlFor="inline-end-input">Email</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="inline-end-input"
            type="email"
            placeholder="Enter email"
          />
        </InputGroup>
      </Field>

      <Field className="mb-5 max-w-sm">
        <FieldLabel htmlFor="inline-end-input">Password</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="inline-end-input"
            type="password"
            placeholder="Enter password"
          />
          <InputGroupAddon align="inline-end">
            <EyeOffIcon />
          </InputGroupAddon>
        </InputGroup>
      </Field>

      <Button>Sign Up</Button>
    </div>
  );
}
