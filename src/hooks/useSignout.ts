import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { signout } from "../services/auth-service";

export const useSignout = () => {
  const { updateAuth } = useAuthContext();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const logout = () => {
    setIsLoading(true);
    signout()
      .then((response) => {
        if (response && response.status === 204) {
          localStorage.clear();
          updateAuth(false);
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  };
  return { logout };
};
