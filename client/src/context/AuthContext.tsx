import { createContext, useEffect, useState } from "react"; // <-- CORREÇÃO AQUI
import type { ReactNode } from "react";
import type {
  AuthenticatedUser,
  AuthenticationResponse,
} from "@/commons/types";
import { api } from "@/lib/axios";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  authenticated: boolean;
  authenticatedUser?: AuthenticatedUser;
  handleLogin: (authenticationResponse: AuthenticationResponse) => Promise<any>;
  handleLogout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] =
    useState<AuthenticatedUser>();
  const navigate = useNavigate();

  useEffect(() => {
    // NOVO: Ler token como string pura
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedToken) {
      setAuthenticatedUser(JSON.parse(storedUser)); // User ainda é um JSON, fazemos parse
      setAuthenticated(true);
      // NOVO: Usar o token como string pura aqui
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      console.log(
        "AuthContext: Token lido do localStorage (PURO):",
        storedToken
      ); // <-- Log para depuração
      navigate("/");
    }
  }, []);

  const handleLogin = async (
    authenticationResponse: AuthenticationResponse
  ) => {
    try {
      localStorage.setItem("token", authenticationResponse.token);
      localStorage.setItem("user", JSON.stringify(authenticationResponse.user));
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${authenticationResponse.token}`;
      console.log(
        "AuthContext: Token salvo/definido (PURO):",
        authenticationResponse.token
      );

      setAuthenticatedUser(authenticationResponse.user);
      setAuthenticated(true);
    } catch (error) {
      console.error("Erro em handleLogin:", error);
      setAuthenticatedUser(undefined);
      setAuthenticated(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    api.defaults.headers.common["Authorization"] = "";

    setAuthenticated(false);
    setAuthenticatedUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ authenticated, authenticatedUser, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
