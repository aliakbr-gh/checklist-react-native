import CustomButton from "@/components/CustomButton";
import { COLORS } from "@/constants/colors";
import { useAuthStore } from "@/store/authStore";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const logout = useAuthStore((state) => state.logout);

  return (
    <View style={styles.container}>
      <Text>
        Logged In User:
      {JSON.stringify(user)}
      </Text>
      <CustomButton
        title="Logout"
        onPress={logout}
        style={{
          marginTop: 20,
          backgroundColor: COLORS.danger,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 30,
  },

  subtitle: {
    fontSize: 18,
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: 20,
  },
});
