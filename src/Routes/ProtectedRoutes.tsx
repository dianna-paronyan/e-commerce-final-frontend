import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import React  from "react";

const ProtectedRoute = (props:{ children: React.ReactNode }) => {
  const navigate = useNavigate();
  const {decoded} = useLocalStorage()

  const checkUserToken = () => {
    if (!decoded || (decoded && decoded.is_verified === 0)) {
      return navigate("/login");
    }
  };
  useEffect(() => {
    checkUserToken();
  }, [decoded]);
  return <>{decoded ? props.children : null}</>;
};
export default ProtectedRoute;
