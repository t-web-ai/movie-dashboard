"use client";

import { useEffect, useState } from "react";

import { Lock, User } from "lucide-react";
import { Controller, type UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useCheckPermission } from "@/hooks/auth/use-check-permission";
import { useGetAdminQuery } from "@/queries/admin/use-get-admin-query";
import type { AdminUpdateInput } from "@/schemas/admin-schema";
import type { Role } from "@/types/role";

interface AdminUpdateFormProps {
  onSubmit: () => Promise<void>;
  form: UseFormReturn<AdminUpdateInput>;
  roles?: Role[];
  rolesResponseLoading: boolean;
  id: string;
}

export function AdminUpdateForm({ onSubmit, form, roles, rolesResponseLoading, id }: AdminUpdateFormProps) {
  const hasUpdatePermission = useCheckPermission("admin", "update");
  const {
    control,
    reset,
    formState: { isSubmitting },
  } = form;
  const [mounted, setMounted] = useState<boolean>(false);
  const { data: adminResponse, isLoading: adminResponseLoading } = useGetAdminQuery(id);
  const admin = adminResponse?.data?.admin;

  useEffect(() => {
    if (!adminResponseLoading && admin) {
      reset({
        id: admin._id,
        name: admin.name,
        email: admin.email,
        password: "",
        role: admin.role._id,
        status: admin.status,
      });
    }
  }, [adminResponseLoading, admin, reset]);

  useEffect(() => {
    if (!adminResponseLoading && roles && !rolesResponseLoading) {
      setMounted(true);
    }
  }, [adminResponseLoading, roles, rolesResponseLoading]);

  if (!mounted) return <AdminUpdateFormSkeleton />;
  if (!admin)
    return (
      <div className="flex h-[50dvh] flex-col items-center justify-center gap-2 p-5">
        <User size={80} className="text-muted-foreground" />
        <div className="shrink-0 text-sm">Not Found</div>
      </div>
    );
  return (
    <div className="w-full space-y-6">
      <form noValidate onSubmit={onSubmit} className="space-y-6">
        <FieldGroup className="grid gap-5 sm:grid-cols-2">
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
                  placeholder="Enter your name"
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
            name="email"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="login-email">Email Address</FieldLabel>
                <Input
                  {...field}
                  id="login-email"
                  type="email"
                  placeholder="Enter your email address"
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
            name="role"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="admin-role">Role</FieldLabel>
                <Select value={field.value} onValueChange={(value) => value.trim() && field.onChange(value)}>
                  <SelectTrigger className="h-10! w-full" id="admin-role">
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

          <Controller
            control={control}
            name="status"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="admin-status">Status</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="h-10! w-full" id="admin-status">
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
                    autoComplete="off"
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

        <div className="flex justify-end">
          <Button type="submit" className="h-10 min-w-40 font-medium" disabled={isSubmitting || !hasUpdatePermission}>
            {isSubmitting ? <Spinner /> : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export function AdminUpdateFormSkeleton() {
  return (
    <div className="space-y-6">
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

      <div className="flex justify-end">
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>
    </div>
  );
}
