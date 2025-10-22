import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import About from '../Screens/About';
import Contact from '../Screens/Contact';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Signup from '../Screens/Signup';
import login from '../Screens/login';

const Tab = createBottomTabNavigator();

export default function Tab_Navigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" color={color} size={size} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="info-with-circle" color={color} size={size} />
          ),
        }}
      /> */}

        <Tab.Screen
        name="Signup"
        component={Signup}
        options={{
          tabBarIcon: ({ color, size }) => (
             <FontAwesome name="sign-in" color={color} size={size} />
          ),
        }}
      />

        <Tab.Screen
        name="Login"
        component={login}
        options={{
          tabBarIcon: ({ color, size }) => (
             <FontAwesome name="user-plus" color={color} size={size} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Contact"
        component={Contact}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="phone" color={color} size={size} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}
