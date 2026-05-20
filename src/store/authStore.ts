import AsyncStorage from '@react-native-async-storage/async-storage';

import { create } from 'zustand';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

type SignupData = {
  name: string;
  email: string;
  password: string;
};

type AuthState = {
  user: User | null;

  isLoading: boolean;

  login: (
    data: LoginData
  ) => Promise<{
    success: boolean;
    message: string;
  }>;

  signup: (
    data: SignupData
  ) => Promise<{
    success: boolean;
    message: string;
  }>;

  logout: () => Promise<void>;

  loadUser: () => Promise<void>;
};

const USERS_KEY = 'users';
const USER_KEY = 'user';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useAuthStore = create<AuthState>(
  (set) => ({
    user: null,

    isLoading: true,

    signup: async ({
      name,
      email,
      password,
    }) => {
      try {
        const existingUsers =
          await AsyncStorage.getItem(
            USERS_KEY
          );

        const users: User[] = existingUsers
          ? JSON.parse(existingUsers)
          : [];

        const userExists = users.find(
          (user) => user.email === email
        );

        if (userExists) {
          return {
            success: false,
            message:
              'Email already registered',
          };
        }

        const nextId = users.length > 0 ? Number(users[users.length - 1].id) + 1 : 1;

        const newUser: User = {
          id: nextId.toString(),
          name,
          email,
          password,
        };

        users.push(newUser);

        await AsyncStorage.setItem(
          USERS_KEY,
          JSON.stringify(users)
        );

        await AsyncStorage.setItem(
          USER_KEY,
          JSON.stringify(newUser)
        );

        set({
          user: newUser,
        });

        return {
          success: true,
          message:
            'Account created successfully',
        };
      } catch (error) {
        return {
          success: false,
          message: 'Signup failed',
        };
      }
    },

    login: async ({
      email,
      password,
    }) => {
      try {
        const existingUsers =
          await AsyncStorage.getItem(
            USERS_KEY
          );

        const users: User[] = existingUsers
          ? JSON.parse(existingUsers)
          : [];

        const foundUser = users.find(
          (user) =>
            user.email === email &&
            user.password === password
        );

        if (!foundUser) {
          return {
            success: false,
            message:
              'Invalid email or password',
          };
        }

        await AsyncStorage.setItem(
          USER_KEY,
          JSON.stringify(foundUser)
        );

        set({
          user: foundUser,
        });

        return {
          success: true,
          message: 'Login successful',
        };
      } catch (error) {
        return {
          success: false,
          message: 'Login failed',
        };
      }
    },

    logout: async () => {
      await AsyncStorage.removeItem(
        USER_KEY
      );

      set({
        user: null,
      });
    },

    loadUser: async () => {
      try {
        await delay(2000);

        const storedUser =
          await AsyncStorage.getItem(
            USER_KEY
          );

        if (storedUser) {
          set({
            user: JSON.parse(storedUser),
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        set({
          isLoading: false,
        });
      }
    },
  })
);