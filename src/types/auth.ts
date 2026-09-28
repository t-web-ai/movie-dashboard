export type ForgotPasswordResponse = {
  success: boolean;
  message: string;
  data: {
    expireAt: string;
  };
};

export type VerifyOTPResponse = {
  success: boolean;
  message: string;
};

export type ResetPasswordResponse = {
  success: boolean;
  message: string;
};
