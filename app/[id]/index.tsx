import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Button, Share } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useActionSheet } from '@expo/react-native-action-sheet';

import { cities } from '../../data/cities';
import {
  addFavoriteId,
  removeFavoriteId,
  isFavoriteId,
} from '../../utils/favorites';
import Header from '../../components/Header';



export default function CityDetailScreen() {
  const raw = useLocalSearchParams();
  const id = Array.isArray(raw.id) ? raw.id[0] : raw.id;
  const city = cities.find((c) => c.id === id);
  const [saved, setSaved] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();

  useEffect(() => {
    if (id) isFavoriteId(id).then(setSaved);
  }, [id]);

  const toggleSave = async () => {
    if (!city) return;
    if (saved) {
      await removeFavoriteId(id!);
      Alert.alert('Removido dos favoritos');
    } else {
      await addFavoriteId(id!);
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
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            toggleSave();
            break;
          case 1:
            if (city) {
              await Share.share({
                message: `Olha essa cidade: ${city.name}, ${city.country}!`,
              });
            }
            break;
        }
      }
    );
  };

  return (
    <View style={styles.screen}>
      <Header title="CityNavigator" isLink />
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Mais detalhes</Text>
        <Text style={styles.title}>{city?.name}</Text>
        <Text style={styles.subtitle}>{city?.country}</Text>
        <Button
          title="⋮ Mais opções"
          onPress={openOptions}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 16 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 18, marginBottom: 16 },
});
