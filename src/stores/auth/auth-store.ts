import { create } from "zustand";

import type { Admin } from "@/types/admin";

type AuthStore = {
  admin: Admin | null;
  setAdmin: (admin: Admin) => void;
  removeAdmin: () => void;
};
export const authStore = create<AuthStore>((set) => ({
  admin: null,
  setAdmin: (admin) => set({ admin }),
  removeAdmin: () => {
    set({ admin: null });
  },
}));
