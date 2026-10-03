export type GetEmailSettingResponse = {
  success: boolean;
  message: string;
  data: {
    emailSetting: EmailSetting;
  };
};

export type EmailSetting = {
  _id: string;
  host: string;
  port: number;
  secure: boolean;
  authUser: string;
  authPass: string;
  default: boolean;
  createdAt: string;
  updatedAt: string;
  __v: 0;
};
