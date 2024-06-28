import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Pressable,
} from 'react-native';
import React from 'react';
import Header from '../../components/Header';

import {Expenses, TotalExpenses, Divider, AllExpenses} from './components';
import {expensesData} from '../../constants/seeds';

const Home = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle={'dark-content'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Header header={'Expenses.'} />

        {/* Expenses */}
        <View style={styles.expensesView}>
          <Expenses type={'earned'} />
          <Expenses type={'spent'} />
        </View>

        {/* Total Expenses */}
        <View style={styles.totalExpensesView}>
          <TotalExpenses />
        </View>

        {/* Add Expense */}
        <View style={styles.addExpenseView}>
          <View style={styles.addExpenseContainerView}>
            <Text style={styles.themedText}>Expenses</Text>
            <Pressable>
              <Text style={styles.themedText}>+</Text>
            </Pressable>
          </View>
        </View>
        <Divider />

        {/* All Expenses */}
        <View style={styles.allExpensesView}>
          {expensesData.map((expense, index) => (
            <View key={index} style={styles.allExpensesContainer}>
              <AllExpenses data={expense} />
              {/* <Text style={styles.themedText}>hello</Text> */}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  themedText: {
    fontSize: 20,
    color: '#424242',
  },
  expensesView: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  totalExpensesView: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    marginTop: 20,
  },
  addExpenseView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addExpenseContainerView: {
    width: '93%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  allExpensesView: {
    alignItems: 'center',
  },
  allExpensesContainer: {
    width: '93%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
});
