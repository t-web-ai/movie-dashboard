import { isAxiosError } from "axios";
import { toast } from "sonner";

import type { ErrorResponse } from "@/types/response";

export function handleResponseError(error: unknown) {
  if (isAxiosError<ErrorResponse>(error)) {
    toast.error(error.response?.data?.message ?? "Try again later");
  }
}
