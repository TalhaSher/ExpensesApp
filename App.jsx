import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <NavigationContainer>
      <Toast />
      <StackNavigation />
    </NavigationContainer>
  );
};

export default App;
