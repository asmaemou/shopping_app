import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import {DefaultTheme, NavigationContainer, Theme} from "@react-navigation/native";
import RootNavigator from "./src/navigators/RootNavigator";
import { useMemo } from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './app/context/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import { TabsStackScreenProps } from './src/navigators/TabsNavigator';

const Stack = createNativeStackNavigator();

export default function App() {

  return(
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  )
  const theme: Theme = useMemo(() => ({...DefaultTheme,colors:{
    ...DefaultTheme.colors,
    background:"#f5f5f5",
    text:"#191919",
    border:"#D9D9D9",
    primary:"#191919",

  },
}),
[]
);
  return (
    <SafeAreaProvider> 
      <GestureHandlerRootView style={styles.container}>
      <NavigationContainer theme={theme}>
        <BottomSheetModalProvider>
          <RootNavigator/>
        </BottomSheetModalProvider>
        <StatusBar style="dark"/>
      </NavigationContainer>
    </GestureHandlerRootView>
    </SafeAreaProvider>
    
  );
}

export const Layout = ({ navigation }: TabsStackScreenProps<"Home">) => {
  const { authState, onLogout } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerRight: () => <Button onPress={onLogout} title="Sign out" />,
            }}
          />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    background: "black"
  },
});
