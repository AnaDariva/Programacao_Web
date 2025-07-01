// src/lib/axios.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Axios Interceptor: Enviando token:", token);
    } else {
      console.log(
        "Axios Interceptor: Nenhum token encontrado no localStorage."
      );
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (!window.location.pathname.includes("/login")) {
        console.log(
          "Token expirado ou não autorizado. Redirecionando para login."
        );
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        const currentPath = window.location.pathname + window.location.search;
        window.location.href = `/login?redirect=${encodeURIComponent(
          currentPath
        )}`;
      }
    }
    return Promise.reject(error);
  }
);
