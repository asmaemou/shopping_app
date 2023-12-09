import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { themeColors } from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../../app/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Login: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList, 'Login'>;

export default function SignUpScreen() {
  const navigation = useNavigation<NavigationProps>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { onRegister, authState } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const saveNewUser = async (newUser) => {
    try {
      const existingUsersString = await AsyncStorage.getItem('users');
      const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];
      existingUsers.push(newUser);
      const newUsersString = JSON.stringify(existingUsers);
      await AsyncStorage.setItem('users', newUsersString);
    } catch (error) {
      console.error('Error saving new user:', error);
    }
  };
  
  const SignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
      try {
        // Store user credentials in local storage as a general user
        const newUser = { firstName, lastName, email, password }; 
        await saveNewUser(newUser);
        const newUserString = JSON.stringify(newUser);
        console.log(newUserString)
        await AsyncStorage.setItem('user', newUserString);


        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        // Navigate to login screen after successful sign up
        navigation.navigate('Login');
      } catch (error) {
        console.error("Error storing user data:", error);
      }
    
  };

  return (
    <View
      style={styles.container}
    >

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          {/* Add any header content here */}
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/signup.png')}
            style={styles.image}
          />
        </View>
     
      <View style={styles.formContainer}>
        <View style={styles.form}>
        <TextInput
        style={[styles.input, { paddingVertical: 10, fontSize: 15 }]}
        placeholder="Enter First Name"
        onChangeText={setFirstName}
        value={firstName}
      />
      <TextInput
        style={[styles.input, { paddingVertical: 10, fontSize: 15 }]}
        placeholder="Enter Last Name"
        onChangeText={setLastName}
        value={lastName}
      />
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={[styles.input,{ paddingVertical: 10, fontSize: 15 }]}
            placeholder="Enter your email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input,{ paddingVertical: 10, fontSize: 15 }]}
            secureTextEntry
            placeholder="Enter your password"
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={[styles.input,{ paddingVertical: 10, fontSize: 15 }]}
            secureTextEntry
            placeholder="Enter your password"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
          />
          <TouchableOpacity style={styles.signupButton} onPress={SignUp}>
  <Text style={styles.signupButtonText}>Sign Up</Text>
</TouchableOpacity>

        </View>
        <Text style={styles.orText}>Or</Text>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}> Login</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    marginTop: -20,
    width: 165,
    height: 110,
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
  signupButton: {
    backgroundColor: 'purple',
    borderRadius: 20,
    paddingVertical: 10,
  },
  signupButtonText: {
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
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  socialButton: {
    backgroundColor: '#E5E5E5',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: 10,
  },
  loginText: {
    color: 'gray',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loginLink: {
    color: 'purple',
    fontWeight: 'bold',
  },
});