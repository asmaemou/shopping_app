import React from "react";
import { NavigatorScreenParams } from "@react-navigation/native";
import { View, Text, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import TabsNavigator, { TabsStackParamList } from "./TabsNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "../context/AuthCont";
import Login from "../screens/Login";
import SignUpScreen from "../screens/SignUpScreen";

export type RootStackParamList = {
  TabsStack: NavigatorScreenParams<TabsStackParamList>;
  Details: undefined;
  Login: undefined;
  SignUp: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { authState, onLogout } = useAuth();
  console.log(authState, onLogout,"authState");
  return (
    <RootStack.Navigator>
      {true ? (  
        <>
        <RootStack.Screen
          name="TabsStack"
          component={TabsNavigator}
          options={{
            headerShown: false
          }}
        />
        <RootStack.Screen name="Details" component={DetailsScreen} />
      </>
      ) : (
        <>
        <RootStack.Screen name="Login" component={Login}></RootStack.Screen>
        <RootStack.Screen name="SignUp" component={SignUpScreen}></RootStack.Screen>
        </>
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
