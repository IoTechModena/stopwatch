// ToasterContext.tsx
//Context made with AI, brittle code, need to be revisited
import React, { createContext, useState, useContext, ReactNode } from "react";

interface ToasterContextType {
  showToaster: (message: string) => void;
  hideToaster: () => void;
  toasterMessage: string;
  isToasterVisible: boolean;
}

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

interface ToasterProviderProps {
  children: ReactNode;
}

export const ToasterProvider: React.FC<ToasterProviderProps> = ({
  children,
}) => {
  const [isToasterVisible, setIsToasterVisible] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");

  const showToaster = (message: string) => {
    setToasterMessage(message);
    setIsToasterVisible(true);
    setTimeout(() => setIsToasterVisible(false), 3000); // Hide toaster after 3 seconds
  };

  const hideToaster = () => {
    setIsToasterVisible(false);
  };

  return (
    <ToasterContext.Provider
      value={{ showToaster, hideToaster, toasterMessage, isToasterVisible }}
    >
      {children}
    </ToasterContext.Provider>
  );
};

export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error("useToaster must be used within a ToasterProvider");
  }
  return context;
};
