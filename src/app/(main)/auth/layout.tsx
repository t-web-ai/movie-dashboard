import type { PropsWithChildren } from "react";

import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";

export default async function Layout({ children }: PropsWithChildren) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (token) permanentRedirect("/dashboard");
  return children;
}
