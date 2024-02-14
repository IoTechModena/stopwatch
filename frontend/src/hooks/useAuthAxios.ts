import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import axios from "axios";

export const useAuthAxios = () => {
  const { getIdTokenClaims } = useAuth0();
  const [axiosInstance] = useState(() =>
    axios.create({ baseURL: "http://localhost/api" })
  );

  useEffect(() => {
    // Setup interceptor
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        const idTokenClaims = await getIdTokenClaims();
        config.headers.Authorization = `Bearer ${idTokenClaims?.__raw ?? ""}`;
        return config;
      }
    );

    // Cleanup interceptor on unmount
    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, [getIdTokenClaims]); // eslint-disable-line react-hooks/exhaustive-deps
  return axiosInstance;
};
