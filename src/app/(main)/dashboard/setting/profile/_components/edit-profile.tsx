"use client";

import { useEffect } from "react";

import { Lock } from "lucide-react";
import { Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useAdminManagement } from "@/hooks/admin/use-admin-management";
import { useAuthStore } from "@/hooks/auth/use-auth-store";
import { useCheckPermission } from "@/hooks/auth/use-check-permission";

export function EditProfile() {
  const { admin } = useAuthStore();
  const updatePermission = useCheckPermission("admin", "update");
  const { adminUpdateForm, updateAdmin, roles, roleResponseLoading } = useAdminManagement();

  const {
    control,
    formState: { isSubmitting },
    reset,
  } = adminUpdateForm;

  useEffect(() => {
    if (admin) {
      reset({
        id: admin._id,
        name: admin.name,
        email: admin.email,
        password: "",
        role: admin.role._id,
        status: admin.status,
      });
    }
  }, [admin, reset]);

  if (!admin || roleResponseLoading || !roles) return <EditProfileSkeleton />;

  return (
    <div className="w-full space-y-6">
      {!updatePermission && (
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-amber-700 text-sm dark:text-amber-400">
          You do not have permission to modify account settings.
        </div>
      )}

      {/* Form */}
      <form noValidate onSubmit={updateAdmin} className="space-y-6">
        <FieldGroup className="grid gap-5 sm:grid-cols-2">
          {/* Name */}
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="admin-name">Full Name</FieldLabel>
                <Input
                  {...field}
                  id="admin-name"
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
                  aria-invalid={fieldState.invalid}
                  className="h-10"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Email */}
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
                  className="h-10"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Role */}
          <Controller
            control={control}
            name="role"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="admin-role">Role</FieldLabel>
                <Select value={field.value} onValueChange={(value) => value.trim() && field.onChange(value)}>
                  <SelectTrigger className="h-10 w-full" id="admin-role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {roles?.map((role) => (
                        <SelectItem key={role._id} value={role._id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Status */}
          <Controller
            control={control}
            name="status"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="admin-status">Status</FieldLabel>
                <Select value={field.value} onValueChange={(value) => value.trim() && field.onChange(value)}>
                  <SelectTrigger className="h-10 w-full" id="admin-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspend">Suspend</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5 sm:col-span-2" data-invalid={fieldState.invalid}>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="login-password">New Password</FieldLabel>
                  <span className="text-muted-foreground text-xs">Leave blank to keep existing password</span>
                </div>
                <div className="relative">
                  <Input
                    {...field}
                    id="login-password"
                    type="password"
                    placeholder="*****"
                    autoComplete="new-password"
                    aria-invalid={fieldState.invalid}
                    className="h-10 pr-9"
                  />
                  <Lock className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground/50" />
                </div>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="flex justify-end border-t pt-4">
          <Button type="submit" className="h-10 min-w-28 font-medium" disabled={isSubmitting || !updatePermission}>
            {isSubmitting ? <Spinner /> : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

function EditProfileSkeleton() {
  return (
    <div className="w-full space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        {Array.from({ length: 4 }).map(() => (
          <div key={Math.random() * 1000} className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        ))}
        <div className="space-y-2 sm:col-span-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      <div className="flex justify-end border-t pt-4">
        <Skeleton className="h-10 w-28 rounded-md" />
      </div>
    </div>
  );
}
