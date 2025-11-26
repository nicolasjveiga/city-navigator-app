import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Header from '../../components/Header';
import PhotoCarousel from '../../components/PhotoCarousel';
import FavoriteButton from '../../components/FavoriteButton';
import RatingStars from '../../components/RatingStars';
import PrimaryButton from '../../components/PrimaryButton';
import ScreenContainer from '../../components/ScreenContainer';
import {
  getCityById,
  getCityPhotos,
} from '../../api/cities';
import { getCityReviews } from '../../api/reviews';
import {
  getFavorites,
  createFavorite,
  deleteFavorite,
} from '../../api/favorites';
import { sendReview } from '../../api/reviews';
import { COLORS, SPACING, TYPO } from '../../constants/theme';

export default function CityDetailScreen() {
  const raw = useLocalSearchParams();
  const id = Number(Array.isArray(raw.id) ? raw.id[0] : raw.id);
  const router = useRouter();

  const [city, setCity] = useState<any | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [favoriteId, setFavoriteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadAll() {
      try {
        setLoading(true);
        const [cityData, photosData, reviewsData, favoritesData] =
          await Promise.all([
            getCityById(id),
            getCityPhotos(id),
            getCityReviews(id),
            getFavorites(),
          ]);

        if (!mounted) return;

        setCity(cityData);
        setPhotos(photosData.map((p: any) => p.image));
        setReviews(reviewsData || []);

        const fav = (favoritesData || []).find((f: any) => f.city?.id === id);
        setFavoriteId(fav ? fav.id : null);
      } catch (err: any) {
        console.log('Erro ao carregar cidade:', err);
        Alert.alert('Erro', 'Não foi possível carregar a cidade. Tente novamente.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadAll();
    return () => {
      mounted = false;
    };
  }, [id]);

  async function toggleSave() {
    try {
      if (favoriteId == null) {
        const newFav = await createFavorite(id);
        setFavoriteId(newFav.id);
      } else {
        await deleteFavorite(favoriteId);
        setFavoriteId(null);
      }
    } catch (err) {
      console.log('Erro favorito:', err);
      Alert.alert('Erro ao salvar favorito.');
    }
  }

  async function submitReview() {
    if (!comment.trim() || rating === 0) {
      return Alert.alert('Preencha comentário e selecione uma nota!');
    }
    try {
      setSubmitting(true);
      await sendReview(id, comment.trim(), rating);

      setComment('');
      setRating(0);
      const updated = await getCityReviews(id);
      setReviews(updated);

      Alert.alert('Review enviada!');
    } catch (err) {
      console.log('Erro enviar review:', err);
      Alert.alert('Erro ao enviar review.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <View style={localStyles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!city) {
    return (
      <View style={localStyles.center}>
        <Text>Erro ao carregar cidade.</Text>
      </View>
    );
  }

  const isSaved = favoriteId !== null;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Header title="CityNavigator" isLink />
      <ScreenContainer>
        <View style={{ position: 'relative' }}>
          <PhotoCarousel photos={photos} />
          <FavoriteButton isSaved={isSaved} onPress={toggleSave} />
        </View>

        <View style={localStyles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={TYPO.h1 as any}>{city.name}</Text>
            <Text style={localStyles.subtitle}>{city.country}</Text>
          </View>

          <View style={localStyles.ratingBox}>
            <RatingStars rating={city.average_rating} />
            <Text style={localStyles.ratingNumber}>{city.average_rating.toFixed(1)}</Text>
          </View>
        </View>

        <Text style={localStyles.description}>{city.description}</Text>

        <View style={localStyles.reviewContainer}>
          <Text style={localStyles.sectionTitle}>Deixe sua avaliação:</Text>

          <RatingStars rating={rating} setRating={setRating} interactive />

          <TextInput
            style={localStyles.input}
            placeholder="Escreva seu comentário..."
            value={comment}
            onChangeText={setComment}
            multiline
          />

          <PrimaryButton onPress={submitReview} disabled={submitting}>
            {submitting ? 'Enviando...' : 'Enviar review'}
          </PrimaryButton>
        </View>

        <Text style={localStyles.sectionTitle}>Reviews:</Text>
        {reviews.length === 0 && <Text>Nenhuma review ainda.</Text>}

        {reviews.map((rev) => (
          <View key={rev.id} style={localStyles.reviewItem}>
            <Text style={localStyles.reviewAuthor}>{rev.user_name}</Text>
            <RatingStars rating={rev.rating} />
            <Text style={localStyles.reviewComment}>{rev.comment}</Text>
          </View>
        ))}
      </ScreenContainer>
    </View>
  );
}

const localStyles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING(1),
  },

  subtitle: { fontSize: 18, color: '#777', marginBottom: 8 },

  ratingBox: { alignItems: 'flex-end' },
  ratingNumber: { marginTop: 2, fontSize: 14, fontWeight: 'bold', color: '#555' },

  description: { fontSize: 16, marginBottom: SPACING(3), color: '#444', lineHeight: 22 },

  reviewContainer: { marginTop: SPACING(2), marginBottom: SPACING(2) },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    minHeight: 60,
    marginBottom: SPACING(1),
  },

  reviewItem: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  reviewAuthor: { fontWeight: 'bold', marginBottom: 4 },
  reviewComment: { color: '#333' },
});
