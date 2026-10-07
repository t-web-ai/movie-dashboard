import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useGetAllEmailTemplatesQuery } from "@/queries/email-template/use-get-all-email-templates-query";
import { useUpdateEmailTemplateMutation } from "@/queries/email-template/use-update-email-template-mutation";
import { type EmailTemplateUpdateInput, EmailTemplateUpdateSchema } from "@/schemas/email-template-schema";
import { handleResponseError } from "@/utils/handle-error-util";

export function useEmailTemplateManagement() {
  const router = useRouter();
  const { data: emailTemplatesResponse, isLoading: emailTemplatesResponseLoading } = useGetAllEmailTemplatesQuery();
  const emailTemplates = emailTemplatesResponse?.data?.emailTemplates;

  const emailTemplateUpdateForm = useForm<EmailTemplateUpdateInput>({
    defaultValues: {
      subject: "",
      html: "",
    },
    resolver: zodResolver(EmailTemplateUpdateSchema),
  });

  const updateEmailTemplateMutation = useUpdateEmailTemplateMutation();
  async function updateEmailTemplate(data: EmailTemplateUpdateInput) {
    try {
      const response = await updateEmailTemplateMutation.mutateAsync(data);
      toast.success(response.message);
      router.push("/dashboard/setting/email-templates");
    } catch (error) {
      handleResponseError(error);
    }
  }

  return {
    emailTemplates,
    emailTemplatesResponseLoading,

    emailTemplateUpdateForm,
    updateEmailTemplate: emailTemplateUpdateForm.handleSubmit(updateEmailTemplate),
    isUpdating: updateEmailTemplateMutation.isPending,
  };
}
