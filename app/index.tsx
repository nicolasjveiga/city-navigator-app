import { FlatList, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { cities } from '../data/cities';
import CityCard from '../components/CityCard';
import Header from '@/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="CityNavigator" />
      <View style={styles.inner}>
        <Text style={styles.title}>Cidades</Text>
        <FlatList
          data={cities}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push(`/${item.id}`)}>
              <CityCard name={item.name} country={item.country} image={item.image} />
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  inner: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
