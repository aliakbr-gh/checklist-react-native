import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { COLORS } from "@/constants/colors";
import { useAuthStore } from "@/store/authStore";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(
        'Validation Error',
        'Please fill all fields'
      );
  
      return;
    }
  
    const result = await login({
      email,
      password,
    });
  
    if (!result.success) {
      Alert.alert('Error', result.message);
      return;
    }
  
    Alert.alert('Success', result.message);
  
    router.replace("/(app)/(tabs)/profile");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <CustomInput
        label="Email"
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
      />

      <CustomInput
        label="Password"
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <CustomButton title="Login" onPress={handleLogin} />
      <View style={{ marginTop: 20 }}>
        <CustomButton
          title="Create New Account"
          onPress={() => router.push("/signup")}
          style={{
            backgroundColor: COLORS.secondary,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: COLORS.white,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 40,
  },
});
