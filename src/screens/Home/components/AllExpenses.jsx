import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AllExpenses = ({data}) => {
  return (
    <View style={styles.containerView}>
      <View style={styles.expensesTextView}>
        <Text style={styles.expensesText}>{data.title}</Text>
      </View>
      <View style={styles.expensesNumberView}>
        <Text
          style={[
            styles.expensesNumber,
            {color: data.type == 'earned' ? 'green' : 'red'},
          ]}>
          {data.type == 'earned' ? '+ ' : '- '}
          {data.value}
        </Text>
      </View>
    </View>
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
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
