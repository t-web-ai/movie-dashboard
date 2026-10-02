import { createGenricContextProvider } from "../../../_providers/context-provider";

interface RoleActionContextProps {
  openModal: (id: string) => void;
  closeModal: () => void;
  onDelete: () => Promise<null | undefined>;
  isDeleting: boolean;
}

const contextProvider = createGenricContextProvider<RoleActionContextProps>("Role Action Modal Context");

export const RoleActionContextProvider = contextProvider.GenericContextProvider;
export const useRoleActionContext = contextProvider.useGenericContext;
