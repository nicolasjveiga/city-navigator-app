import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { getCities, getCityPhotos } from '../api/cities';
import Header from '@/components/Header';
import CityCard from '../components/CityCard';
import { City } from '../types/City';

export default function HomeScreen() {
  const router = useRouter();

  const [cities, setCities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [typingTimeout, setTypingTimeout] = useState<any>(null);

  async function loadCities(query?: string) {
    try {
      setLoading(true);

      const data = await getCities(query ? { search: query } : undefined);

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

  useEffect(() => {
    loadCities();
  }, []);

  useEffect(() => {
    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      if (search.trim() === "") {
        loadCities();
      } else {
        loadCities(search.trim());
      }
    }, 400);

    setTypingTimeout(timeout);
  }, [search]);

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

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar cidade ou país..."
          placeholderTextColor="#888"
          style={styles.search}
        />

        <FlatList
          data={cities}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push(`/${item.id}`)}>
              <CityCard
                name={item.name}
                country={item.country}
                images={item.images}
                average_rating={item.average_rating}
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
    color: "#00b894",
  },


  search: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    outlineStyle: "none" as any,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
