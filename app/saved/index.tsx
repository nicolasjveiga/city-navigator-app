import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { View, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import Header from "../../components/Header";
import CityCard from "../../components/CityCard";
import api from "../../api/client";
import { getCityPhotos } from "../../api/cities";

interface Favorite {
  id: number;
  city: {
    id: number;
    name: string;
    country: string;
    average_rating: number;
    images?: string[];
  };
}

export default function SavedScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function load() {
        try {
          setLoading(true);

          const response = await api.get("/favorites");
          const favs = response.data.data;

          const enriched = await Promise.all(
            favs.map(async (fav: Favorite) => {
              const photos = await getCityPhotos(fav.city.id);

              return {
                ...fav,
                city: {
                  ...fav.city,
                  images: photos.map((p: any) => p.image),
                },
              };
            })
          );

          setFavorites(enriched);
        } catch (e) {
          console.log("Erro ao carregar favoritos", e);
        } finally {
          setLoading(false);
        }
      }

      load();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.screen}>
        <Header title="CityNavigator" isLink />
        <View style={styles.empty}>
          <Text>Nenhuma cidade salva ainda.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="CityNavigator" isLink />

      <Text style={styles.title}>Favoritos</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/${item.city.id}`)}>
            <CityCard
              name={item.city.name}
              country={item.city.country}
              images={item.city.images || []}
              average_rating={item.city.average_rating}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f3f3f3" },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  listContent: {
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
    color: "#00b894",
  },

});
