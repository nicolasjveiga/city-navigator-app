import api from "./auth";

export async function getCityReviews(cityId: number) {
  const response = await api.get(`/city/${cityId}/reviews`);
  return response.data.data;
}

export async function sendReview(cityId: number, comment: string, rating: number) {
  const response = await api.post(`/review`, {
    city_id: cityId,
    comment,
    rating,
  });

  return response.data.data;
}
