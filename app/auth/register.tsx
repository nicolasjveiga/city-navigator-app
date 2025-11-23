import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { register } from "../../api/auth";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    try {
      await register(name, email, password);
      router.replace("/profile");
    } catch {
      alert("Erro ao criar conta.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar conta</Text>

      <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />

      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  input: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: { backgroundColor: "#00b894", padding: 14, borderRadius: 8 },
  buttonText: { textAlign: "center", color: "#fff", fontSize: 18 },
});
