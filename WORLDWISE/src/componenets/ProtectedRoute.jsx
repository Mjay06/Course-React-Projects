/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useUserAuthContext } from "./userAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { userAuth } = useUserAuthContext();
  useEffect(
    function () {
      if (!userAuth) navigate("/");
    },
    [navigate, userAuth]
  );
  return userAuth ? children : null
}

export default ProtectedRoute;
