import { Slot } from "expo-router";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import FontLoader from "@/components/FontLoader";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootRegister from "../RootRegister";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <FontLoader>
        <ActionSheetProvider>
          <View style={{ flex: 1 }}>
            <RootRegister />
            <Slot />
          </View>
        </ActionSheetProvider>
      </FontLoader>
    </SafeAreaProvider>
  );
}
