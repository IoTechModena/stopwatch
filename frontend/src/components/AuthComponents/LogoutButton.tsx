import { useAuth0 } from "@auth0/auth0-react";

export const LogoutButton: React.FC = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <button
      className="text-white md:block hidden  font-bold py-2 px-4 rounded-lg bg-red-500 hover:bg-red-600"
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
};
export default LogoutButton;
