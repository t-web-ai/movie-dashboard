"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useForgotPasswordMutation } from "@/queries/auth/use-forgot-password-mutation";
import { useLoginMutation } from "@/queries/auth/use-login-mutation";
import { useResetPasswordMutation } from "@/queries/auth/use-reset-password-mutation";
import { useVerifyOTPMutation } from "@/queries/auth/user-verify-otp-mutation";
import {
  type ForgotPasswordInput,
  ForgotPasswordSchema,
  type LoginInput,
  LoginSchema,
  type ResetPasswordInput,
  ResetPasswordSchema,
  type VerifyOTPInput,
  VerifyOTPSchema,
} from "@/schemas/auth-schema";
import { removeCookie, setCookie } from "@/utils/cookie-util";
import { handleResponseError } from "@/utils/handle-error-util";

import { useAuthStore } from "./use-auth-store";
import { useSessionStore } from "./use-session-store";

export function useAuthManagement() {
  const [expireAt, setExpireAt] = useState<string | null>(null);
  const [verified, setVerified] = useState<boolean>(false);
  const router = useRouter();
  const { closeExpiredModal } = useSessionStore();
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (expireAt) {
        const remaining = Math.max(0, Math.ceil((new Date(expireAt).getTime() - Date.now()) / 1000));

        setTimer(remaining);

        if (remaining <= 0) {
          clearInterval(interval);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expireAt]);

  const { removeAdmin } = useAuthStore();
  const loginForm = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const loginMutation = useLoginMutation();

  async function loginAdmin(loginInput: LoginInput) {
    try {
      const response = await loginMutation.mutateAsync(loginInput);
      setCookie("token", response.data.token);
      router.replace("/dashboard");
      toast.success(response?.message || "Login successfully");
    } catch (error) {
      handleResponseError(error);
    }
  }

  const resetPasswordForm = useForm<ResetPasswordInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(ResetPasswordSchema),
  });

  const resetPasswordMutatioin = useResetPasswordMutation();
  async function resetPassword(data: ResetPasswordInput) {
    try {
      const response = await resetPasswordMutatioin.mutateAsync(data);
      router.replace("/dashboard/auth/login");
      toast.success(response.message);
    } catch (error) {
      handleResponseError(error);
    }
  }

  const verifyOTPForm = useForm<VerifyOTPInput>({
    defaultValues: {
      email: "",
      code: "",
    },
    resolver: zodResolver(VerifyOTPSchema),
  });

  const verifyOTPMutation = useVerifyOTPMutation();
  async function verifyOTP(data: VerifyOTPInput) {
    try {
      const response = await verifyOTPMutation.mutateAsync(data);
      setVerified(true);
      setExpireAt(null);
      setTimer(0);
      resetPasswordForm.setValues({
        email: data.email,
        password: "",
      });
      toast.success(response.message);
    } catch (error) {
      handleResponseError(error);
    }
  }

  const forgotPasswordForm = useForm<ForgotPasswordInput>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const forgotPasswordMutation = useForgotPasswordMutation();

  async function forgotPassword(data: ForgotPasswordInput) {
    try {
      const response = await forgotPasswordMutation.mutateAsync(data);
      setExpireAt(response?.data?.expireAt);
      verifyOTPForm.setValues({
        email: data.email,
        code: "",
      });
      toast.success(response?.message);
    } catch (error) {
      handleResponseError(error);
    }
  }

  function logoutAdmin() {
    removeCookie("token");
    removeAdmin();
    closeExpiredModal();
    router.replace("/auth/login");
  }

  function closeVerifyOTPForm() {
    setExpireAt(null);
    setTimer(0);
  }

  return {
    loginAdmin: loginForm.handleSubmit(loginAdmin),
    loginForm,
    logoutAdmin,

    forgotPassword: forgotPasswordForm.handleSubmit(forgotPassword),
    forgotPasswordForm,

    timer,
    verified,
    closeVerifyOTPForm,

    verifyOTP: verifyOTPForm.handleSubmit(verifyOTP),
    verifyOTPForm,

    resetPassword: resetPasswordForm.handleSubmit(resetPassword),
    resetPasswordForm,
  };
}
