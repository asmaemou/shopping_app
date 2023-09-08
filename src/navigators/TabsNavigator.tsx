import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';


export type TabsStackParamList={
    Home:undefined;
    Cart:undefined;
    Payment:undefined;
    Profile:undefined;
}

const TabsStack = createBottomTabNavigator<TabsStackParamList>();

const TabsNavigator = () => {
    return (
      <TabsStack.Navigator>
        <TabsStack.Screen name="Home" component={HomeScreen} />
        <TabsStack.Screen name="Cart" component={() => <View/>} />
        <TabsStack.Screen name="Payment" component={() => <View/>} />
        <TabsStack.Screen name="Profile" component={() => <View/>} />
      </TabsStack.Navigator>
    );
  };

export default TabsNavigator;