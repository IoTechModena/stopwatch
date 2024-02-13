import { useAuth0 } from "@auth0/auth0-react";

export const useAuthToken = () => {
  const { getIdTokenClaims } = useAuth0();

  const getToken = async (): Promise<string | undefined> => {
    const token = await getIdTokenClaims();
    return token?.__raw;
  };

  return getToken;
};
