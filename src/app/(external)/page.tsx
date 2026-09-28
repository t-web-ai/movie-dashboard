import { permanentRedirect } from "next/navigation";

import type { Metadata } from "next";

import env from "@/config/env-config";

export const metadata: Metadata = {
  title: `${env.appName} Dashboard`,
  description: "Manage movies and others",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return permanentRedirect("/auth/login");
}
