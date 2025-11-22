import { View, Text, Image, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useState } from 'react';

interface CityCardProps {
  name: string;
  country: string;
  images: string[];
}

const { width } = Dimensions.get('window');

export default function CityCard({ name, country, images }: CityCardProps) {
  const [index, setIndex] = useState(0);

  const data =
    images && images.length > 0
      ? images
      : [require('../assets/images/fallback.jpg')];

  return (
    <View style={styles.card}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Image
            source={typeof item === 'string' ? { uri: item } : item}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        keyExtractor={(_, idx) => String(idx)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
        onScroll={(event) => {
          const slide = Math.round(
            event.nativeEvent.contentOffset.x / width
          );
          setIndex(slide);
        }}
        scrollEventThrottle={16}
      />

      <View style={styles.indicators}>
        {data.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { opacity: index === i ? 1 : 0.3 }
            ]}
          />
        ))}
      </View>

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.country}>{country}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
  },
  carousel: {
    width: '100%',
  },
  image: {
    width,
    height: 200,
  },

  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
    marginHorizontal: 4,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 8,
  },
  country: {
    fontSize: 14,
    color: '#777',
    marginHorizontal: 8,
    marginBottom: 8,
  },
});
