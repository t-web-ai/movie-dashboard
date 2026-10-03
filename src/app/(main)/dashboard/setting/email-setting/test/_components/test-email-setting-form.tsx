import { useEffect, useState } from "react";

import { Controller, type UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import type { EmailSettingTestInput } from "@/schemas/email-setting-schema";

interface TestEmailSettingFormProps {
  onSubmit: () => Promise<void>;
  form: UseFormReturn<EmailSettingTestInput>;
  isSubmitting: boolean;
}
export function TestEmailSettingForm({ onSubmit, form, isSubmitting }: TestEmailSettingFormProps) {
  const { control } = form;

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  });

  if (!mounted) return <TestEmailSettingFormSkeleton />;

  return (
    <div className="w-full space-y-6">
      <form noValidate onSubmit={onSubmit} className="space-y-6">
        <FieldGroup className="grid gap-5 sm:grid-cols-2">
          <Controller
            control={control}
            name="to"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="to">Recipient Email</FieldLabel>
                <Input
                  {...field}
                  id="to"
                  type="text"
                  placeholder="Enter email address"
                  aria-invalid={fieldState.invalid}
                  className="h-10"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="subject"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="subject">Email Subject</FieldLabel>
                <Input
                  {...field}
                  id="subject"
                  type="text"
                  placeholder="Enter email subject"
                  aria-invalid={fieldState.invalid}
                  className="h-10"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="html"
            render={({ field, fieldState }) => (
              <Field className="col-span-2 gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="html">Email Content</FieldLabel>
                <Textarea
                  {...field}
                  id="html"
                  placeholder="Enter email content"
                  aria-invalid={fieldState.invalid}
                  className="h-20 resize-none"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="flex justify-end">
          <Button type="submit" className="h-10 min-w-40 font-medium" disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : "Send"}
          </Button>
        </div>
      </form>
    </div>
  );
}

function TestEmailSettingFormSkeleton() {
  return (
    <div className="w-full space-y-6">
      <div className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-10" />
          </div>
          <div className="flex flex-col gap-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-10" />
          </div>

          <div className="col-span-2 flex flex-col gap-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-20" />
          </div>
        </div>

        <div className="flex justify-end">
          <Skeleton className="h-10 min-w-40" />
        </div>
      </div>
    </div>
  );
}
