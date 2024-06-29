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
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

const Spent = () => {
  const navigation = useNavigation();
  const [spentData, setSpentData] = useState([]);
  const isFocused = useIsFocused();

  const getData = async () => {
    const data = await AsyncStorage.getItem('expenses');
    const parsedData = data ? JSON.parse(data) : [];

    const filteredData = parsedData.filter(expense => {
      return expense.type == 'spent';
    });

    setSpentData(filteredData);
  };

  useEffect(() => {
    isFocused && getData();
  }, [isFocused]);

  return (
    <View style={{flex: 1}}>
      <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle={'dark-content'}
      />
      <Header header={'Spent'} />
      <ScrollView>
        {spentData &&
          spentData.map((expense, index) => (
            <Pressable
              key={index}
              style={styles.allExpensesContainer}
              onPress={() => navigation.navigate('ExpenseDetails', {expense})}>
              <View style={styles.containerView}>
                <View style={styles.expensesTextView}>
                  <Text style={styles.expensesText}>{expense.title}</Text>
                </View>
                <View style={styles.expensesNumberView}>
                  <Text style={[styles.expensesNumber, {color: 'red'}]}>
                    - {expense.value}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
      </ScrollView>
    </View>
  );
};

export default Spent;

const styles = StyleSheet.create({
  allExpensesContainer: {
    width: '93%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    marginLeft: 15,
  },
  containerView: {
    width: '100%',
    height: '100%',
    borderRadius: 7,
    elevation: 10,
    backgroundColor: '#fcf7f7',
    shadowColor: '#8a8888',
  },
  expensesTextView: {
    flex: 1,
    alignItems: 'flex-start',
  },
  expensesText: {
    color: '#424242',
    fontSize: 20,
    marginLeft: 4,
    marginTop: 4,
    letterSpacing: 2,
  },
  expensesNumberView: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  expensesNumber: {
    fontSize: 20,
    marginRight: 4,
    marginBottom: 4,
  },
});
