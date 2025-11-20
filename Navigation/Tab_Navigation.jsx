import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import BookAppointment from '../Screens/BookAppoinment';
import MedicalRecord from '../Screens/MedicalRecord';
import Profile from '../Screens/Profile';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function Tab_Navigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#ff7e5f',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 10,
          height: 60,
          paddingBottom: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={BookAppointment}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="calendar-today" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Records"
        component={MedicalRecord}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="folder-open" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
