import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {Picker} from '@react-native-picker/picker';
import {useState} from 'react';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const AddExpense = () => {
  const navigation = useNavigation();

  const [type, setType] = useState('earned');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);

  const handleSumbit = async () => {
    if (!title || value === 0) {
      return Toast.show({
        type: 'error',
        text1: 'Please enter a title and a value',
      });
    }

    const data = {
      type,
      title,
      description,
      value,
    };
    console.log(data);

    const existingData = await AsyncStorage.getItem('expenses');
    const updatedData = existingData ? JSON.parse(existingData) : [];

    updatedData.push(data);
    await AsyncStorage.setItem('expenses', JSON.stringify(updatedData));
    console.log(updatedData);
    navigation.navigate('Home');
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <Header header={'Add Expense'} />

      <View style={styles.formContainer}>
        {/* Type Picker */}
        <View style={styles.formInputView}>
          <Text style={styles.formInputLabel}>
            Type <Text style={{color: 'red'}}>*</Text> :
          </Text>
          <Picker
            style={[
              styles.formInput,
              {backgroundColor: '#cfd8dc', color: 'black'},
            ]}
            selectedValue={type}
            onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
            <Picker.Item label="Earned" value="earned" />
            <Picker.Item label="Spent" value="spent" />
          </Picker>
        </View>
        {/* Title */}
        <View style={styles.formInputView}>
          <Text style={styles.formInputLabel}>
            Title <Text style={{color: 'red'}}>*</Text> :
          </Text>
          <TextInput
            style={styles.formInput}
            multiline={false}
            editable={true}
            value={title}
            onChangeText={setTitle}
          />
        </View>
        {/* Description */}
        <View style={styles.formInputView}>
          <Text style={styles.formInputLabel}>Description :</Text>
          <TextInput
            style={styles.formInput}
            editable={true}
            numberOfLines={5}
            value={description}
            onChangeText={setDescription}
          />
        </View>
        {/* Value */}
        <View style={styles.formInputView}>
          <Text style={styles.formInputLabel}>
            Value <Text style={{color: 'red'}}>*</Text> :
          </Text>
          <TextInput
            style={styles.formInput}
            multiline={false}
            editable={true}
            keyboardType="numeric"
            value={value}
            onChangeText={setValue}
          />
        </View>

        <View style={styles.formInputView}>
          <Pressable style={styles.AddExpensePressable} onPress={handleSumbit}>
            <Text style={styles.AddExpenseText}>Add</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  formContainer: {
    width: '90%',
    flex: 1,
  },
  formInputView: {
    marginVertical: 5,
    marginLeft: 20,
  },
  formInput: {
    width: '100%',
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 5,
    color: 'black',
  },
  formInputLabel: {
    fontSize: 15,
    color: '#424242',
  },
  AddExpensePressable: {
    backgroundColor: '#40c4ff',
    height: '25%',
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  AddExpenseText: {
    fontSize: 18,
    color: 'white',
    letterSpacing: 1,
  },
});
