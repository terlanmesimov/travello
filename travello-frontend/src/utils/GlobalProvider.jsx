import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [hasToken, setHasToken] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    profilePhotoBase64: null,
    favoritePlaceIds: [],
    commentIds: [],
  });

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        setHasToken(true);
        const response = await axios.post(
          `${process.env.REACT_APP_REST_API_URL}/user/check`,
          token
        );
        setUserData(response.data);
      } else {
        setHasToken(false);
      }
    } catch (error) {
      localStorage.removeItem("token");
      setHasToken(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  const globalStates = {
    hasToken,
    setHasToken,
    userData,
    setUserData,
    checkAuth,
  };
  return (
    <GlobalContext.Provider value={globalStates}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
