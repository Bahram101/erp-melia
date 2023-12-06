import axios from "axios";

export const API_URL = "http://77.243.80.234:8998/api";

const $api = axios.create({
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("auth-token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 400) {
      return Promise.reject(error);
    }
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.put(`${API_URL}/users/refresh-token`, {
          refreshToken: localStorage.getItem("refresh-token"),
        });
        localStorage.setItem("auth-token", response?.data?.accessToken);
        localStorage.setItem("refresh-token", response?.data?.refreshToken);
        return $api.request(originalRequest);
      } catch (error:any) {
        if (error.response.status == 403) {
          localStorage.removeItem("auth-token");
          window.location.href = "/";
        }
      }
    }
    if (error.response.status == 403) {
      localStorage.removeItem("auth-token");
      window.location.href = "/";
    }
  }
);

export default $api;
