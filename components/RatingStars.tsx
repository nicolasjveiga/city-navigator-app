import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RatingStarsProps {
  rating: number;
  size?: number;
}

export default function RatingStars({ rating, size = 20 }: RatingStarsProps) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const fillLevel = Math.min(Math.max(rating - (i - 1), 0), 1);

    stars.push(
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
  }

  return <View style={styles.row}>{stars}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  starContainer: {
    position: 'relative',
  },
  starOverlay: {
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    left: 0,
  },
});
