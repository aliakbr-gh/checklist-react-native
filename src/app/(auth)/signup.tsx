import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { COLORS } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function SignupScreen() {
  const signup = useAuthStore(
    (state) => state.signup
  );

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] =
    useState('');

  const [confirmPassword, setConfirmPassword] =
    useState('');

    const handleSignup = async () => {
      if (
        !name ||
        !email ||
        !password ||
        !confirmPassword
      ) {
        Alert.alert(
          'Validation Error',
          'Please fill all fields'
        );
    
        return;
      }
    
      if (!email.includes('@')) {
        Alert.alert(
          'Validation Error',
          'Invalid email address'
        );
    
        return;
      }
    
      if (password.length < 6) {
        Alert.alert(
          'Validation Error',
          'Password must be at least 6 characters'
        );
    
        return;
      }
    
      if (password !== confirmPassword) {
        Alert.alert(
          'Validation Error',
          'Passwords do not match'
        );
    
        return;
      }
    
      const result = await signup({
        name,
        email,
        password,
      });
    
      if (!result.success) {
        Alert.alert('Error', result.message);
        return;
      }
    
      Alert.alert('Success', result.message);
    
      router.replace('/');
    };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Text style={styles.title}>
          Create Account
        </Text>

        <CustomInput
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
        />

        <CustomInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />

        <CustomInput
          label="Password"
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <CustomInput
          label="Confirm Password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <CustomButton
          title="Create Account"
          onPress={handleSignup}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?
          </Text>

          <Link
            href="/login"
            style={styles.loginText}
          >
            Login
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 40,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },

  footerText: {
    fontSize: 16,
    color: COLORS.gray,
  },

  loginText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginLeft: 6,
  },
});