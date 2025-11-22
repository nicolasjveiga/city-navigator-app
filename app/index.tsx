import { FlatList, TouchableOpacity, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { getCities } from '../api/cities';
import Header from '@/components/Header';
import CityCard from '../components/CityCard';
import { City } from '../types/City';
import axios from "axios";

export default function HomeScreen() {
  const router = useRouter();

  const [cities, setCities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function getCityPhotos(id: number) {
    const response = await axios.get(`http://localhost:8005/api/city/${id}/photos`);
    return response.data.data;
  }

  useEffect(() => {
    async function loadCities() {
      try {
        const data = await getCities();

        const enriched = await Promise.all(
          data.map(async (city: City) => {
            const photos = await getCityPhotos(city.id);

            return {
              ...city,
              images: photos.map((p: any) => p.image),
            };
          })
        );

        setCities(enriched);
      } catch (err) {
        console.log("Erro ao carregar cidades", err);
      } finally {
        setLoading(false);
      }
    }

    loadCities();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="CityNavigator" />
      <View style={styles.inner}>
        <Text style={styles.title}>Cidades</Text>

        <FlatList
          data={cities}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push(`/${item.id}`)}>
              <CityCard
                name={item.name}
                country={item.country}
                images={item.images}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  inner: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
