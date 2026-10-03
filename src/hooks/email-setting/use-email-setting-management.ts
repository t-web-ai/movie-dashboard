import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useGetEmailSettingQuery } from "@/queries/email-setting/use-get-email-setting-query";
import { useTestEmailSetttingMutation } from "@/queries/email-setting/use-test-email-setting-mutation";
import { useUpdateEmailSettingMutation } from "@/queries/email-setting/use-update-email-setting-mutation";
import {
  type EmailSettingTestInput,
  EmailSettingTestSchema,
  type EmailSettingUpdateInput,
  EmailSettingUpdateSchema,
} from "@/schemas/email-setting-schema";
import { handleResponseError } from "@/utils/handle-error-util";

export function useEmailSettingManagement() {
  const router = useRouter();
  const { data: emailSettingResponse, isLoading: emailSettingResponseLoading } = useGetEmailSettingQuery();
  const emailSetting = emailSettingResponse?.data?.emailSetting;

  const emailSettingUpdateForm = useForm<EmailSettingUpdateInput>({
    defaultValues: {
      host: "",
      port: 0,
      secure: false,
      authUser: "",
      authPass: "",
    },
    resolver: zodResolver(EmailSettingUpdateSchema),
  });

  useEffect(() => {
    if (emailSetting && !emailSettingResponseLoading) {
      emailSettingUpdateForm.reset({
        host: emailSetting.host,
        port: emailSetting.port,
        secure: emailSetting.secure,
        authUser: emailSetting.authUser,
        authPass: emailSetting.authPass,
      });
    }
  }, [emailSetting, emailSettingResponseLoading, emailSettingUpdateForm]);

  const updateEmailSettingMutation = useUpdateEmailSettingMutation();
  async function updateEmailSetting(data: EmailSettingUpdateInput) {
    try {
      const response = await updateEmailSettingMutation.mutateAsync(data);
      toast.success(response.message);
    } catch (error) {
      handleResponseError(error);
    }
  }

  const emailSettingTestForm = useForm<EmailSettingTestInput>({
    defaultValues: {
      to: "",
      subject: "",
      html: "",
    },
    resolver: zodResolver(EmailSettingTestSchema),
  });

  const testEmailSettingMutation = useTestEmailSetttingMutation();
  async function testEmailSetting(data: EmailSettingTestInput) {
    try {
      const response = await testEmailSettingMutation.mutateAsync(data);
      toast.success(response.message);
      router.push("/dashboard/setting/email-setting");
    } catch (error) {
      handleResponseError(error);
    }
  }

  return {
    emailSetting,
    emailSettingResponseLoading,

    emailSettingUpdateForm,
    isUpdating: updateEmailSettingMutation.isPending,
    updateEmailSetting: emailSettingUpdateForm.handleSubmit(updateEmailSetting),

    emailSettingTestForm,
    isTesting: testEmailSettingMutation.isPending,
    testEmailSetting: emailSettingTestForm.handleSubmit(testEmailSetting),
  };
}
