import { COLORS } from "@/constants/colors";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home" }}
      />

      <Tabs.Screen
        name="profile"
        options={{ title: "Profile" }}
      />
    </Tabs>
  );
}