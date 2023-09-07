import React from 'react'
import { View,Text } from 'react-native'
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';


export type RootStackParamList = {
    HomeScreen : undefined;
    DetailsScreen : undefined;
}
const RootStack = createNativeStackNavigator<RootStackParamList>()

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
        <RootStack.Screen name="HomeScreen" component={HomeScreen}/>
        <RootStack.Screen name="DetailsScreen" component={DetailsScreen}/>
    </RootStack.Navigator>
  )
}

export default RootNavigator;