import { useShallow } from "zustand/react/shallow";

import { authStore } from "@/stores/auth/auth-store";

export function useAuthStore() {
  const { admin, setAdmin, removeAdmin } = authStore(
    useShallow((state) => ({
      admin: state.admin,
      setAdmin: state.setAdmin,
      removeAdmin: state.removeAdmin,
    })),
  );
  return {
    admin,
    setAdmin,
    removeAdmin,
  };
}
