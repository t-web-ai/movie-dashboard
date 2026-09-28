import { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

import { getCookie } from "@/utils/cookie-util";

type jwtToken = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "suspend";
};

export function useToken() {
  const [jwtToken, setJwtToken] = useState<jwtToken | null>(null);
  const token = getCookie("token");
  useEffect(() => {
    if (token) {
      try {
        setJwtToken(jwtDecode<jwtToken>(token));
      } catch {
        window.dispatchEvent(new Event("session-expired"));
      }
    }
  }, [token]);

  return jwtToken;
}
