// src/hooks/useValidateUser.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "../context/LoginUserContext";
import { validateUser } from "../api/index"; 



const useValidateUser = () => {
  const { loginUser, clearLoginUser } = useLoginUser();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(null); // null = loading, false = invalid, true = valid

  useEffect(() => {
    const validate = async () => {
      if (!loginUser.token) {
        setIsValid(false);
        return;
      }

      try {
        const res = await validateUser(loginUser.token);

        if (res.status === 200) {
            setIsValid(true);
            navigate('/Home');
        } else {
            setIsValid(false);
            clearLoginUser();
            navigate('/Authentication');
        }
      } catch (err) {
            console.error("Token validation failed", err);
            setIsValid(false);
            clearLoginUser();
            navigate('/Authentication');
      }
    };

    validate();
  }, [loginUser,navigate]);

  return { isValid, loading: isValid === null };
};

export default useValidateUser;
