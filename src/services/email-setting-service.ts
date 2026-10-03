import { readClient, writeClient } from "@/config/axios-config";
import { EMAIL_SETTING } from "@/config/constant";
import type { EmailSettingTestInput, EmailSettingUpdateInput } from "@/schemas/email-setting-schema";
import type { GetEmailSettingResponse } from "@/types/email-setting";
import type { SuccessResponse } from "@/types/response";

export async function getEmailSetting() {
  const response = await readClient.get<GetEmailSettingResponse>(EMAIL_SETTING);
  return response.data;
}

export async function updateEmailSetting(emailSettingUpdateInput: EmailSettingUpdateInput) {
  const response = await writeClient.put<SuccessResponse>(EMAIL_SETTING, emailSettingUpdateInput);
  return response.data;
}

export async function testEmailSetting(emailSettingTestInput: EmailSettingTestInput) {
  const response = await writeClient.post<SuccessResponse>(`${EMAIL_SETTING}/test`, emailSettingTestInput);
  return response.data;
}
