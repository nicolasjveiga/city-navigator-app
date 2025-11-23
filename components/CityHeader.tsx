import { View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

type Props = {
  imageUrl: string;
};

export default function CityHeader({ imageUrl }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  function toggleFavorite() {
    setIsFavorite(!isFavorite);
  }

  return (
    <View style={{ position: "relative" }}>
      <Image
        source={{ uri: imageUrl }}
        style={{
          width: "100%",
          height: 300,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}
      />

      <TouchableOpacity
        onPress={toggleFavorite}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          backgroundColor: "rgba(255,255,255,0.85)",
          padding: 10,
          borderRadius: 50,
        }}
      >
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={26}
          color={isFavorite ? "red" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
}
