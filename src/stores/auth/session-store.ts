import { create } from "zustand";

type SessionStore = {
  expired: boolean;
  showExpiredModal: () => void;
  closeExpiredModal: () => void;
};

export const sessionStore = create<SessionStore>((set) => ({
  expired: false,
  showExpiredModal: () => {
    set({ expired: true });
  },
  closeExpiredModal: () => {
    set({ expired: false });
  },
}));
