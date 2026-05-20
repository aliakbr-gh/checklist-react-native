import { COLORS } from "@/constants/colors";
import { useAuthStore } from "@/store/authStore";
import * as Device from "expo-device";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deviceInfo = {
    brand: Device.brand,
    modelName: Device.modelName,
    osName: Device.osName,
    osVersion: Device.osVersion,
  };

  const getLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setError("Location permission denied");
        return;
      }

      const current = await Location.getCurrentPositionAsync({});

      const coords = current.coords;

      setLocation(coords);
      
      const address = await getAddressFromCoords(
        coords.latitude,
        coords.longitude
      );

      setLocation({
        ...coords,
        address,
      });
    } catch (err) {
      setError("Failed to get location");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getAddressFromCoords = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );

      const data = await res.json();

      return data.display_name;
    } catch (err) {
      return "Unable to fetch address";
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.card}>
          <Text style={styles.heading}>User Info</Text>

          <Text style={styles.text}>Name: {user?.name}</Text>
          <Text style={styles.text}>Email: {user?.email}</Text>
          <Text style={styles.text}>ID: {user?.id}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Device Info</Text>

          <Text style={styles.text}>Brand: {deviceInfo.brand}</Text>
          <Text style={styles.text}>Model: {deviceInfo.modelName}</Text>
          <Text style={styles.text}>OS: {deviceInfo.osName}</Text>
          <Text style={styles.text}>Version: {deviceInfo.osVersion}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Location</Text>

          {loading && <Text>Getting location...</Text>}

          {error && <Text style={{ color: "red" }}>{error}</Text>}

          {location && (
            <>
              <Text style={styles.text}>Latitude: {location.latitude}</Text>

              <Text style={styles.text}>Longitude: {location.longitude}</Text>
            </>
          )}

          {location?.address && (
            <Text style={styles.text}>Address: {location.address}</Text>
          )}

          <Text
            style={{
              color: "blue",
              marginTop: 10,
            }}
            onPress={getLocation}
          >
            Refresh Location
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  text: {
    fontSize: 14,
    marginBottom: 5,
  },
});
