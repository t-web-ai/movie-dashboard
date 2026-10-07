export type GetAllEmailTemplatesResponse = {
  success: boolean;
  message: string;
  data: {
    emailTemplates: EmailTemplate[];
  };
};

export type GetEmailTemplateResponse = {
  success: boolean;
  message: string;
  data: {
    emailTemplate: EmailTemplate;
  };
};

export type EmailTemplate = {
  _id: string;
  type: string;
  subject: string;
  html: string;
  variables: string[];
  createdAt: string;
};
