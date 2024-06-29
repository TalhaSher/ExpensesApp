import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Expenses = ({data, type}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.containerView}
      onPress={() =>
        navigation.navigate(type == 'earned' ? 'Earned' : 'Spent')
      }>
      <View style={styles.expensesView}>
        <View style={styles.expensesTextView}>
          <Text style={styles.expensesText}>
            {type == 'earned' ? 'Earned' : 'Spent'}
          </Text>
        </View>
        <View style={styles.expensesNumberView}>
          <Text
            style={[
              styles.expensesNumber,
              {color: type == 'earned' ? 'green' : 'red'},
            ]}>
            {type == 'earned' ? '+ ' : '- '}
            {data}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Expenses;

const styles = StyleSheet.create({
  containerView: {
    elevation: 10,
    width: '45%',
    height: '100%',
    backgroundColor: '#fcf7f7',
    shadowColor: '#8a8888',
    borderRadius: 5,
    overflow: 'hidden',
  },
  expensesView: {
    flex: 1,
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
