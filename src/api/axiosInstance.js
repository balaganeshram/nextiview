import axios from "axios";
import apiConfig from "config/apiConfig";

const api = axios.create(apiConfig);

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("authToken");
    const requiresAuth = config.headers.requiresAuth;

    if (token && requiresAuth) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    delete config.headers.requiresAuth;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
