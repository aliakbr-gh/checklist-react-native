import CustomButton from "@/components/CustomButton";
import { COLORS } from "@/constants/colors";
import { useAuthStore } from "@/store/authStore";
import { useTaskStore } from "@/store/taskStore";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    loadTasks,
    filter,
    setFilter,
  } = useTaskStore();

  const logout = useAuthStore((state) => state.logout);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const [showCamera, setShowCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef<any>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  // OPEN CAMERA
  const openCamera = async () => {
    if (!permission?.granted) {
      const res = await requestPermission();
      if (!res.granted) return;
    }

    setShowCamera(true);
  };

  // TAKE PHOTO
  const takePicture = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.7,
    });

    setImage(photo.uri);
    setShowCamera(false);
  };

  // FILTERED TASKS
  const filteredTasks = (() => {
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  })();

  // CAMERA SCREEN
  if (showCamera) {
    return (
      <CameraView style={{ flex: 1 }} facing="back" ref={cameraRef}>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 40,
          }}
        >
          <Pressable
            onPress={takePicture}
            style={{
              backgroundColor: "white",
              padding: 18,
              borderRadius: 50,
              marginBottom: 20,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Capture</Text>
          </Pressable>

          <Pressable onPress={() => setShowCamera(false)}>
            <Text style={{ color: "white" }}>Close Camera</Text>
          </Pressable>
        </View>
      </CameraView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 20, backgroundColor: COLORS.white }}>
        {/* TITLE */}
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
          My Tasks
        </Text>

        {/* INPUT */}
        <TextInput
          placeholder="Enter task"
          value={title}
          onChangeText={setTitle}
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 8,
            marginBottom: 10,
          }}
        />

        {/* OPEN CAMERA BUTTON */}
        <Pressable
          onPress={openCamera}
          style={{
            padding: 10,
            backgroundColor: "#ddd",
            marginBottom: 10,
            borderRadius: 8,
          }}
        >
          <Text>Open Camera</Text>
        </Pressable>

        {/* SHOW SELECTED IMAGE */}
        {image && <Text style={{ marginBottom: 10 }}>Image Captured ✔</Text>}

        {/* ADD TASK */}
        <Button
          title="Add Task"
          onPress={async () => {
            if (!title) return;

            await addTask(title, image || undefined);

            setTitle("");
            setImage(null);
          }}
        />

        {/* FILTERS */}
        <View style={{ flexDirection: "row", marginVertical: 10, gap: 10 }}>
          <Pressable onPress={() => setFilter("all")}>
            <Text>All</Text>
          </Pressable>

          <Pressable onPress={() => setFilter("active")}>
            <Text>Active</Text>
          </Pressable>

          <Pressable onPress={() => setFilter("completed")}>
            <Text>Completed</Text>
          </Pressable>
        </View>

        {/* LIST */}
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 15,
                marginTop: 10,
                borderRadius: 12,
                backgroundColor: "#f4f4f4",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* IMAGE */}
              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                />
              )}

              {/* TITLE */}
              <Pressable
                style={{ flex: 1 }}
                onPress={() => toggleTask(item.id)}
              >
                <Text
                  style={{
                    fontSize: 16,
                    textDecorationLine: item.completed
                      ? "line-through"
                      : "none",
                    color: item.completed ? "gray" : "black",
                  }}
                >
                  {item.title}
                </Text>
              </Pressable>

              {/* DELETE */}
              <Pressable onPress={() => deleteTask(item.id)}>
                <Text style={{ color: "red", fontWeight: "bold" }}>Delete</Text>
              </Pressable>
            </View>
          )}
        />

        <View>
          <CustomButton
            title="Logout"
            onPress={logout}
            style={{
              marginTop: 20,
              backgroundColor: COLORS.danger,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
