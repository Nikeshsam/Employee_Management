// src/context/TokenContext.js
import { RollerCoaster } from "lucide-react";
import { createContext, useContext, useState, useMemo } from "react";
import CompanyProfile from "../components/Dashboard/CompanyProfile";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const LoginUserContext = createContext();


export const LoginUserProvider = ({ children }) => {

  
const navigate = useNavigate();
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

  const memoValue = useMemo(() => {
    return {
      loginUser: loginUser,
      saveLoginUser: saveLoginUser,
      clearLoginUser: clearLoginUser,
    };
  })

    useEffect(() => {
    if (!loginUser.token) return;

    try {
      const decoded = jwtDecode(loginUser.token);
      const expiryTime = decoded.exp * 1000 - Date.now();

      if (expiryTime <= 0) {
        navigate('/Authentication');
      } else {
        const timer = setTimeout(() => {
        navigate('/Authentication');
        }, expiryTime);

        return () => clearTimeout(timer);
      }
    } catch {
      logout();
    }
  }, [loginUser.token]);

  return (
    <LoginUserContext.Provider value={memoValue}>
      {children}
    </LoginUserContext.Provider>
  );
};

export const useLoginUser = () => useContext(LoginUserContext);
