import api from "./client";

// Mantém nomes usados nas telas

export async function getCityReviews(cityId: number) {
  const res = await api.get(`/city/${cityId}/reviews`);
  return res.data.data;
}

export async function sendReview(cityId: number, comment: string, rating: number) {
  const res = await api.post("/review", {
    city_id: cityId,
    comment,
    rating,
  });
  return res.data.data;
}
