import { COLORS } from "@/constants/colors";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },

  text: {
    marginTop: 20,
    fontSize: 18,
    color: COLORS.primary,
  },
});
