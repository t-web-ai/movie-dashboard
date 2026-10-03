import { Controller, type UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useCheckPermission } from "@/hooks/auth/use-check-permission";
import type { EmailSettingUpdateInput } from "@/schemas/email-setting-schema";

interface EmailSettingUpdateFormProps {
  onSubmit: () => Promise<void>;
  form: UseFormReturn<EmailSettingUpdateInput>;
  isSubmitting: boolean;
}

export function EmailSettingUpdateForm({ onSubmit, form, isSubmitting }: EmailSettingUpdateFormProps) {
  const { control } = form;
  const hasUpdatePermission = useCheckPermission("email-setting", "update");
  return (
    <div className="w-full space-y-6">
      <form noValidate onSubmit={onSubmit} className="space-y-6">
        <FieldGroup className="grid gap-5 sm:grid-cols-2">
          <Controller
            control={control}
            name="host"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="host">Host</FieldLabel>
                <Input
                  {...field}
                  id="host"
                  type="text"
                  placeholder="e.g. smtp.gmail.com"
                  aria-invalid={fieldState.invalid}
                  className="h-10"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="port"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="port">Port</FieldLabel>
                <Input
                  {...field}
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    const number = Math.max(Number.isNaN(value) ? 0 : value, 0);
                    field.onChange(number);
                  }}
                  id="port"
                  type="text"
                  placeholder="e.g. 587"
                  aria-invalid={fieldState.invalid}
                  className="h-10"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="authUser"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="auth-user">Username</FieldLabel>
                <Input
                  {...field}
                  id="auth-user"
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
            name="authPass"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="auth-password">Authentication Password</FieldLabel>
                <Input
                  {...field}
                  id="auth-password"
                  type="text"
                  placeholder="Enter authentication password"
                  aria-invalid={fieldState.invalid}
                  className="h-10"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="secure"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="secure">Use Secure Connection</FieldLabel>
                <Select value={String(field.value)} onValueChange={(value) => field.onChange(value === "true")}>
                  <SelectTrigger className="h-10! w-full" id="secure">
                    <SelectValue placeholder="Select security option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
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
