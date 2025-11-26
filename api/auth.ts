import api from "./client";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

async function setItem(key: string, value: string) {
  if (Platform.OS !== "web") return SecureStore.setItemAsync(key, value);
  return localStorage.setItem(key, value);
}

async function getItem(key: string) {
  if (Platform.OS !== "web") return SecureStore.getItemAsync(key);
  return localStorage.getItem(key);
}

export async function login(email: string, password: string) {
  const response = await api.post("/login", { email, password });
  const { token, user } = response.data.data;

  await setItem("token", token);
  await setItem("user", JSON.stringify(user));

  return user;
}

export async function register(name: string, email: string, password: string) {
  const response = await api.post("/register", { name, email, password });
  const { token, user } = response.data.data;

  await setItem("token", token);
  await setItem("user", JSON.stringify(user));

  return user;
}

export async function getMyProfile() {
  const token = await getItem("token");
  if (!token) return null;

  const res = await api.get("/my-profile");
  return res.data.data;
}

export async function isLoggedIn() {
  const token = await getItem("token");
  return !!token;
}

export async function logout() {
  if (Platform.OS !== "web") {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("user");
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}
