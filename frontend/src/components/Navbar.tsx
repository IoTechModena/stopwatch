//Author: Sbenduel
import { useMenu } from "@/hooks/useMenu";
import { Link } from "react-router-dom";
import { LogoComponent } from "./LogoComponent";
import LoginButton from "./AuthComponents/LoginButton";
import LogoutButton from "./AuthComponents/LogoutButton";
import { RegisterButton } from "./AuthComponents/RegisterButton";
import Profile from "./AuthComponents/Profile";
import { useAuth0 } from "@auth0/auth0-react";

export const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const { isMenuOpen, toggleMenu } = useMenu(); //spacchettamento di funzione dall'hook useMenuToggle

  return (
    <header className="text-white bg-[#112d4e] Gelion">
      <nav className="font-bold flex justify-start items-center h-16 px-4 md:px-[8%]">
        <LogoComponent />
        {/*MOBILE-MENU */}
        <section className="z-10 md:hidden absolute top-2 right-0 flex flex-col rounded-lg align-items">
          <div className="flex items-center">
            <Profile />
            <button
              className="text-white hover:bg-[#0B1D32] rounded-lg px-4 py-2"
              onClick={toggleMenu}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
          {isMenuOpen && (
            <div className="bg-[#112d4e] border rounded-lg py-2">
              <ul className="">
                <li>
                  <Link
                    to="/events"
                    className="text-center mb-2 py-2 px-4 text-white rounded-lg hover:bg-[#0B1D32] block"
                  >
                    Eventi
                  </Link>
                </li>
                {isAuthenticated ? (
                  <>
                    <li>
                      <div className="justify-center text-center">
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
            <Link
              to="/events"
              className="hover:bg-[#0B1D32] rounded-lg px-4 py-3"
            >
              Eventi
            </Link>
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
