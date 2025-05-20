import { useFonts, Oswald_700Bold, Oswald_400Regular } from '@expo-google-fonts/oswald';
import { ReactNode } from 'react';
import { ActivityIndicator, View } from 'react-native';

type Props = {
    children: ReactNode;
}

export default function FontLoader({ children }: Props) {
    const [fontsLoaded] = useFonts({
        Oswald_400Regular,
    });

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return <>{children}</>;
}