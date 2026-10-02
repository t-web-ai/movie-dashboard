import z from "zod";

export const RoleCreateSchema = z.object({
  name: z.string().trim().min(1, "Role name must be at least one character"),
  permissions: z.array(z.string().trim()),
});

export type RoleCreateInput = z.infer<typeof RoleCreateSchema>;

export const RoleUpdateSchema = RoleCreateSchema.partial().extend({
  id: z.string().trim(),
});

export type RoleUpdateInput = z.infer<typeof RoleUpdateSchema>;
