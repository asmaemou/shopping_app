import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "../context/AuthCont";
import { TextInput } from "react-native-gesture-handler";
import { Image, Button } from "react-native";
import { StyleSheet } from "react-native";
const Login = () => {
  const [email, setEmail] = React.useState("mukisageophrey@gmail.com");
  const [password, setPassword] = React.useState("thugs123");
  const { onLogin, onRegister, authState } = useAuth();

  const login = async () => {
    const response = await onLogin!(email, password);
    console.log(response);
    if (response) {
      console.log("login successful");
      console.log(response);
      console.log(authState);
      alert(response.msg);
    }
  };

  const register = async () => {
    const response = await onRegister!(email, password);
    if (response) {
      console.log(response);
      alert(response.msg);
    } else {
      login();
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://galaxies.dev/img/logos/logo--blue.png" }}
        style={styles.image}
      />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(input: string) => setEmail(input)}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(input: string) => setPassword(input)}
          secureTextEntry
        ></TextInput>
        <Button onPress={login} title="Sign in"></Button>
        <Button onPress={register} title="Create Account"></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
  },
  form: {
    gap: 10,
    width: "60%",
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  container: {
    alignItems: "center",
    width: "100%",
  },
});
export default Login;
