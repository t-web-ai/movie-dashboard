import { Command } from "lucide-react";
import type { Metadata } from "next";

import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Open Source Split Screen Login Page with shadcn/ui",
  description:
    "Explore an open source split screen login page with email and password fields, social sign-in, and a registration link.",
  alternates: {
    canonical: "/auth/v1/login",
  },
};

export default function Login() {
  return (
    <div className="flex h-dvh">
      <div className="hidden bg-primary lg:block lg:w-1/3">
        <div className="flex h-full flex-col items-center justify-center p-12 text-center">
          <div className="space-y-6">
            <Command className="mx-auto size-12 text-primary-foreground" />
            <div className="space-y-2">
              <p className="text-primary-foreground/80 text-xl">
                T Movie Admin Portal
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-background p-8 lg:w-2/3">
        <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
          <div className="space-y-4">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
