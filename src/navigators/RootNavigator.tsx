import React from 'react'
import { NavigatorScreenParams } from "@react-navigation/native"
import { View, Text } from 'react-native'
import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import TabsNavigator, { TabsStackParamList } from './TabsNavigator';
import { useAuth, AuthProvider } from '../../app/context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import Cart from '../screens/Cart';


export type RootStackParamList = {
  TabsStack: NavigatorScreenParams<TabsStackParamList>;
  Details: { // add params to details route
    id:number;
    category: number;
    description: string;
    stock: string;
    rating: string;
    name: string;
    amount: number;
    status: string;
    manufacturer: string;
    picture: string;
    quantity:number;
    
  };
  Login: undefined;
  SignUp: undefined;
  Cart: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const RootNavigator = () => {
  const { authState, onLogout } = useAuth();

console.log(authState, "useAuth")
  return (
   
      <RootStack.Navigator>
        {authState?.authenticated ? (
          <>
            <RootStack.Screen
              name="TabsStack"
              component={TabsNavigator}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen name="Details" component={DetailsScreen} options={{headerShown:false}} />
          </>
        ) :
        <>
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="SignUp" component={SignUpScreen} />
        </>}
      </RootStack.Navigator>
 

  )
}

export default RootNavigator;