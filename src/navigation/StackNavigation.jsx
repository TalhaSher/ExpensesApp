import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../screens/Home';
import {AddExpense} from '../screens/AddExpenses';
import {ExpenseDetails} from '../screens/ExpenseDetails';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddExpense" component={AddExpense} />
      <Stack.Screen name="ExpenseDetails" component={ExpenseDetails} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
