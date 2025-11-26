import React from 'react';
import { ScrollView, Image, StyleSheet, View } from 'react-native';
import { SPACING } from '../constants/theme';

export default function PhotoCarousel({ photos }: { photos: string[] }) {
  return (
    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.carousel}>
      {photos.length > 0 ? (
        photos.map((uri, i) => <Image key={i} source={{ uri }} style={styles.image} />)
      ) : (
        <Image source={require('../assets/images/fallback.jpg')} style={styles.image} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  carousel: { width: '100%', height: 250, marginBottom: SPACING(2) },
  image: { width: 360, height: 250, borderRadius: 12, marginRight: SPACING(1) },
});
