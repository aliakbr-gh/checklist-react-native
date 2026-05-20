import LoadingScreen from "@/components/LoadingScreen";
import { useAuthStore } from "@/store/authStore";
import { Redirect, Slot } from "expo-router";

export default function AppLayout() {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Slot />;
}
