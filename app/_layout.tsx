import { Slot } from 'expo-router';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import FontLoader from '@/components/FontLoader';

export default function RootLayout() {
  return (
    <FontLoader>
      <ActionSheetProvider>
        <Slot />
      </ActionSheetProvider>
    </FontLoader>
  );
}
