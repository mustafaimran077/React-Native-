import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tab_Navigation from './Navigation/Tab_Navigation'; // 👈 Correct import

export default function App() {
  return (
    <NavigationContainer>
      <Tab_Navigation />
    </NavigationContainer>
  );
}