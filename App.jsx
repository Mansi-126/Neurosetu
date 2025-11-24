import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './src/screens/SignIn.jsx';
import HomeScreen from './src/screens/HomeScreen.jsx';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
   <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown: false}}>
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="Home" component={HomeScreen} />
   </Stack.Navigator>
  );
}
export default function App(){
return (
  <NavigationContainer>
    <RootStack />
  </NavigationContainer>
)
}
