import { createContext, type PropsWithChildren, useContext } from "react";

export function createGenricContextProvider<T>(name: string) {
  const GenericContext = createContext<T | null>(null);
  GenericContext.displayName = name;

  function useGenericContext() {
    const genericContext = useContext(GenericContext);
    if (!genericContext) throw new Error("Context must not be null");
    return genericContext;
  }

  function GenericContextProvider({ children, ...value }: PropsWithChildren<T>) {
    return <GenericContext value={value as T}>{children}</GenericContext>;
  }
  return { GenericContextProvider, useGenericContext };
}
