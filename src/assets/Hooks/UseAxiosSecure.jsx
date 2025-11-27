import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router";
const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});
const UseAxiosSecure = () => {
  // jwt =>start

  // interceptor request
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  // useEffect(() => {
  //   const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
  //     config.headers.Authorization = `Bearer ${user.accessToken}`;
  //     return config;
  //   });
  //   return () => {
  //     // interceptor request
  //     const resInterceptor = axiosSecure.interceptors.response.use(
  //       (response) => {
  //         return response;
  //       },
  //       (error) => {
  //         console.log(error);

  //         const statusCode = error.status;
  //         if (statusCode === 401 || statusCode === 403) {
  //           logOut().then(() => {
  //             navigate("/login");
  //           });
  //         }
  //         return Promise.reject(error);
  //       }
  //     );
  //     axiosSecure.interceptors.request.eject(reqInterceptor);
  //     axiosSecure.interceptors.response.eject(resInterceptor);
  //   };
  // }, [user, logOut, navigate]);
  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          logOut().then(() => navigate("/login"));
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);

  // jwt =>end
  return axiosSecure;
};

export default UseAxiosSecure;
