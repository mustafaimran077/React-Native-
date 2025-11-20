import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GetStarted from '../Screens/GetStarted';
import Login from '../Screens/Auth/Login';
import Signup from '../Screens/Auth/Signup';
import Tab_Navigation from './Tab_Navigation';

const Stack = createStackNavigator();

export default function Stack_Navigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Show these first */}
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />

      {/* After login → show bottom tabs */}
      <Stack.Screen name="Dashboard" component={Tab_Navigation} />
    </Stack.Navigator>
  );
}
