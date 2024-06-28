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
import {useNavigation} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [totalEarned, setTotalEarned] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const fetchData = async () => {
    const data = await AsyncStorage.getItem('expenses');
    const parsedData = JSON.parse(data);

    let spent = 0;
    let earned = 0;
    let total = 0;

    parsedData.map(item => {
      if (item.type == 'earned') {
        earned += parseInt(item.value);
      } else {
        spent += parseInt(item.value);
      }
    });
    total = earned - spent;

    setTotalEarned(earned);
    setTotalSpent(spent);
    setTotalExpenses(total);

    console.log('spent: ', spent, 'earned: ', earned, 'NetWorth: ', total);
  };

  useEffect(() => {
    isFocused && fetchData();
  }, [isFocused]);
  return (
    <View style={{flex: 1}}>
      <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle={'dark-content'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flex: 1}}>
        {/* Header */}
        <Header header={'Expenses.'} />

        {/* Expenses */}
        <View style={styles.expensesView}>
          <Expenses type={'earned'} data={totalEarned} />
          <Expenses type={'spent'} data={totalSpent} />
        </View>

        {/* Total Expenses */}
        <View style={styles.totalExpensesView}>
          <TotalExpenses data={totalExpenses} />
        </View>

        {/* Add Expense */}
        <View style={styles.addExpenseView}>
          <View style={styles.addExpenseContainerView}>
            <Text style={styles.themedText}>Expenses</Text>
            <Pressable
              style={styles.addExpensePressable}
              onPress={() => navigation.navigate('AddExpense')}>
              <Text style={styles.themedText}>+</Text>
            </Pressable>
          </View>
        </View>
        <Divider />

        {/* All Expenses */}
        <ScrollView contentContainerStyle={styles.allExpensesView}>
          {expensesData.map((expense, index) => (
            <View key={index} style={styles.allExpensesContainer}>
              <AllExpenses data={expense} />
            </View>
          ))}
        </ScrollView>
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
    height: '15%',
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
  addExpensePressable: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#bdbdbd',
    borderRadius: 5,
  },
});
