import { useAuth0 } from "@auth0/auth0-react";

//Signup Button
export const RegisterButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
      authorizationParams: {
        prompt: "login",
        screen_hint: "signup",
      },
    });
  };

  return (
    <button
      className="md:block hidden py-2 px-4 rounded-lg hover:bg-[#0B1D32]"
      onClick={handleSignUp}
    >
      Registrati
    </button>
  );
};

export default RegisterButton;
