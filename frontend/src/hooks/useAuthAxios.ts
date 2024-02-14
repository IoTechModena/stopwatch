import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import axios from "axios";

export const useAuthAxios = () => {
  const { getIdTokenClaims } = useAuth0();
  const [axiosInstance] = useState(() =>
    axios.create({ baseURL: "http://localhost/api" })
  );

  const getToken = async () => {
    const idTokenClaims = await getIdTokenClaims();
    return idTokenClaims?.__raw ?? "";
  };

  useEffect(() => {
    // Setup interceptor
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        config.headers.Authorization = `Bearer ${await getToken() ?? ""}`;
        return config;
      }
    );

    // Cleanup interceptor on unmount
    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, [getIdTokenClaims]); // eslint-disable-line react-hooks/exhaustive-deps


  return { axiosInstance, getToken };
};
