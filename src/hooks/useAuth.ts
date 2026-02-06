import { useState } from "react";
import axios from "axios";
import { API_AXIOS } from "../services/config";

export interface User {
  username: string;
}

interface UseAuthReturn {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Al cargar, verifica si hay un token válido en localStorage
  useState(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        console.error("Error parsing saved user");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  });

  // Función para iniciar sesión
  const login = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Validación
      if (!username || !password) {
        setError("Usuario y contraseña son requeridos");
        setIsLoading(false);
        return false;
      }

      // Llamada a la API
      const credentials = { username, password };
      const response = await axios.post(API_AXIOS + "/auth/login", credentials);
      const data = response.data;

      // Guardar token y usuario en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ username }));

      // Actualizar estado
      setUser({ username });
      setError(null);
      setIsLoading(false);
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al iniciar sesión";
      setError(errorMessage);
      setIsLoading(false);
      return false;
    }
  };

  // Función para cerrar sesión
  const logout = (): void => {
    setUser(null);
    setError(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return {
    user,
    isLoggedIn: user !== null,
    isLoading,
    error,
    login,
    logout,
  };
}
