import LoadingScreen from '@/components/LoadingScreen';
import { useAuthStore } from '@/store/authStore';
import { Redirect, Stack } from 'expo-router';

export default function AuthLayout() {
  const user = useAuthStore((state) => state.user);

  const isLoading = useAuthStore(
    (state) => state.isLoading
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (user) {
    return <Redirect href="/(app)/(tabs)/profile" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}