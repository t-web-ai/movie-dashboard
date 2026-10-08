"use client";

import Link from "next/link";

import { Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useAuthManagement } from "@/hooks/auth/use-auth-management";

export function LoginForm() {
  const { loginForm, loginAdmin } = useAuthManagement();
  const {
    control,
    formState: { isSubmitting },
  } = loginForm;

  return (
    <form noValidate onSubmit={loginAdmin} className="flex flex-col gap-4">
      <div className="font-semibold text-blue-500 text-sm">Login to your account</div>
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
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-password">Password</FieldLabel>
              <Input
                {...field}
                id="login-password"
                type="password"
                placeholder="********"
                autoComplete="off"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button className="h-10 w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Spinner /> : "Login"}
      </Button>
      <Link href={"/auth/forgot-password"} className="text-blue-500 text-sm">
        Forgot Password?
      </Link>
    </form>
  );
}
