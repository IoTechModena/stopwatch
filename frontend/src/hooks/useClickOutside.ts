import { useEffect, useState } from "react";

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  onClickOutside: () => void
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  //Indica il tipo di ritorno di un hook, in questo caso restituisce un array con due elementi: lo stato corrente (un booleano) e una funzione per aggiornare lo stato

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      //controlla se il click è avvenuto fuori dal menu
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
        onClickOutside();
      }
    };
    document.addEventListener("click", handler);
  }, [ref, onClickOutside]);
  return [isMenuOpen, setIsMenuOpen]; // restituisce lo stato del menu così l'hook lo può manipolare
};
