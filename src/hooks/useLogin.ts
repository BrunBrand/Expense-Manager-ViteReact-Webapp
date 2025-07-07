import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AuthRequest } from "../model/AuthRequest";
import { authenticate } from "../services/auth-service";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { updateAuth } = useAuthContext();

  const login = (authRequest: AuthRequest) => {
    setIsLoading(true);
    authenticate(authRequest)
      .then((response) => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data));
        updateAuth(true);
        navigate("/");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError(error.message);
        }
      })
      .finally(() => setIsLoading(false));
  };
  return { error, isLoading, login };
};
