import z from "zod";

export const EmailTemplateUpdateSchema = z.object({
  id: z.string().trim().min(1),
  subject: z.string().trim().min(1),
  html: z.string().trim().min(1),
});

export type EmailTemplateUpdateInput = z.infer<typeof EmailTemplateUpdateSchema>;
