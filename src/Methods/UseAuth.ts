import { createContext, useContext } from "react";
import {IAuthContextType} from "../Interfaces/IAuthContextType";

export const AuthContext = createContext<IAuthContextType>(null!);

export function useAuth() {
  return useContext(AuthContext);
}