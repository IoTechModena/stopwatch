import { useAuth0 } from "@auth0/auth0-react";
import { RegisterButton } from "./AuthComponents/RegisterButton";
import { LogoComponent } from "./LogoComponent";
import { useRef } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import LoginButton from "./AuthComponents/LoginButton";
import LogoutButton from "./AuthComponents/LogoutButton";
import Profile from "./AuthComponents/Profile";

export const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useClickOutside(menuRef, () => {});
  //menuRef viene passato al hook che intanto spacchetta isMenuOpen e setIsMenuOpen
  //() => {} perchè nel caso di navbar quando chiudiamo il menu non succede nulla, oltre a chiudere il menu
  return (
    <header className="text-white bg-[#112d4e]">
      <nav className="font-bold flex justify-start items-center h-16 px-4 md:px-[8%]">
        <LogoComponent />
        {/*MOBILE-MENU */}
        <section
          ref={menuRef} //clickOutside controlla questo div
          className="z-10 md:hidden absolute top-2 right-2 flex-col rounded-lg"
        >
          <div className="flex mt-1">
            <Profile />
            {/*il nome sarebbe dropdown menu*/}
            <button
              className="rounded-lg px-4 py-2 mx-4"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i
                className={` ${
                  isMenuOpen ? "fa-solid fa-x px-[1px]" : "fa-solid fa-bars"
                }`}
              ></i>
            </button>
          </div>
          {isMenuOpen && (
            <div
              className={`bg-[#112d4e] border rounded-lg p-2 mt-4 ${
                isMenuOpen && "apriti-sesamo"
              }`}
            >
              <ul>
                <li>
                  <a
                    href="/events"
                    className="text-center py-2 px-4 text-white rounded-lg hover:bg-[#0B1D32] block"
                  >
                    Eventi
                  </a>
                </li>
                {isAuthenticated ? (
                  <>
                    <li>
                      <div className="text-center my-2">
                        <LogoutButton />
                      </div>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <LoginButton />
                    </li>
                    <li>
                      <RegisterButton />
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </section>
        {/*DESKTOP-MENU */}
        <ul className="md:flex hidden gap-8 items-center w-full">
          <li>
            <a
              href="/events"
              className="hover:bg-[#0B1D32] rounded-lg px-4 py-3"
            >
              Eventi
            </a>
          </li>
          <li className="flex-grow"></li>
          {/*Spazio vuoto per spostare sul lato destro il login e le credenziali */}
          <li>
            <Profile />
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <LogoutButton />
              </li>
            </>
          ) : (
            <>
              <li>
                <LoginButton />
              </li>
              <li>
                <RegisterButton />
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
