import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'FAVORITE_CITY_IDS';

export const getFavoriteIds = async (): Promise<string[]> => {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
};

export const addFavoriteId = async (cityId: string) => {
  const ids = await getFavoriteIds();
  if (!ids.includes(cityId)) {
    const updated = [...ids, cityId];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
};

export const removeFavoriteId = async (cityId: string) => {
  const ids = await getFavoriteIds();
  const updated = ids.filter((id) => id !== cityId);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const isFavoriteId = async (cityId: string): Promise<boolean> => {
  const ids = await getFavoriteIds();
  return ids.includes(cityId);
};
