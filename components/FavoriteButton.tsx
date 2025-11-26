import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = { isSaved: boolean; onPress: () => void; style?: ViewStyle };

export default function FavoriteButton({ isSaved, onPress, style }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          position: 'absolute',
          top: 20,
          right: 20,
          backgroundColor: 'rgba(255,255,255,0.9)',
          padding: 10,
          borderRadius: 50,
          elevation: 5,
        },
        style,
      ]}
    >
      <Ionicons name={isSaved ? 'heart' : 'heart-outline'} size={26} color={isSaved ? 'red' : 'black'} />
    </TouchableOpacity>
  );
}
