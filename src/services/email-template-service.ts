import { readClient, writeClient } from "@/config/axios-config";
import { EMAIL_TEMPLATE } from "@/config/constant";
import type { EmailTemplateUpdateInput } from "@/schemas/email-template-schema";
import type { GetAllEmailTemplatesResponse, GetEmailTemplateResponse } from "@/types/email-template";
import type { SuccessResponse } from "@/types/response";

export async function getAllEmailTemplates() {
  const response = await readClient.get<GetAllEmailTemplatesResponse>(EMAIL_TEMPLATE);
  return response.data;
}

export async function getEmailTemplate(id: string) {
  const response = await readClient.get<GetEmailTemplateResponse>(`${EMAIL_TEMPLATE}/${id}`);
  return response.data;
}

export async function updateEmailTemplate(emailTemplateUpdateInput: EmailTemplateUpdateInput) {
  const response = await writeClient.put<SuccessResponse>(`${EMAIL_TEMPLATE}/${emailTemplateUpdateInput.id}`, {
    subject: emailTemplateUpdateInput.subject,
    html: emailTemplateUpdateInput.html,
  });
  return response.data;
}
