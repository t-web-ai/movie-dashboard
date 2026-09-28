"use client";

import Link from "next/link";

import { type Control, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import type { ForgotPasswordInput } from "@/schemas/auth-schema";

interface ForgotPasswordFromProps {
  onSubmit: () => Promise<void>;
  control: Control<ForgotPasswordInput>;
  isSubmitting: boolean;
}

export function ForgotPasswordForm({ onSubmit, control, isSubmitting }: ForgotPasswordFromProps) {
  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="font-semibold text-blue-500 text-sm">If you forgot your password</div>
      <FieldGroup className="gap-4">
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-email">Email Address</FieldLabel>
              <Input
                {...field}
                id="login-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button className="h-10 w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Spinner /> : "Request OTP Code"}
      </Button>
      <Link href={"/auth/login"} className="text-blue-500 text-sm">
        Remember your password?
      </Link>
    </form>
  );
}
