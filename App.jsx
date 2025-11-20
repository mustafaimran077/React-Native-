import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import AuthLoading from './Screens/AuthLoading';
import Login from './Screens/Auth/Login';
import GetStarted from './Screens/GetStarted';
import Signup from './Screens/Auth/Signup';
import Dashboard from './Screens/Dashboard'; // your main home/dashboard screen

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthLoading"
        screenOptions={{ headerShown: false }}
      >
        {/* AuthLoading checks token and redirects */}
        <Stack.Screen name="AuthLoading" component={AuthLoading} />

        {/* Auth Screens */}

        <Stack.Screen name="GetStarted" component={GetStarted} />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />

        {/* Main App */}
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


