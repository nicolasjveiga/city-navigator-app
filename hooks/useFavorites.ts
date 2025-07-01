import { useEffect, useState } from 'react';
import { isFavoriteId } from '../utils/favorites';

export function useFavorites(id: string) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    isFavoriteId(id).then(setSaved);
  }, [id]);

  return saved;
}
