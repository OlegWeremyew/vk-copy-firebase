import {useContext} from "react";
import {AuthContext} from "../auth-provider";

export const useAuth = () => {
  const value = useContext(AuthContext)
  return value
}