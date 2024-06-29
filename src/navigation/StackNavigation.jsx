import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../screens/Home';
import {AddExpense} from '../screens/AddExpenses';
import {ExpenseDetails} from '../screens/ExpenseDetails';
import {Earned} from '../screens/Earned';
import {Spent} from '../screens/Spent';

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
      <Stack.Screen name="Earned" component={Earned} />
      <Stack.Screen name="Spent" component={Spent} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
