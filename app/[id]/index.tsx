import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Button,
  Share,
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useActionSheet } from '@expo/react-native-action-sheet';

import Header from '../../components/Header';
import RatingStars from '../../components/RatingStars';

import {
  addFavoriteId,
  removeFavoriteId,
  isFavoriteId,
} from '../../utils/favorites';

import { getCityById, getCityPhotos } from '../../api/cities';
import { Image } from 'react-native';
import api from '../../api/auth';

export default function CityDetailScreen() {
  const raw = useLocalSearchParams();
  const id = Number(Array.isArray(raw.id) ? raw.id[0] : raw.id);

  const [city, setCity] = useState<any>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  const [reviews, setReviews] = useState<any[]>([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const { showActionSheetWithOptions } = useActionSheet();

  useEffect(() => {
    loadCity();
    loadReviews();
    if (id) isFavoriteId(String(id)).then(setSaved);
  }, [id]);

  async function loadCity() {
    try {
      const cityData = await getCityById(id);
      const photosData = await getCityPhotos(id);

      setCity(cityData);
      setPhotos(photosData.map((p: any) => p.image));
    } catch (err) {
      console.log("Erro ao carregar cidade:", err);
    } finally {
      setLoading(false);
    }
  }

  async function loadReviews() {
    try {
      const response = await api.get(`/city/${id}/reviews`);
      setReviews(response.data.data);
    } catch (err) {
      console.log("Erro ao carregar reviews:", err);
    }
  }

  const submitReview = async () => {
    if (!comment || rating === 0) {
      Alert.alert('Preencha comentário e selecione uma nota!');
      return;
    }

    try {
      setSubmitting(true);
      await api.post('/review', {
        city_id: id,
        comment,
        rating,
      });

      setComment('');
      setRating(0);

      Alert.alert('Review enviada!');
      loadReviews();
    } catch (err) {
      console.log(err);
      Alert.alert('Erro ao enviar review');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleSave = async () => {
    if (!city) return;
    if (saved) {
      await removeFavoriteId(String(id));
      Alert.alert('Removido dos favoritos');
    } else {
      await addFavoriteId(String(id));
      Alert.alert('Adicionado aos favoritos');
    }
    setSaved(!saved);
  };

  const openOptions = () => {
    const options = [
      saved ? 'Remover dos favoritos' : 'Salvar cidade',
      'Compartilhar cidade',
      'Cancelar',
    ];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      { options, cancelButtonIndex },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            toggleSave();
            break;
          case 1:
            if (city) {
              Share.share({
                message: `Olha essa cidade: ${city.name}, ${city.country}!`,
              });
            }
            break;
        }
      }
    );
  };

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
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
        >
          {photos.length > 0 ? (
            photos.map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={styles.photo}
                resizeMode="cover"
              />
            ))
          ) : (
            <Image
              source={require('../../assets/images/fallback.jpg')}
              style={styles.photo}
            />
          )}
        </ScrollView>

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
            title={submitting ? 'Enviando...' : 'Enviar review'}
            onPress={submitReview}
            disabled={submitting}
          />
        </View>

        <View style={styles.reviewList}>
          <Text style={styles.sectionTitle}>Reviews:</Text>
          {reviews.length === 0 && <Text>Nenhuma review ainda.</Text>}
          {reviews.map((rev) => (
            <View key={rev.id} style={styles.reviewItem}>
              <Text style={styles.reviewAuthor}>{rev.user_name}</Text>
              <RatingStars rating={rev.rating} />
              <Text style={styles.reviewComment}>{rev.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  carousel: { width: '100%', height: 250, marginBottom: 16 },
  photo: { width: 360, height: 250, borderRadius: 12, marginRight: 8 },

  title: { fontSize: 28, fontWeight: 'bold', marginTop: 4 },
  subtitle: { fontSize: 18, color: '#777', marginBottom: 8 },

  ratingText: { marginTop: 4, marginBottom: 12, fontSize: 14, color: '#555' },

  description: { fontSize: 16, marginBottom: 24, color: '#444', lineHeight: 22 },

  reviewContainer: { marginTop: 24, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    minHeight: 60,
  },
  reviewList: { marginBottom: 24 },
  reviewItem: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
  },
  reviewAuthor: { fontWeight: 'bold', marginBottom: 4 },
  reviewComment: { color: '#333' },
});
