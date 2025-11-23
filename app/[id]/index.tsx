import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Share,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons } from '@expo/vector-icons';
import Header from "../../components/Header";
import RatingStars from "../../components/RatingStars";
import { getCityById, getCityPhotos } from "../../api/cities";
import { getFavorites, createFavorite, deleteFavorite } from "../../api/favorites";
import { getCityReviews, sendReview } from "../../api/reviews";

export default function CityDetailScreen() {
  const raw = useLocalSearchParams();
  const id = Number(Array.isArray(raw.id) ? raw.id[0] : raw.id);

  const [city, setCity] = useState<any>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [favoriteId, setFavoriteId] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const { showActionSheetWithOptions } = useActionSheet();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const [cityData, photosData, reviewsData, favoritesData] =
          await Promise.all([
            getCityById(id),
            getCityPhotos(id),
            getCityReviews(id),
            getFavorites(),
          ]);

        setCity(cityData);

        setPhotos(photosData.map((p: any) => p.image));

        setReviews(reviewsData);

        const fav = favoritesData.find((f: any) => f.city?.id === id);
        setFavoriteId(fav ? fav.id : null);

      } catch (err) {
        console.log("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  const isSaved = favoriteId !== null;

  async function toggleSave() {
    try {
      if (!isSaved) {
        const newFav = await createFavorite(id);
        setFavoriteId(newFav.id);
      } else {
        await deleteFavorite(favoriteId!);
        setFavoriteId(null);
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Erro ao salvar favorito.");
    }
  }

  async function submitReview() {
    if (!comment || rating === 0) {
      return Alert.alert("Preencha comentário e selecione uma nota!");
    }

    try {
      setSubmitting(true);
      await sendReview(id, comment, rating);

      setComment("");
      setRating(0);

      Alert.alert("Review enviada!");

      const updatedReviews = await getCityReviews(id);
      setReviews(updatedReviews);

    } catch (err) {
      console.log(err);
      Alert.alert("Erro ao enviar review.");
    } finally {
      setSubmitting(false);
    }
  }

  function openOptions() {
    const options = [
      isSaved ? "Remover dos favoritos" : "Salvar cidade",
      "Compartilhar cidade",
      "Cancelar",
    ];

    showActionSheetWithOptions(
      { options, cancelButtonIndex: 2 },
      (buttonIndex) => {
        if (buttonIndex === 0) toggleSave();
        if (buttonIndex === 1 && city) {
          Share.share({
            message: `Olha essa cidade: ${city.name}, ${city.country}!`,
          });
        }
      }
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!city) {
    return (
      <View style={styles.center}>
        <Text>Erro ao carregar cidade.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="CityNavigator" isLink />

      <ScrollView contentContainerStyle={styles.container}>

        <View style={{ position: "relative" }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
          >
            {photos.length > 0 ? (
              photos.map((uri, index) => (
                <Image key={index} source={{ uri }} style={styles.photo} />
              ))
            ) : (
              <Image
                source={require("../../assets/images/fallback.jpg")}
                style={styles.photo}
              />
            )}
          </ScrollView>

          {/* Botão flutuante */}
          <TouchableOpacity
            onPress={toggleSave}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              backgroundColor: "rgba(255,255,255,0.9)",
              padding: 10,
              borderRadius: 50,
              elevation: 5,
            }}
          >
            <Ionicons
              name={isSaved ? "heart" : "heart-outline"}
              size={26}
              color={isSaved ? "red" : "black"}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{city.name}</Text>
        <Text style={styles.subtitle}>{city.country}</Text>

        <RatingStars rating={city.average_rating} />
        <Text style={styles.ratingText}>
          {city.average_rating.toFixed(1)} / 5.0
        </Text>

        <Text style={styles.description}>{city.description}</Text>

        <Button title="⋮ Mais opções" onPress={openOptions} />

        <View style={styles.reviewContainer}>
          <Text style={styles.sectionTitle}>Deixe sua avaliação:</Text>

          <RatingStars rating={rating} setRating={setRating} interactive />

          <TextInput
            style={styles.input}
            placeholder="Escreva seu comentário..."
            value={comment}
            onChangeText={setComment}
            multiline
          />

          <Button
            title={submitting ? "Enviando..." : "Enviar review"}
            onPress={submitReview}
            disabled={submitting}
          />
        </View>

        <Text style={styles.sectionTitle}>Reviews:</Text>
        {reviews.length === 0 && <Text>Nenhuma review ainda.</Text>}

        {reviews.map((rev) => (
          <View key={rev.id} style={styles.reviewItem}>
            <Text style={styles.reviewAuthor}>{rev.user_name}</Text>
            <RatingStars rating={rev.rating} />
            <Text style={styles.reviewComment}>{rev.comment}</Text>
          </View>
        ))}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  carousel: { width: "100%", height: 250, marginBottom: 16 },
  photo: { width: 360, height: 250, borderRadius: 12, marginRight: 8 },

  title: { fontSize: 28, fontWeight: "bold", marginTop: 4 },
  subtitle: { fontSize: 18, color: "#777", marginBottom: 8 },

  ratingText: { marginTop: 4, marginBottom: 12, fontSize: 14, color: "#555" },

  description: {
    fontSize: 16,
    marginBottom: 24,
    color: "#444",
    lineHeight: 22,
  },

  reviewContainer: { marginTop: 24, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    minHeight: 60,
    marginBottom: 8,
  },

  reviewItem: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  reviewAuthor: { fontWeight: "bold", marginBottom: 4 },
  reviewComment: { color: "#333" },
});
