"use client";

import { useEffect, useState } from "react";

import { Controller, type UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { useCheckPermission } from "@/hooks/auth/use-check-permission";
import { useGetRoleQuery } from "@/queries/role/use-get-role-query";
import type { RoleUpdateInput } from "@/schemas/role-schema";
import type { Permission } from "@/types/permission";

interface RoleUpdateFormProps {
  form: UseFormReturn<RoleUpdateInput>;
  onSubmit: () => Promise<void>;
  permissions?: Permission[];
  permissionsResponseLoading: boolean;
  id: string;
}

type MappedPermission = {
  _id: string;
  resource: string;
  action: string;
  match: boolean;
};

export function RoleUpdateForm({ form, onSubmit, permissionsResponseLoading, permissions, id }: RoleUpdateFormProps) {
  const [mounted, setMounted] = useState(false);
  const {
    control,
    formState: { isSubmitting },
    reset,
  } = form;
  const hasCreatePermission = useCheckPermission("role", "create");
  const { data: roleResponse, isLoading: roleResponseLoading } = useGetRoleQuery(id);
  const role = roleResponse?.data?.role;

  useEffect(() => {
    if (permissions && !permissionsResponseLoading && role && !roleResponseLoading) {
      setMounted(true);
    }
  }, [permissions, permissionsResponseLoading, role, roleResponseLoading]);

  useEffect(() => {
    if (role && !roleResponseLoading) {
      reset({
        id: role._id,
        name: role.name,
        permissions: role.permissions.map((permission) => permission._id),
      });
    }
  }, [role, roleResponseLoading, reset]);

  if (!mounted || !permissions) return <RoleUpdateSkeleton />;

  return (
    <div className="w-full space-y-6">
      <form noValidate onSubmit={onSubmit} className="space-y-6">
        <FieldGroup className="grid gap-5">
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Field className="gap-1.5" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="role-name">Name</FieldLabel>
                <Input
                  {...field}
                  id="role-name"
                  type="text"
                  placeholder="Enter role name"
                  autoComplete="name"
                  aria-invalid={fieldState.invalid}
                  className="h-10"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="permissions"
            render={({ field }) => {
              const formPermissions = field.value ?? [];
              const formPermissionIds = new Set(formPermissions?.map((formPermission) => formPermission));

              const allPermissions: Partial<Record<string, MappedPermission[]>> = Object.groupBy(
                permissions.map(
                  ({ _id, resource, action }): MappedPermission => ({
                    _id,
                    resource: resource.split("-").join(" "),
                    action,
                    match: formPermissionIds.has(_id),
                  }),
                ),

                (item) => item.resource,
              );
              const permissionResources = Object.keys(allPermissions);

              return (
                <Field>
                  <div className="w-full space-y-6">
                    <div className="flex gap-x-2">
                      <Button
                        type="button"
                        onClick={() => {
                          field.onChange([...new Set(permissions.map((permission) => permission._id))]);
                        }}
                      >
                        Select All
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => {
                          field.onChange([]);
                        }}
                      >
                        Deselect All
                      </Button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {permissionResources.map((resource) => {
                        const rawPermission = allPermissions[resource] ?? [];

                        const permissions = [...rawPermission].sort((firstPermission, secondPermission) => {
                          return firstPermission.action.localeCompare(secondPermission.action);
                        });

                        return (
                          <div
                            key={resource}
                            className="flex flex-col justify-between rounded-xl border bg-card p-4 text-card-foreground shadow-xs transition-colors hover:border-muted-foreground/30"
                          >
                            <div className="mb-3 flex items-center justify-between">
                              <span className="font-medium text-foreground/90 capitalize">{resource}</span>
                              <span className="flex gap-x-2 text-muted-foreground text-xs">
                                <span>
                                  {permissions.filter((permission) => permission.match).length} / {permissions.length}
                                </span>
                                <span>active</span>
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {permissions.map((permission) => (
                                <div
                                  key={permission._id}
                                  className={`inline-flex cursor-default items-center gap-1.5 rounded-md px-2.5 py-2 font-medium text-xs transition-colors ${
                                    permission.match
                                      ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                                      : "border border-transparent bg-muted/60 text-muted-foreground"
                                  }`}
                                >
                                  <span className="uppercase tracking-wider">{permission.action}</span>
                                  <Field orientation="horizontal">
                                    <Switch
                                      id="switch-size-default"
                                      className="cursor-pointer"
                                      size="default"
                                      checked={permission.match}
                                      onCheckedChange={(checked) => {
                                        if (!checked) {
                                          return field.onChange([
                                            ...new Set(
                                              formPermissions.filter((permissionId) => permissionId !== permission._id),
                                            ),
                                          ]);
                                        }
                                        field.onChange([...new Set([permission._id, ...formPermissions])]);
                                      }}
                                    />
                                  </Field>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Field>
              );
            }}
          />
        </FieldGroup>

        <div className="flex justify-end">
          <Button type="submit" className="h-10 min-w-40 font-medium" disabled={isSubmitting || !hasCreatePermission}>
            {isSubmitting ? <Spinner /> : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

function RoleUpdateSkeleton() {
  return (
    <div className="w-full space-y-6">
      <div className="space-y-6">
        <div className="grid gap-5">
          <div className="flex flex-col gap-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div>
            <div className="w-full space-y-6">
              <div className="flex gap-x-2">
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-10 w-40" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 8 }).map((_, index) => {
                  const key = `#${index}`;
                  return (
                    <div
                      key={key}
                      className="flex flex-col justify-between rounded-xl border bg-card p-4 text-card-foreground shadow-xs transition-colors hover:border-muted-foreground/30"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <Skeleton className="h-7 w-30" />
                        <Skeleton className="h-7 w-20" />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 4 }).map((_, index) => {
                          const key = `#${index}`;
                          return <Skeleton key={key} className="h-10 w-25" />;
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div>
          <Skeleton className="ms-auto h-10 w-40" />
        </div>
      </div>
    </div>
  );
}
