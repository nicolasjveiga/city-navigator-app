import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import Constants from "expo-constants";

let onUnauthorized: null | (() => void) = null;

export function setOnUnauthorized(callback: (() => void) | null) {
  onUnauthorized = callback;
}

const api = axios.create({
  baseURL: Constants?.expoConfig?.extra?.API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token =
    Platform.OS !== "web"
      ? await SecureStore.getItemAsync("token")
      : localStorage.getItem("token");

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      if (onUnauthorized) onUnauthorized();
    }
    return Promise.reject(error);
  }
);

export default api;
