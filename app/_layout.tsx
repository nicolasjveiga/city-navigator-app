import { Slot } from 'expo-router';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import FontLoader from '@/components/FontLoader';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <FontLoader>
        <ActionSheetProvider>
          <Slot />
        </ActionSheetProvider>
      </FontLoader>
    </SafeAreaProvider>
  );
}
