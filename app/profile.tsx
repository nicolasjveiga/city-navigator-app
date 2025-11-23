import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getMyProfile, logout } from "../api/auth";
import Header from "../components/Header";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const p = await getMyProfile();
      if (!p) return router.replace("/auth/login");
      setUser(p);
    }
    load();
  }, []);

  if (!user) return null;

  return (
    <View style={styles.container}>
      <Header title="CityNavigator" isLink />

      <View style={styles.profile}>
        <Text style={styles.title}>Meu Perfil</Text>

        <Text style={styles.item}>Nome: {user.name}</Text>
        <Text style={styles.item}>Email: {user.email}</Text>

        <TouchableOpacity
            style={styles.logout}
            onPress={async () => {
            await logout();
            router.replace("/auth/login");
            }}
        >
            <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1},
  profile: { padding: 20, marginTop: 40 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  item: { fontSize: 18, marginBottom: 10 },
  logout: {
    backgroundColor: "#d63031",
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutText: { textAlign: "center", color: "#fff", fontSize: 18 },
});
