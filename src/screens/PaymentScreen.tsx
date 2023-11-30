import React, { useState } from 'react';
import { useUserDetails } from "../../app/context/UserDetailContext";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';

const PaymentScreen: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [address, setaddress] = useState('');
  const [apt, setapt] = useState('');
  const [country, setcountry] = useState('');
  const [city, setCity] = useState('');
  const { updateUserDetails, clearUserDetails } = useUserDetails();


  const handlePayment = () => {
    // Update the global state with the details
    updateUserDetails({ cardNumber, address, apt, country, city });
    // Clearing the fields
    setCardNumber('');
    setaddress('');
    setapt('');
    setcountry('');
    setCity('');

    Alert.alert('Thanks for providing your delivery details.', 'We are on it!');

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Details:</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={(text) => setCardNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Street Address"
        value={address}
        onChangeText={(text) => setaddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Apt,Floor,.."
        value={apt}
        onChangeText={(text) => setapt(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={country}
        onChangeText={(text) => setcountry(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PaymentScreen;
