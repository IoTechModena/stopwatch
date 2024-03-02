import { useMenu } from "@/hooks/useMenu";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./AuthComponents/LoginButton";
import LogoutButton from "./AuthComponents/LogoutButton";
import Profile from "./AuthComponents/Profile";
import { RegisterButton } from "./AuthComponents/RegisterButton";
import { LogoComponent } from "./LogoComponent";
import { useRef } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

export const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const { isMenuOpen, toggleMenu, closeMenu } = useMenu();
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, closeMenu);

  return (
    <header className="text-white bg-[#112d4e] Gelion">
      <nav className="font-bold flex justify-start items-center h-16 px-4 md:px-[8%]">
        <LogoComponent />
        {/*MOBILE-MENU */}
        <section
          ref={menuRef}
          className="z-10 md:hidden absolute top-2 right-2 flex-col rounded-lg"
        >
          <div className="flex mt-1">
            <Profile />
            {/*il nome sarebbe dropdown menu*/}
            <button
              className="lg:hover:bg-[#0B1D32] rounded-lg px-4 py-2 mx-4"
              onClick={toggleMenu}
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
