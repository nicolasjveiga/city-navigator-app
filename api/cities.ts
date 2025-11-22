import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8005/api",
});

export async function getCities() {
  const response = await api.get("/cities");
  return response.data.data;
}

export async function getCityPhotos(id: number) {
  const response = await api.get(`/city/${id}/photos`);
  return response.data.data;
}

