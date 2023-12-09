import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the types for your navigation
type RootStackParamList = {
  Login: undefined;
  ResetPassword: undefined;
};

type ResetPasswordNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const ResetPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation<ResetPasswordNavigationProp>();

  const handleResetPassword = async () => {
    try {
      // Retrieve the stringified user data from AsyncStorage
      const usersString = await AsyncStorage.getItem('users');
      const usersArray = usersString ? JSON.parse(usersString) : [];
  
      // Find the user index
      const userIndex = usersArray.findIndex((user) => user.email === email);
      if (userIndex !== -1) {
        // Update the user's password
        usersArray[userIndex].password = newPassword;
  
        // Save the updated users array back to AsyncStorage
        await AsyncStorage.setItem('users', JSON.stringify(usersArray));
        Alert.alert('Password Reset', 'Your password has been reset successfully.');
        
        // Navigate back to the login screen or close the modal
        navigation.goBack();
      } else {
        Alert.alert('Error', 'User not found.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      Alert.alert('Error', 'An error occurred while resetting the password.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Text style={styles.label}>New Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2e6ff', // Light purple background for the container
  },
  input: {
    width: '80%',
    marginVertical: 8,
    padding: 12,
    borderWidth: 2,
    borderColor: '#800080', // Purple border for the input
    borderRadius: 8,
    backgroundColor: 'white', // Keeping the input background white for readability
    fontSize: 16,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginBottom: 4,
    color: '#4b0082', // Darker purple for the label
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#800080', // Purple background for the button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 16,
    width: '80%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});



export default ResetPasswordScreen;
