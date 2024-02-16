import { createContext, useState, ReactNode } from "react";

// Definizione del tipo del contesto e le sue funzioni
type MenuContextType = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
};

// Crea il context che puo avere due valori: il valore del tipo MenuContextType o undefined e undefined è default
export const MenuContext = createContext<MenuContextType | undefined>(
  undefined
);

// Componente Provider che espone lo stato e le funzioni ai componenti discendenti, guarda come le drilla, le props
export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Passa lo stato e le funzioni ai componenti figli tramite il provider del contesto
  return (
    <MenuContext.Provider value={{ isMenuOpen, toggleMenu, closeMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
