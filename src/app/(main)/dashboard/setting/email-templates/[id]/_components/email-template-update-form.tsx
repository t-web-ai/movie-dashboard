import { useEffect, useMemo, useState } from "react";

import dynamic from "next/dynamic";

import { Mails } from "lucide-react";
import { Controller, type UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useCheckPermission } from "@/hooks/auth/use-check-permission";
import { useIsDark } from "@/hooks/use-is-dark";
import { useGetEmailTemplateQuery } from "@/queries/email-template/use-get-email-template-query";
import type { EmailTemplateUpdateInput } from "@/schemas/email-template-schema";

import { EmailTemplateJoditConfig } from "../_configs/email-template-jodit-config";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => {
    return <Skeleton className="h-100 w-full" />;
  },
});

interface EmailTemplateUpdateFormProps {
  onSubmit: () => Promise<void>;
  form: UseFormReturn<EmailTemplateUpdateInput>;
  id: string;
}

export function EmailTemplateUpdateForm({ onSubmit, form, id }: EmailTemplateUpdateFormProps) {
  const {
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  const isDark = useIsDark();
  const theme = isDark ? "dark" : "default";

  const config = useMemo(
    () => ({
      ...EmailTemplateJoditConfig,
      theme,
    }),
    [theme],
  );

  const hasUpdatePermission = useCheckPermission("email-template", "update");
  const { data: emailTemplateResponse, isLoading: emailTemplateResponseLoading } = useGetEmailTemplateQuery(id);
  const emailTemplate = emailTemplateResponse?.data?.emailTemplate;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!emailTemplateResponseLoading) {
      setMounted(true);
    }
  }, [emailTemplateResponseLoading]);

  useEffect(() => {
    if (emailTemplate) {
      reset({
        id: emailTemplate._id,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
      });
    }
  }, [emailTemplate, reset]);

  if (!mounted) return <EmailTemplateUpdateFormSkeleton />;

  if (!emailTemplate)
    return (
      <div className="flex h-[50dvh] flex-col items-center justify-center gap-2 p-5">
        <Mails size={80} className="text-muted-foreground" />
        <div className="shrink-0 text-sm">Not Found</div>
      </div>
    );

  return (
    <div className="w-full space-y-6">
      <form noValidate onSubmit={onSubmit} className="space-y-6">
        <FieldGroup className="grid gap-5">
          <Controller
            control={control}
            name="subject"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="subject">Subject</FieldLabel>
                <Input
                  {...field}
                  id="subject"
                  type="text"
                  placeholder="Enter text"
                  autoComplete="off"
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
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="html">Template</FieldLabel>
                <JoditEditor value={field.value} config={config} onBlur={field.onChange} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          {emailTemplate?.variables && (
            <div className="flex flex-col gap-y-2 text-sm">
              <div className="font-medium">Accepted variables : </div>
              <div className="flex flex-wrap gap-2">
                {emailTemplate.variables.map((variable) => {
                  return (
                    <div key={variable} className="rounded-lg border p-2">
                      {variable}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </FieldGroup>

        <div className="flex justify-end">
          <Button type="submit" className="h-10 min-w-40 font-medium" disabled={isSubmitting || !hasUpdatePermission}>
            {isSubmitting ? <Spinner /> : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export function EmailTemplateUpdateFormSkeleton() {
  return (
    <div className="w-full space-y-6">
      <div className="space-y-6">
        <div className="grid gap-5">
          <div className="grid gap-1.5">
            <Skeleton className="h-7 w-30" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="grid gap-1.5">
            <Skeleton className="h-7 w-30" />
            <Skeleton className="h-100 w-full" />
          </div>

          <div className="flex flex-col gap-y-2 text-sm">
            <Skeleton className="h-7 w-30" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map((_, index) => {
                const key = `#${index}`;
                return <Skeleton key={key} className="h-10 w-30 rounded-lg border" />;
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Skeleton className="h-10 min-w-40" />
        </div>
      </div>
    </div>
  );
}
