import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  image?: string | null;
  createdAt: number;
};

type TaskState = {
  tasks: Task[];

  filter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;

  addTask: (title: string, image?: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  loadTasks: () => Promise<void>;
};

const TASK_KEY = "tasks";

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],

  filter: "all",

  setFilter: (filter) => set({ filter }),

  loadTasks: async () => {
    const data = await AsyncStorage.getItem(TASK_KEY);

    if (data) {
      set({ tasks: JSON.parse(data) });
    }
  },

  addTask: async (title, image) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      image: image || null,
      createdAt: Date.now(),
    };

    const updated = [...get().tasks, newTask];

    set({ tasks: updated });

    await AsyncStorage.setItem(TASK_KEY, JSON.stringify(updated));
  },

  toggleTask: async (id) => {
    const updated = get().tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );

    set({ tasks: updated });

    await AsyncStorage.setItem(TASK_KEY, JSON.stringify(updated));
  },

  deleteTask: async (id) => {
    const updated = get().tasks.filter((task) => task.id !== id);

    set({ tasks: updated });

    await AsyncStorage.setItem(TASK_KEY, JSON.stringify(updated));
  },
}));