import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { getFavoriteIds } from '../../utils/favorites';
import { cities, City } from '../../data/cities';
import CityCard from '../../components/CityCard';
import Header from '../../components/Header';



export default function SavedScreen() {
  const [favorites, setFavorites] = useState<City[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadFavorites = async () => {
        const ids = await getFavoriteIds();
        const fullCities = ids
          .map((id) => cities.find((c) => c.id === id))
          .filter((c): c is City => !!c);
        setFavorites(fullCities);
      };

      loadFavorites();
    }, [])
  );

  if (favorites.length === 0) {
    return (
      <View style={styles.screen}>
        <Header title="CityNavigator" isLink/>
        <View style={styles.empty}>
          <Text>Nenhuma cidade salva ainda.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="CityNavigator" isLink />
      <View style={styles.container}>
        <Text style={styles.title}>Favoritos</Text>
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CityCard
              name={item.name}
              country={item.country}
              image={item.image}
              id={item.id}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: { padding: 16 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

