import { createGenricContextProvider } from "../../../_providers/context-provider";

interface AdminActionContextProps {
  openModal: (id: string) => void;
  closeModal: () => void;
  onDelete: () => Promise<null | undefined>;
  isDeleting: boolean;
}

const contextProvider = createGenricContextProvider<AdminActionContextProps>("Admin Action Modal Context");

export const AdminActionContextProvider = contextProvider.GenericContextProvider;
export const useAdminActionContext = contextProvider.useGenericContext;
