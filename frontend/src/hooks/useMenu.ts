import { useContext } from "react";
import { MenuContext } from "@/context/MenuContext";

// Hook personalizzato per l'uso del contesto MenuContext. Questo garantisce che il contesto sia usato all'interno di un provider
//Originariamente era dentro MenuContext, ma l'ho spezzato perchè preveniva il fast reload (e perchè mi dava errore)
export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("GIACCONSSS IL PROVIDEEEERR DEL MENUUUU");
  }
  return context;
};
