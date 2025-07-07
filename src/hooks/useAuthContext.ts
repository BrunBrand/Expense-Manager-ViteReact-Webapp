import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("context not available");
  }
  return context;
};
