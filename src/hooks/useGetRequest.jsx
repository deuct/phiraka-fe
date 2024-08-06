import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { jwtDecode } from "jwt-decode";

export const useGetRequest = (requrl) => {
  const [token, setToken] = useLocalStorage("token", window.localStorage.token);
  const [name, setName] = useLocalStorage("name", window.localStorage.name);
  const [expire, setExpire] = useLocalStorage(
    "expire",
    window.localStorage.expire
  );
  const [data, setData] = useState([]);

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/user/token`
        );
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
        setName(decoded.fullname);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const { data: response } = await axios.get("/stuff/to/fetch");
        const { data: response } = await axiosJWT.get(
          `${process.env.REACT_APP_BACKEND_URL}/${requrl}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response);
      } catch (error) {
        setData({ status: 400, msg: "Failed get data" });
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return {
    data,
  };
};
