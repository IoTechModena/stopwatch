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
  }, [isAuthenticated, logout, getAccessTokenSilently]);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  return (
    <>
      <Toaster />
      <div className="text-center">
        <h1 className="mb-4 mt-10 Gelion text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Benvenuto su{" "}
          <span className="bg-gradient-to-r from-[#0B1E33] to-[#2460A7] text-transparent bg-clip-text">
            StopWatch
          </span>
        </h1>
        <p className="mb-20 Gelion text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Qui troverai le telecamere disponibili, premi su "Registrazioni" per
          visualizzare gli eventi della telecamera.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center mb-10  lg:gap-x-28 md:gap-x-7 gap-y-20">
        <VideocameraCard
          key="1"
          title="Telecamera 1"
          channelNum={0}
          location={"Descrizione"}
          eventsNum={0}
          href={"events"}
        />
        <VideocameraCard
          key="2"
          title="Telecamera 2"
          channelNum={1}
          location={"Descrizione"}
          eventsNum={0}
          href={"events"}
        />
      </div>
    </>
  );
};
