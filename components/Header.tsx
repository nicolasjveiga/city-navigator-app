import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

interface HeaderProps {
  title: string;
  isLink?: boolean;
}

export default function Header({ title, isLink }: HeaderProps) {
  const router = useRouter();

  const handleProfilePress = async () => {
    let token: string | null = null;

    if (Platform.OS !== 'web') {
      token = await SecureStore.getItemAsync('token');
    } else {
      token = localStorage.getItem('token');
    }

    if (token) {
      router.push('/profile');
    } else {
      router.push('/auth/login');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/saved')}>
        <Ionicons name="menu" size={30} color="#fff" />
      </TouchableOpacity>

      {isLink ? (
        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}

      <TouchableOpacity onPress={handleProfilePress}>
        <Ionicons name="person-circle-outline" size={35} color="#fff" />
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
    justifyContent: 'space-around',
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Oswald_400Regular',
  },
});
