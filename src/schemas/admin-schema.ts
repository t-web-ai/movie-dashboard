import z from "zod";

const AdminBaseSchema = z.object({
  name: z.string().trim().min(1, "Name must be at least one character"),
  email: z.email().trim(),
  role: z
    .string()
    .trim()
    .refine((role) => Boolean(role), { message: "You need to choose a role" }),
  status: z.enum(["active", "suspend"]),
});

export const AdminCreateSchema = AdminBaseSchema.extend({
  password: z.string().trim().min(5, "Password must be at least 5 characters"),
});

export type AdminCreateInput = z.infer<typeof AdminCreateSchema>;

export const AdminUpdateSchema = AdminBaseSchema.partial().extend({
  id: z.string().trim(),
  password: z
    .string()
    .trim()
    .min(5, "Password must be at least 5 characters")
    .or(z.literal(""))
    .transform((value) => (value === "" ? undefined : value))
    .optional(),
});

export type AdminUpdateInput = z.infer<typeof AdminUpdateSchema>;
