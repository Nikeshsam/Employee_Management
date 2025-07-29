// src/context/TokenContext.js
import { RollerCoaster } from "lucide-react";
import { createContext, useContext, useState, useMemo } from "react";
import CompanyProfile from "../components/Dashboard/CompanyProfile";

const LoginUserContext = createContext();

export const LoginUserProvider = ({ children }) => {
  const [loginUser, setLoginUser] = useState(() => JSON.parse(sessionStorage.getItem("LoginUser")) || {
    token: "",
    user: {
      name: "",
      email: "",
      role: ""
    },
    companyProfileStatus:false,
  });

  const saveLoginUser = (newloginUser) => {
    clearLoginUser();
    setLoginUser(newloginUser);
    sessionStorage.setItem("LoginUser", JSON.stringify(newloginUser));
  };

  const clearLoginUser = () => {
    setLoginUser({});
    sessionStorage.removeItem("LoginUser");
  };
  const contextValue = useMemo(() => ({
    loginUser,
    saveLoginUser,
    clearLoginUser
  }), [loginUser]);
  return (
    <LoginUserContext.Provider value={contextValue}>
      {children}
    </LoginUserContext.Provider>
  );
};

export const useLoginUser = () => useContext(LoginUserContext);
