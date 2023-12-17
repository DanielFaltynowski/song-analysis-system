// AuthContext.js
import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const login = () => {
    // Perform login logic (e.g., set user credentials, update isLoggedIn state)
    setLoggedIn(true);
  };

  const logout = () => {
    // Perform logout logic (e.g., clear user credentials, update isLoggedIn state)
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
