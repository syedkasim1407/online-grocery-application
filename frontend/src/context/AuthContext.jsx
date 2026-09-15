import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Mock customer
    if (
      email === "customer@gmail.com" &&
      password === "123456"
    ) 
    {
      const loggedInUser = 
      {
        id: 1,
        name: "John",
        email: email,
        role: "CUSTOMER",
      };

      setUser(loggedInUser);

      return {
        success: true,
        user: loggedInUser,
      };
    }

    // Mock admin
    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {
      const loggedInUser = {
        id: 2,
        name: "Admin",
        email: email,
        role: "ADMIN",
      };

      setUser(loggedInUser);

      return {
        success: true,
        user: loggedInUser,
      };
    }

    return {
      success: false,
      message: "Invalid email or password",
    };
  };

  const logout = () => {
    setUser(null);
  };

  const register = (userData) => {
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      role: "CUSTOMER",
    };

    setUser(newUser);

    return {
      success: true,
      user: newUser,
    };
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

export function useAuth() {
  return useContext(AuthContext);
}