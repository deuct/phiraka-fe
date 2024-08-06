import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userlogin, setUserlogin] = useLocalStorage(
    "userlogin",
    window.localStorage.userlogin
  );

  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  // const login = async (user, userRole, status) => {
  //   if (status == 0) {
  //     console.log("here0101");
  //     navigate("/login/inactive");
  //   } else {
  //     setUserlogin(user);
  //     console.log(status);

  //     if (userRole === "superadmin") {
  //       navigate("/superadmin/home");
  //     } else {
  //       navigate("/profile");
  //     }
  //   }
  // };

  // call this function to sign out logged in user
  const logout = () => {
    window.localStorage.clear();
    // setUserlogin(null);
    navigate("/login", { replace: true });
  };

  console.log(userlogin);

  const value = useMemo(
    () => ({
      userlogin,
      // login,
      logout,
    }),
    [userlogin]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
