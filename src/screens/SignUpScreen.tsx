import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { themeColors } from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList, 'Login'>;

export default function SignUpScreen() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <SafeAreaView style={{ flex: 0, backgroundColor: themeColors.bg }} />
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
      </SafeAreaView>
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={[styles.input,{ paddingVertical: 10, fontSize: 15 }]}
            value="john snow"
            placeholder="Enter Name"
          />
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={[styles.input,{ paddingVertical: 10, fontSize: 15 }]}
            value="john@gmail.com"
            placeholder="Enter Email"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input,{ paddingVertical: 10, fontSize: 15 }]}
            secureTextEntry
            value="test12345"
            placeholder="Enter Password"
          />
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={[styles.input,{ paddingVertical: 10, fontSize: 15 }]}
            secureTextEntry
            value="test12345"
            placeholder="Enter Password"
          />
          <TouchableOpacity style={styles.signupButton}>
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
    marginVertical: 10,
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
    marginTop: 10,
  },
  loginText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  loginLink: {
    color: 'purple',
    fontWeight: 'bold',
  },
});
