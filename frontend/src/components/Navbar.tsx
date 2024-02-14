//Author: Sbenduel
import { useState } from "react";
import { Link } from "react-router-dom";
import { LogoComponent } from "./LogoComponent";
import LoginButton from "./AuthComponents/LoginButton";
import LogoutButton from "./AuthComponents/LogoutButton";
import { RegisterButton } from "./AuthComponents/RegisterButton";
import Profile from "./AuthComponents/Profile";
import { useAuth0 } from "@auth0/auth0-react";

export const Navbar = () => {
  const navigation = [{ name: "Eventi", href: "events", current: false }];

  const { isAuthenticated } = useAuth0();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((open): boolean => !open);
  };

  //Funzione per capire se una classe merita il css true o false durante il rendering
  function classNames(...classes: string[] | boolean[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <header className="text-white bg-[#112d4e] Gelion">
      <nav className="font-bold flex justify-start items-center h-16 px-4 md:px-[8%]">
        <LogoComponent />
        {/*MOBILE-MENU */}
        <section className="z-10 md:hidden absolute top-2 right-0 flex flex-col rounded-lg align-items">
          <button
            className="text-white  hover:bg-[#0B1D32] rounded-lg px-4 py-2"
            onClick={toggleMenu}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          {isMenuOpen && (
            <div className="bg-white border border-[#0B1D32] rounded-lg">
              <ul className="divide-y divide-gray-400">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-[#0B1D32] text-white py-2 text-center"
                          : "text-gray-600 hover:bg-[#0B1D32] hover:text-white",
                        "block px-8 py-4 text-sm "
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
                <li key="login">
                  <Link to="/login">
                    <button
                      type="button"
                      className="text-center w-full text-gray-600  hover:bg-[#0B1D32] hover:text-white block px-8 py-4 text-sm"
                    >
                      Login
                      <i className="fa-solid fa-right-to-bracket"></i>
                    </button>
                  </Link>
                </li>
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
          {/*Spazio vuoto per portare tutto a destra */}
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
