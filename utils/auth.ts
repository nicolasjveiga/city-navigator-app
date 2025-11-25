import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export async function isAuthenticated() {
  if (Platform.OS === "web") {
    const token = localStorage.getItem("token");
    return !!token;
  }

  const token = await SecureStore.getItemAsync("token");
  return !!token;
}

export async function saveToken(token: string) {
  if (Platform.OS === "web") {
    localStorage.setItem("token", token);
    return;
  }

  await SecureStore.setItemAsync("token", token);
}

export async function logout() {
  if (Platform.OS === "web") {
    localStorage.removeItem("token");
    return;
  }

  await SecureStore.deleteItemAsync("token");
}
