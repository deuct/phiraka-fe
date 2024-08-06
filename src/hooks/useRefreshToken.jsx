import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export const useRefreshToken = () => {
  const [token, setToken] = useLocalStorage("token", window.localStorage.token);
  const [name, setName] = useLocalStorage("name", window.localStorage.name);
  const [expire, setExpire] = useLocalStorage(
    "expire",
    window.localStorage.expire
  );
  const navigate = useNavigate();

  useEffect(() => {
    const refresh = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/user/token`
        );
        setToken(response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
        setName(decoded.fullname);
        setExpire(decoded.exp);
      } catch (error) {
        navigate("/404");
      }
    };
    // refresh();
    return { refresh };
  }, []);
};
