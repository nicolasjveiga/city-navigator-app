import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import Constants from 'expo-constants';

const API_BASE_URL = Constants?.expoConfig?.extra?.API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// --- Helpers para armazenar dados ---
async function setItem(key: string, value: string) {
  if (Platform.OS !== "web") {
    await SecureStore.setItemAsync(key, value);
  } else {
    localStorage.setItem(key, value);
  }
}

async function getItem(key: string) {
  if (Platform.OS !== "web") {
    return await SecureStore.getItemAsync(key);
  } else {
    return localStorage.getItem(key);
  }
}

async function removeItem(key: string) {
  if (Platform.OS !== "web") {
    await SecureStore.deleteItemAsync(key);
  } else {
    localStorage.removeItem(key);
  }
}

export async function login(email: string, password: string) {
  const response = await api.post("/login", { email, password });
  const { token, user } = response.data.data;

  await setItem("token", token);
  await setItem("user", JSON.stringify(user));

  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return user;
}

export async function register(name: string, email: string, password: string) {
  const response = await api.post("/register", { name, email, password });
  const { token, user } = response.data.data;

  await setItem("token", token);
  await setItem("user", JSON.stringify(user));

  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return user;
}

export async function getMyProfile() {
  const token = await getItem("token");
  if (!token) return null;

  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await api.get("/my-profile");
  return response.data.data;
}

export async function logout() {
  await removeItem("token");
  await removeItem("user");
  delete api.defaults.headers.common["Authorization"];
}

export default api;
