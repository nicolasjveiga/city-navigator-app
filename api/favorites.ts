import api from "./client";

export async function getFavorites() {
  const res = await api.get("/favorites");
  return res.data.data;
}

export async function createFavorite(cityId: number) {
  const res = await api.post("/favorite", { city_id: cityId });
  return res.data.data;
}

export async function deleteFavorite(favoriteId: number) {
  return api.delete(`/favorite/${favoriteId}`);
}
