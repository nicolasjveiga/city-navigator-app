import api from "./auth";

export async function getFavorites() {
  const response = await api.get(`/favorites`);
  return response.data.data;
}

export async function createFavorite(cityId: number) {
  const response = await api.post(`/favorite`, { city_id: cityId });
  return response.data.data;
}

export async function deleteFavorite(favoriteId: number) {
  await api.delete(`/favorite/${favoriteId}`);
}
