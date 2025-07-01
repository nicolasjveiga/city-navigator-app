import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useActionSheet } from '@expo/react-native-action-sheet';

interface HeaderProps {
  title: string;
  isLink?: boolean;
}

export default function Header({ title, isLink }: HeaderProps) {
  const router = useRouter();
  const { showActionSheetWithOptions } = useActionSheet();

  const openMenu = () => {
    const options = ['Favoritos', 'Perfil', 'Cancelar'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            router.push('/saved');
            break;
          case 1:
            // Pode adicionar lógica de perfil no futuro
            break;
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      {isLink ? (
        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}

      <TouchableOpacity onPress={openMenu}>
        <Ionicons name="menu-outline" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    backgroundColor: '#00b894',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontFamily: 'Oswald_400Regular',
  },
});
