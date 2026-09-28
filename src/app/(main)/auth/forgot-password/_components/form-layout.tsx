"use client";

import { useAuthManagement } from "@/hooks/auth/use-auth-management";

import { ForgotPasswordForm } from "./forgot-password-form";
import { ResetPasswordForm } from "./reset-password-form";
import { VerifyOTPForm } from "./verify-otp-form";

export function FormLayout() {
  const {
    forgotPassword,
    forgotPasswordForm,
    verifyOTP,
    verifyOTPForm,
    resetPassword,
    resetPasswordForm,
    verified,
    timer,
    closeVerifyOTPForm,
  } = useAuthManagement();
  const {
    control: forgotPasswordFormControl,
    formState: { isSubmitting: isRequesting },
  } = forgotPasswordForm;

  const {
    control: verifyOTPFormControl,
    formState: { isSubmitting: isVerifying },
  } = verifyOTPForm;

  const {
    control: resetPasswordFormControl,
    formState: { isSubmitting: isResetingPassword },
  } = resetPasswordForm;

  if ((verified && !timer) || verified)
    return (
      <ResetPasswordForm
        control={resetPasswordFormControl}
        onSubmit={resetPassword}
        isSubmitting={isResetingPassword}
      />
    );

  if (timer)
    return (
      <VerifyOTPForm
        control={verifyOTPFormControl}
        isSubmitting={isVerifying}
        onSubmit={verifyOTP}
        timer={timer}
        closeForm={closeVerifyOTPForm}
      />
    );

  return (
    <ForgotPasswordForm control={forgotPasswordFormControl} isSubmitting={isRequesting} onSubmit={forgotPassword} />
  );
}
