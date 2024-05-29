import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthUser = async () => {
      const user = JSON.parse(localStorage.getItem("studiouser")) || null;
      setAuthUser(user);
      setIsLoading(false);
    };

    fetchAuthUser();
  }, []);

  const isAuthenticated = !!authUser;

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
