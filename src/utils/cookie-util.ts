import Cookies from "js-cookie";

import env from "@/config/env-config";

export function setCookie(name: string, value: string) {
  Cookies.set(name, value, {
    expires: env.cookieExpiresInDay,
  });
}

export function getCookie(name: string) {
  return Cookies.get(name);
}

export function removeCookie(name: string) {
  Cookies.remove(name);
}
