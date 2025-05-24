import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Step 1: Restore sessionStorage if opened in new tab and it's empty
    const sessionUserId = sessionStorage.getItem("userId");
    const sessionAuthToken = sessionStorage.getItem("authToken");
    const localUser = localStorage.getItem("user");

    if ((!sessionUserId || !sessionAuthToken) && localUser) {
      try {
        const parsedUser = JSON.parse(localUser);
        if (parsedUser?.userId && parsedUser?.bearerToken) {
          sessionStorage.setItem("userId", parsedUser.userId);
          sessionStorage.setItem("authToken", parsedUser.bearerToken);
        }
      } catch (error) {
        console.error("Failed to parse localStorage user data:", error);
      }
    }

    // Step 2: If path is "/Presentation" and sessionStorage is empty, clear localStorage too
    if (
      location.pathname.toLowerCase() === "/presentation" &&
      (!sessionStorage.getItem("userId") || !sessionStorage.getItem("authToken"))
    ) {
      localStorage.removeItem("user");
    }

    // Load user from localStorage into context state
    if (localUser) {
      setUser(JSON.parse(localUser));
    }

    setIsUserLoaded(true);
  }, [location]);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("userId", userData.userId);
    sessionStorage.setItem("authToken", userData.bearerToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userId");
    setUser(null);
  };

  if (!isUserLoaded) return null;

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
