import { useShallow } from "zustand/react/shallow";

import { sessionStore } from "@/stores/auth/session-store";

export function useSessionStore() {
  const { expired, showExpiredModal, closeExpiredModal } = sessionStore(
    useShallow((state) => ({
      expired: state.expired,
      showExpiredModal: state.showExpiredModal,
      closeExpiredModal: state.closeExpiredModal,
    })),
  );

  return {
    expired,
    showExpiredModal,
    closeExpiredModal,
  };
}
