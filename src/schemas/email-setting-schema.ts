import z from "zod";

export const EmailSettingUpdateSchema = z
  .object({
    host: z.string().trim().min(1),
    port: z.number().int().min(1),
    secure: z.boolean(),
    authUser: z.email().trim(),
    authPass: z.string().min(1),
  })
  .partial();

export type EmailSettingUpdateInput = z.infer<typeof EmailSettingUpdateSchema>;

export const EmailSettingTestSchema = z.object({
  to: z.email().trim(),
  subject: z.string().trim().min(1),
  html: z.string().trim().min(1),
});

export type EmailSettingTestInput = z.infer<typeof EmailSettingTestSchema>;
