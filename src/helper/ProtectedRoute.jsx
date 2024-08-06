import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  // const { userlogin } = useAuth();
  const userlogin = window.localStorage.userlogin;
  // console.log(window.localStorage.userlogin);
  if (userlogin === null || userlogin === "undefined" || userlogin === "null") {
    // user is not authenticated
    return <Navigate to="/401" />;
  }
  return children;
};
