import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/", // Torna alla homePage dopo login
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return (
    <button
      className="text-white md:block hidden font-bold py-2 px-4 rounded-lg hover:bg-[#0B1D32]"
      onClick={handleLogin}
    >
      Accedi
      <i className="fa-solid pl-2 fa-right-to-bracket"></i>
    </button>
  );
};

export default LoginButton;
