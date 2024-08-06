import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { jwtDecode } from "jwt-decode";

export const usePostRequest = () => {
  const [token, setToken] = useLocalStorage("token", window.localStorage.token);
  const [name, setName] = useLocalStorage("name", window.localStorage.name);
  const [expire, setExpire] = useLocalStorage(
    "expire",
    window.localStorage.expire
  );
  // const [data, setData] = useState([]);

  const [input, setInput] = useState({
    data: null,
    url: null,
    callback: null,
  });

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
    const postData = async () => {
      // const { data: response } = await axios.get("/stuff/to/fetch");
      await axiosJWT
        .post(`${process.env.REACT_APP_BACKEND_URL}/${input.url}`, input.data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then((res) => input.callback(res.data))
        .catch((err) => console.error(err));
    };

    if (input.data && input.url && input.callback) {
      postData();
    } else {
      console.log("Invalid arguments provided to post method");
    }
  }, [input]);

  const post = (url, data, callback) => {
    setInput({ url, data, callback });
  };

  return post;
};

// export const usePostRequest = () => {
//   return postRequest();
// };
