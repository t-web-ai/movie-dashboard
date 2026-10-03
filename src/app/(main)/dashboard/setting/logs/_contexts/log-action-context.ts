import { createGenricContextProvider } from "../../../_providers/context-provider";

interface LogActionContextProps {
  openModal: (id: string) => void;
  closeModal: () => void;
  onDelete: () => Promise<null | undefined>;
  isDeleting: boolean;
}
const contextProvider = createGenricContextProvider<LogActionContextProps>("Log Action Modal Context");

export const LogActionContextProvider = contextProvider.GenericContextProvider;
export const useLogActionContext = contextProvider.useGenericContext;
