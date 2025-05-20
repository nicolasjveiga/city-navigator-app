import { View, Text, Image, StyleSheet } from 'react-native';

interface CityCardProps {
  name: string;
  country: string;
  image: any;
}

export default function CityCard({ name, country, image }: any) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 150,
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
