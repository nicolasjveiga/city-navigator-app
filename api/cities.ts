import api from "./client";

export async function getCities(params?: any) {
  const res = await api.get("/cities", { params });
  return res.data.data;
}

export async function getCityById(id: number) {
  const res = await api.get(`/city/${id}`);
  return res.data.data;
}

export async function getCityPhotos(id: number) {
  const res = await api.get(`/city/${id}/photos`);
  return res.data.data;
}
