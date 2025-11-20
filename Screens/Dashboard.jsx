

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Profile from './Profile';
import BookAppoinment from './BookAppoinment';
import MedicalRecord from './MedicalRecord';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function Dashboard() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';
          else if (route.name === 'Records') iconName = 'folder'
          else if (route.name === 'Appointments') iconName = 'calendar-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#43A047',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // <-- removes the header from all screens
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Appointments" component={BookAppoinment} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Records" component={MedicalRecord} />
    </Tab.Navigator>
  );
}
