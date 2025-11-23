import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RatingStarsProps {
  rating: number; // nota atual
  size?: number; // tamanho da estrela
  interactive?: boolean; // se pode clicar para alterar a nota
  setRating?: (value: number) => void; // função callback para atualizar nota
}

export default function RatingStars({
  rating,
  size = 20,
  interactive = false,
  setRating,
}: RatingStarsProps) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const fillLevel = Math.min(Math.max(rating - (i - 1), 0), 1);

    const starElement = (
      <View key={i} style={styles.starContainer}>
        <Ionicons name="star" size={size} color="#ccc" />
        {fillLevel > 0 && (
          <View
            style={[
              styles.starOverlay,
              {
                width: size * fillLevel,
              },
            ]}
          >
            <Ionicons name="star" size={size} color="#FFD700" />
          </View>
        )}
      </View>
    );

    // Se for interativo, envolve em TouchableOpacity
    if (interactive && setRating) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          {starElement}
        </TouchableOpacity>
      );
    } else {
      stars.push(starElement);
    }
  }

  return <View style={styles.row}>{stars}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  starContainer: {
    position: 'relative',
    marginRight: 4,
  },
  starOverlay: {
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    left: 0,
  },
});
