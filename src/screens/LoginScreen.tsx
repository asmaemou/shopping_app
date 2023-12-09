import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../app/context/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  SignUp: undefined;
  ResetPassword: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList, 'SignUp'>;
let users = [
  { firstName: 'Oussama', lastName: 'oussama', email: 'Oussama@gmail.com', password: 'oussama123' },
  { firstName: 'Yvan', lastName: 'junior', email: 'Yvan@gmail.com', password: 'yvan123' },
  { firstName: 'Asmae', lastName: 'mouradi', email: 'Asmae@gmail.com', password: 'asmae123' },
  // Add more users as needed
];
const fetchUsersFromStorage = async () => {
  try {
    const storedUsersString = await AsyncStorage.getItem('user');
    if (storedUsersString) {
      const storedUser = JSON.parse(storedUsersString);

      // Check if storedUser is an array, if not, make it an array
      const storedUsersArray = Array.isArray(storedUser) ? storedUser : [storedUser];

      // Combine stored users with hardcoded users
      users = [...users, ...storedUsersArray];
    }
  } catch (error) {
    console.error("Error fetching users from local storage:", error);
  }
};


// Call the function to fetch and combine users
fetchUsersFromStorage();

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProps>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin, onRegister, authState } = useAuth();

  const findUserByEmailAndPassword = async (email, password) => {
    try {
      const usersString = await AsyncStorage.getItem('users'); // Ensure this key matches
      const usersArray = usersString ? JSON.parse(usersString) : [];
      return usersArray.find(user => user.email === email && user.password === password);
    } catch (error) {
      console.error('Error retrieving users:', error);
    }
    return null;
  };
  
  
  
  
  const login = async () => {
    const user = await findUserByEmailAndPassword(email, password);
  
    if (user) {
      try {
        // Convert user object to string to store in AsyncStorage
        const userString = JSON.stringify(user);
        await AsyncStorage.setItem('currentUser', userString);
  
        // Perform login actions here
        const result = await onLogin(email, password);
      } catch (error) {
        // Handle errors, e.g., error in storing data
        console.error('An error occurred during login.');
      }
    } else {
      console.error('Invalid email or password');
    }
  };
  
  
  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{ flex: 1 }}
        // behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <View style={styles.imageContainer}>
          <Image source={require('../assets/images/login.png')} style={styles.image} />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.form}>
          <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={[styles.input, { paddingVertical: 10, fontSize: 15 }]} // Adjust paddingVertical and fontSize as needed
              placeholder="Enter your email"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, { paddingVertical: 10, fontSize: 15 }]} // Adjust paddingVertical and fontSize as needed
              secureTextEntry
              placeholder="Enter your password"
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <TouchableOpacity 
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} onPress={login}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.orText}>Or</Text>
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpLink}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.bg,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  formContainer: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  form: {
    marginVertical: 10,
  },
  label: {
    color: 'gray',
    marginLeft: 10,
  },
  input: {
    backgroundColor: '#E5E5E5',
    color: 'gray',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  forgotPassword: {
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    color: 'gray',
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: 'purple',
    borderRadius: 20,
    paddingVertical: 10,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  orText: {
    fontSize: 20,
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  signUpText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  signUpLink: {
    color: 'purple',
    fontWeight: 'bold',
  },
});
