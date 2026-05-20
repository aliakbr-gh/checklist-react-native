import { useAuthStore } from '@/store/authStore';
import { Slot } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
  const loadUser = useAuthStore(
    (state) => state.loadUser
  );

  useEffect(() => {
    loadUser();
  }, []);

  return <Slot />;
}