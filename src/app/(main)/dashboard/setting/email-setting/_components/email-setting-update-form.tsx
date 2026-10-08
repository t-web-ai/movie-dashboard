import { Controller, type UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { useCheckPermission } from "@/hooks/auth/use-check-permission";
import type { EmailSettingUpdateInput } from "@/schemas/email-setting-schema";

interface EmailSettingUpdateFormProps {
  onSubmit: () => Promise<void>;
  form: UseFormReturn<EmailSettingUpdateInput>;
  isSubmitting: boolean;
}

export function EmailSettingUpdateForm({ onSubmit, form, isSubmitting }: EmailSettingUpdateFormProps) {
  const { control, reset } = form;
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
                  autoComplete="off"
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
                    const number = Math.abs(Number.isNaN(value) ? 0 : value);
                    field.onChange(number);
                  }}
                  id="port"
                  type="text"
                  placeholder="e.g. 587"
                  aria-invalid={fieldState.invalid}
                  className="h-10"
                  autoComplete="off"
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
                  autoComplete="off"
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
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="secure"
            render={({ field }) => (
              <div className="mt-4 flex items-center space-x-2">
                <Label htmlFor="secure-connection">Secure Connection</Label>
                <Switch id="secure-connection" checked={field.value} onCheckedChange={field.onChange} />
              </div>
            )}
          />
        </FieldGroup>

        <div className="flex items-center justify-end gap-x-2">
          <Button
            type="button"
            onClick={() => reset()}
            variant="outline"
            className="h-10 w-20 font-medium"
            disabled={isSubmitting}
          >
            Reset
          </Button>
          <Button type="submit" className="h-10 min-w-40 font-medium" disabled={isSubmitting || !hasUpdatePermission}>
            {isSubmitting ? <Spinner /> : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
