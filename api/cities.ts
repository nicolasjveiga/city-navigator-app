import axios from "axios";
import Constants from "expo-constants";

const API_BASE_URL = Constants?.expoConfig?.extra?.API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export async function getCities(headers?: any) {
  const response = await api.get("/cities", {
    headers: headers ? headers : {}
  });

  return response.data.data;
}


export async function getCityById(id: number) {
  const response = await api.get(`/city/${id}`);
  return response.data.data;
}

export async function getCityPhotos(id: number) {
  const response = await api.get(`/city/${id}/photos`);
  return response.data.data;
}
