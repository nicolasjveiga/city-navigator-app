import { render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { useFavorites } from '../hooks/useFavorites';

jest.mock('../utils/favorites', () => ({
  isFavoriteId: jest.fn(),
}));

import { isFavoriteId } from '../utils/favorites';

function TestComponent({ id }: { id: string }) {
  const isSaved = useFavorites(id);
  return <Text>{isSaved ? 'Favorita' : 'Não favorita'}</Text>;
}

describe('useFavorites', () => {
  it('exibe "Favorita" se a cidade for favorita', async () => {
    (isFavoriteId as jest.Mock).mockResolvedValue(true);

    const { getByText } = render(<TestComponent id="1" />);
    await waitFor(() => {
      expect(getByText('Favorita')).toBeTruthy();
    });
  });

  it('exibe "Não favorita" se a cidade não for favorita', async () => {
    (isFavoriteId as jest.Mock).mockResolvedValue(false);

    const { getByText } = render(<TestComponent id="1" />);
    await waitFor(() => {
      expect(getByText('Não favorita')).toBeTruthy();
    });
  });
});
