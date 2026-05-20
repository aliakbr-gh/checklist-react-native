import { StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS } from "../constants/colors";

type Props = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
};

export default function CustomInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.black,
  },
});
