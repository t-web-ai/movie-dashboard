import Link from "next/link";

import { type Control, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import type { VerifyOTPInput } from "@/schemas/auth-schema";

interface VerifyOTPFormProps {
  onSubmit: () => Promise<void>;
  control: Control<VerifyOTPInput>;
  isSubmitting: boolean;
  timer: number;
  closeForm: () => void;
}

export function VerifyOTPForm({ onSubmit, control, isSubmitting, timer, closeForm }: VerifyOTPFormProps) {
  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
      <FieldGroup className="gap-4">
        <Controller
          control={control}
          name="email"
          render={({ field }) => <div className="text-gray-600 text-sm dark:text-white">{field.value}</div>}
        />
        <Controller
          control={control}
          name="code"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="otp-code">OTP Code</FieldLabel>

              <Input
                {...field}
                id="otp-code"
                type="text"
                placeholder="546876"
                autoComplete="off"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button className="h-10 w-full" type="submit" disabled={isSubmitting || timer === 0}>
        {isSubmitting ? <Spinner /> : "Verify OTP Code"}
      </Button>

      <div className="flex items-center justify-between">
        <Link href="/auth/forgot-password" onClick={closeForm} className="text-blue-500 text-sm">
          Back
        </Link>

        <span className="text-muted-foreground text-sm">{timer > 0 ? `${timer}s` : "Expired"}</span>
      </div>
    </form>
  );
}
