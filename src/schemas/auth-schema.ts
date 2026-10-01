import z from "zod";

export const LoginSchema = z.object({
  email: z.email().trim(),
  password: z.string().trim().min(5, "Password must be at least 5 characters"),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const ForgotPasswordSchema = LoginSchema.pick({ email: true });

export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;

export const VerifyOTPSchema = LoginSchema.pick({ email: true }).extend({
  code: z.string().min(6).max(6),
});

export type VerifyOTPInput = z.infer<typeof VerifyOTPSchema>;

export const ResetPasswordSchema = LoginSchema;

export type ResetPasswordInput = z.infer<typeof LoginSchema>;
