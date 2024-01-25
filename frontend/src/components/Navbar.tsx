//Author: Sbenduel
import { useState } from "react";
import { useSignOut } from "react-auth-kit";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  //Lista stub di link per la navigazione, current indica la pagina attuale
  //La mia idea era di importare la lista dei jSon dal backend e renderizzarla dinamicamente
  const navigation = [
    { name: "Home", href: "/", current: false },
    { name: "Register", href: "register", current: false },
    { name: "Recordings", href: "video-list", current: false },
  ];

  const signOut = useSignOut();
  const navigate = useNavigate();
  const logout = () => {
    signOut();
    navigate("/login");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    console.log("toggleMenu");
    setIsMenuOpen((open): boolean => !open);
  };

  //Funzione per capire se una classe merita il css true o false durante il rendering
  function classNames(...classes: string[] | boolean[]) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <header className="bg-[#112d4e]">
      {/*LOGO*/}
      <nav className="flex justify-start items-center h-16 px-4 md:px-[8%]">
        <div className="mr-8">
          <img
            className="lg:hidden block h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
            alt="Workflow logo"
          />
          <img
            className="lg:block hidden h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
            alt="Workflow logo"
          />
        </div>

        {/*MOBILE-MENU */}
        <section className="z-10 md:hidden absolute top-2 right-0 flex flex-col rounded-lg shadow-lg">
          <button className="text-white px-4 py-2 Inter" onClick={toggleMenu}>
            apri
          </button>
          {isMenuOpen && (
            <div className="bg-white">
              <ul className="divide-y divide-gray-400">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-[#0B1D32] text-white py-2 text-center Inter"
                          : "text-gray-600 hover:bg-[#0B1D32] hover:text-white",
                        "block px-8 py-4 text-sm Inter"
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
                      className="text-center w-full text-gray-600 hover:bg-[#0B1D32] hover:text-white block px-4 py-2 text-sm"
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
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={classNames(
                  item.current
                    ? "bg-[#0B1D32] text-white"
                    : "text-gray-300 hover:bg-[#0B1D32] hover:text-white",
                  "block rounded-md px-3 py-2 text-base Gelion font-bold"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li className="flex-grow"></li>
          <li>
            <Link to="/login">
              <button
                type="button"
                className="text-white md:block hidden Gelion font-bold py-2 px-4 rounded-lg hover:bg-[#0B1D32]"
              >
                Login
                <i className="fa-solid pl-2 fa-right-to-bracket"></i>
              </button>
            </Link>
          </li>
          <li>
            <button
              onClick={logout}
              type="button"
              className="text-white md:block hidden Gelion font-bold py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
