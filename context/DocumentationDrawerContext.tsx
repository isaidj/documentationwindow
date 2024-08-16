import React, { createContext, useContext, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";

interface DocumentationDrawerContextType {
  pathname: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const DocumentationDrawerContext = createContext<
  DocumentationDrawerContextType | undefined
>(undefined);

const DocumentationDrawerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  let pathname = usePathname();
  pathname = pathname.split("/").pop() || pathname;
  const [isOpen, setIsOpen] = useState(false);

  const value: DocumentationDrawerContextType = {
    pathname,
    isOpen,
    setIsOpen,
  };

  return (
    <DocumentationDrawerContext.Provider value={value}>
      {children}
    </DocumentationDrawerContext.Provider>
  );
};

export default DocumentationDrawerProvider;

export const useDocumentationDrawer = (): DocumentationDrawerContextType => {
  const context = useContext(DocumentationDrawerContext);
  if (context === undefined) {
    throw new Error(
      "useDocumentationDrawer must be used within a DocumentationDrawerProvider"
    );
  }
  return context;
};
