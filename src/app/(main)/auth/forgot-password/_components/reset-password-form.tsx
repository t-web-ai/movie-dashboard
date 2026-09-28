import { type Control, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import type { ResetPasswordInput } from "@/schemas/auth-schema";

interface ResetPasswordFormProps {
  onSubmit: () => Promise<void>;
  control: Control<ResetPasswordInput>;
  isSubmitting: boolean;
}

export function ResetPasswordForm({ onSubmit, control, isSubmitting }: ResetPasswordFormProps) {
  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="font-semibold text-blue-500 text-sm">You can now change your password</div>

      <FieldGroup className="gap-4">
        <Controller
          control={control}
          name="email"
          render={({ field }) => <div className="text-gray-600 text-sm dark:text-white">{field.value}</div>}
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-password">New Password</FieldLabel>
              <Input
                {...field}
                id="login-password"
                type="password"
                placeholder="********"
                autoComplete="current-password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button className="h-10 w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Spinner /> : "Update Password"}
      </Button>
    </form>
  );
}
