import { writeClient } from "@/config/axios-config";
import { AUTH } from "@/config/constant";
import type { ForgotPasswordInput, LoginInput, ResetPasswordInput } from "@/schemas/auth-schema";
import type { ForgotPasswordResponse, ResetPasswordResponse, VerifyOTPResponse } from "@/types/auth";
import type { LoginResponse } from "@/types/login";

import type { VerifyOTPInput } from "./../schemas/auth-schema";

export async function loginAdmin(loginInput: LoginInput) {
  const response = await writeClient.post<LoginResponse>(`${AUTH}/login`, loginInput);
  return response.data;
}

export async function forgotPassword(forgotPasswordInput: ForgotPasswordInput) {
  const response = await writeClient.post<ForgotPasswordResponse>(`${AUTH}/forgot-password`, forgotPasswordInput);
  return response.data;
}

export async function verifyOTPCode(verifyOTPInput: VerifyOTPInput) {
  const response = await writeClient.post<VerifyOTPResponse>(`${AUTH}/verify-otp`, verifyOTPInput);
  return response.data;
}

export async function resetPassword(resetPasswordInput: ResetPasswordInput) {
  const response = await writeClient.post<ResetPasswordResponse>(`${AUTH}/reset-password`, resetPasswordInput);
  return response.data;
}
