import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator,BottomTabScreenProps, } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Icons from "@expo/vector-icons/MaterialIcons";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackScreenProps } from "./RootNavigator";


export type TabsStackParamList={
    Home:undefined;
    Cart:undefined;
    Payment:undefined;
    Profile:undefined;
}

const TabsStack = createBottomTabNavigator<TabsStackParamList>();

export type TabsStackScreenProps<T extends keyof TabsStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabsStackParamList, T>,
    RootStackScreenProps<"TabsStack">
  >;

const TabsNavigator = () => {
    return (
      <TabsStack.Navigator
        screenOptions={{
            tabBarShowLabel:false,
        }}
      >
        <TabsStack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
            tabBarIcon(props){
                return <Icons name="home" {...props}/>
            },
        }}/>
        <TabsStack.Screen 
        name="Cart" 
        component={HomeScreen} 
        options={{
            tabBarIcon(props){
                return <Icons name="shopping-cart" {...props}/>
            },
        }}/>
        <TabsStack.Screen 
        name="Payment" 
        component={HomeScreen} 
        options={{
            tabBarIcon(props){
                return <Icons name="account-balance-wallet" {...props}/>
            },
        }}/>
        <TabsStack.Screen 
        name="Profile" 
        component={HomeScreen} 
        options={{
            tabBarIcon(props){
                return <Icons name="person" {...props}/>
            },
        }}/>
      </TabsStack.Navigator>
    );
  };

export default TabsNavigator;

const Example = () =>{
    return <View/>;

};