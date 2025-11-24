import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput placeholder="Your Name" placeholderTextColor="#888" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Your Email" placeholderTextColor="#888" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" placeholderTextColor="#888" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
      <TextInput placeholder="Parent Name" placeholderTextColor="#888" style={styles.input} value={parentName} onChangeText={setParentName} />
      <TextInput placeholder="Parent Email" placeholderTextColor="#888" style={styles.input} value={parentEmail} onChangeText={setParentEmail} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("Home")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 20, justifyContent: "center" },
  title: { color: "#fff", fontSize: 26, textAlign: "center", marginBottom: 30 },
  input: {
    backgroundColor: "#222",
    borderColor: "#333",
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
    color: "#fff"
  },
  button: { backgroundColor: "#1e90ff", padding: 14, borderRadius: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 16, fontWeight: "600" }
});
