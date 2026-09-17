import {
  createContext,
  useState,
} from "react";

import api from "../utils/api";
import {
  saveAuthData,
  clearAuthData,
  getToken,
  getEmail,
  getRole,
} from "../utils/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  // Restore user directly from localStorage
  const [user, setUser] = useState(() => {

    const token = getToken();
    const email = getEmail();
    const role = getRole();

    if (token && email && role) {
      return {
        email,
        role,
      };
    }

    return null;
  });

  // ================= LOGIN =================

  const login = async (email, password) => {

    try {

      const response = await api.post("/user/login", {
        email,
        password,
      });

      const data = response.data;

      saveAuthData(data);

      const loggedInUser = {
        email: data.email,
        role: data.role,
      };

      setUser(loggedInUser);

      return {
        success: true,
        user: loggedInUser,
      };

    } catch (error) {

      console.error("Login error:", error);

      let message = "Invalid email or password";

      if (error.response?.data?.message) {
        message = error.response.data.message;
      }

      return {
        success: false,
        message,
      };
    }
  };

  // ================= REGISTER =================

  const register = async (userData) => {

    try {

      const response = await api.post("/user", userData);

      return {
        success: true,
        user: response.data,
      };

    } catch (error) {

      console.error("Register error:", error);

      let message = "Registration failed";

      if (error.response?.data?.message) {
        message = error.response.data.message;
      }

      return {
        success: false,
        message,
      };
    }
  };

  // ================= LOGOUT =================

  const logout = () => {

    clearAuthData();

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}