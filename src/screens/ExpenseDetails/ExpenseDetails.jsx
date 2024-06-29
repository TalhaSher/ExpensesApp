import {StyleSheet, Text, View, StatusBar, Pressable} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import Header from '../../components/Header';
import Divider from '../../components/Divider';
import {TrashIcon} from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const ExpenseDetails = () => {
  const route = useRoute();
  const {type, title, value, description} = route.params.expense;
  const navigation = useNavigation();

  const handleDelete = async () => {
    const data = await AsyncStorage.getItem('expenses');
    const parsedData = JSON.parse(data);

    const updatedData = parsedData.filter(
      expense =>
        !(
          expense.type === type &&
          expense.title === title &&
          expense.value === value &&
          expense.description === description
        ),
    );
    await AsyncStorage.setItem('expenses', JSON.stringify(updatedData));
    navigation.navigate('Home');
  };

  return (
    <View style={{flex: 1}}>
      <Header header="Expense" />
      <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle={'dark-content'}
      />
      <View style={styles.viewContainer}>
        <View style={styles.textViewContainer}>
          <Text style={styles.themedText}>{title}</Text>
          <Text
            style={[
              styles.themedText,
              {color: type == 'earned' ? 'green' : 'red'},
            ]}>
            {type == 'earned' ? '+ ' : '- '}
            {value}
          </Text>
        </View>
        <Divider />
        {description && (
          <View
            style={{width: '100%', alignItems: 'flex-start', marginLeft: 25}}>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>
        )}

        <View
          style={{
            width: '100%',
            marginLeft: 24,
            marginTop: 20,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}>
          <Pressable style={styles.deletePressable} onPress={handleDelete}>
            <TrashIcon size={24} color={'red'} />
            <Text style={styles.deleteText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ExpenseDetails;

const styles = StyleSheet.create({
  themedText: {
    fontSize: 20,
    color: '#424242',
  },
  descriptionText: {
    color: '#424242',
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  textViewContainer: {
    width: '93%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  deleteText: {
    color: 'red',
  },
  deletePressable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 7,
  },
});
