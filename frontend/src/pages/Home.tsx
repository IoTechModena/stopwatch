import { Searchbox } from "../components/Searchbox";
import { Toaster } from "../components/Toaster";
import { VideocameraCard } from "../components/VideocameraCard";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useCallback } from "react";

export const Home = () => {
  const { isAuthenticated, logout, getAccessTokenSilently } = useAuth0();

  const checkToken = useCallback(async () => {
    if (isAuthenticated) {
      try {
        await getAccessTokenSilently();
      } catch (error) {
        logout({
          logoutParams: {
            returnTo: window.location.origin,
          },
        });
      }
    }
  },[isAuthenticated, logout, getAccessTokenSilently]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  return (
    <>
      <Toaster />
      <Searchbox />
      <div className="flex justify-center">
        <VideocameraCard />
      </div>
    </>
  );
};
