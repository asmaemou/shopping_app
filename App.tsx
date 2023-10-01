import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {DefaultTheme, NavigationContainer, Theme} from "@react-navigation/native";
import RootNavigator from "./src/navigators/RootNavigator";
import { useMemo } from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAuth, AuthProvider } from './src/context/AuthCont';


export default function App() {
  const theme: Theme = useMemo(() => ({...DefaultTheme,colors:{
    ...DefaultTheme.colors,
    background:"#f5f5f5",
    text:"#191919",
    border:"#D9D9D9",
    primary:"#191919",

  },
}),[]);

const { authState } = useAuth();
console.log(authState, "appjse");
  return (
    <AuthProvider>

    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer theme={theme}>
        <RootNavigator/>
        <StatusBar style="dark"/>
      </NavigationContainer>
    </GestureHandlerRootView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    background: "black"
  },
});
