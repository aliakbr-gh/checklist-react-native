import { COLORS } from "@/constants/colors";
import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
};

const CustomButton = ({ title, onPress, style }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && styles.pressedButton,
      ]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  pressedButton: {
    opacity: 0.7,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CustomButton;
