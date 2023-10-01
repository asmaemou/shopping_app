import { View, Text, Button } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Icons from "@expo/vector-icons/MaterialIcons"
import Cart from '../screens/Cart';


export type TabsStackParamList={
    Home:undefined;
    Cart:undefined;
    Payment:undefined;
    Profile:undefined;
}

const TabsStack = createBottomTabNavigator<TabsStackParamList>();

const TabsNavigator = () => {
    return (
      <TabsStack.Navigator
        screenOptions={{
            tabBarShowLabel:true,
        }}
      >
        <TabsStack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
            tabBarIcon(props){
                return <Icons name="home" {...props}/>
            },
            headerRight: () => (
                <Button
                  onPress={() => alert('This is a button!')}
                  title="logout"
                  color="#00cc00"
                />
              )
        }}/>
        <TabsStack.Screen 
        name="Cart" 
        component={Cart} 
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